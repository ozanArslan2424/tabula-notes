import throttle from "lodash.throttle";
import Watcher from "watcher";
import { log } from "@/lib/log";
import config from "@/routes.config";
import { pathToPascalCase } from "./utils";

let clientMap = new Set<string>([]);
let serverMap = new Set<string>([]);

const w = new Watcher([config.server.routesDir, config.client.routesDir], {
	recursive: true,
	renameDetection: true,
	ignoreInitial: false,
});

export const serverRouteRegex = /^(.*)\.(get|post|put|delete|patch|options)\.ts$/;
export const serverRoutePrefix = config.server.routePrefix ?? "";

export function makeClientRoute(fp: string) {
	const filePath = String(fp.replace(config.client.routesDir, ""));
	const prefixed = config.ignoreFilePrefixes.some((prefix) => filePath.charAt(1) === prefix);
	const isRouteFile = config.client.routeFileNames.some((name) => {
		if (name.startsWith("*")) {
			return filePath.endsWith(name.slice(1));
		}
		return filePath.endsWith(name);
	});
	const isInvalid = prefixed || !isRouteFile || filePath.endsWith(".DS_Store");
	if (isInvalid) return;

	const isIndexRoute = config.client.indexRouteDirNames.some((name) =>
		filePath.startsWith("/" + name),
	);
	const name = pathToPascalCase(filePath.replace("/index.tsx", ""));
	const path = isIndexRoute ? "/" : filePath.replace("/index.tsx", "");

	return { name, path };
}

export function makeServerRoute(fp: string) {
	const filePath = serverRoutePrefix + String(fp.replace(config.server.routesDir, ""));
	const fileName = String(filePath.split("/").pop());
	const prefixed = config.ignoreFilePrefixes.some((prefix) => fileName.startsWith(prefix));
	const notRouteFile = !serverRouteRegex.test(fileName);
	const isInvalid = prefixed || notRouteFile || filePath.endsWith(".DS_Store");

	if (isInvalid) return;

	const name = pathToPascalCase(filePath.replace(".ts", "").replace(".", "/"));
	const path = filePath.split(".")[0];
	const method = fileName.split(".")[1].toUpperCase();

	return { name, path, method };
}

export async function writeGeneratedFile() {
	const clientGlobalTypes = `
type ClientRoutePath = ${[...clientMap].map((path) => `"${path}"`).join(" | ")};
type ClientRoutePathParam<P extends ClientRoutePath> = ExtractRouteParams<P>;
type ClientRouteSearchParam<P extends ClientRoutePath> = ExtractSearchParams<P>;`;

	const serverGlobalTypes = `
type ServerRoutePath = ${[...serverMap].map((path) => `"${path}"`).join(" | ")};
type ServerRoutePathParam<P extends ServerRoutePath> = ExtractRouteParams<P>;
type ServerRouteSearchParam<P extends ServerRoutePath> = ExtractSearchParams<P>;`;

	const content = `
// Auto-generated by watch-routes.ts
type ExtractRouteParams<T> = T extends \`\${infer _Start}:\${infer Param}/\${infer Rest}\`
	? { [k in Param | keyof ExtractRouteParams<Rest>]: string }
	: T extends \`\${infer _Start}:\${infer Param}\`
		? { [k in Param]: string }
		: { [k in string]: string };
type ExtractSearchParams<P> = P extends \`\${infer _Start}?\${infer Search}\`
	? { [k in Search]: string }
	: { [k in string]: string };

declare global {${clientMap.size === 0 ? "" : clientGlobalTypes}\n${serverMap.size === 0 ? "" : serverGlobalTypes}\n}

export const clientRoutePaths:ClientRoutePath[] = ${JSON.stringify([...clientMap])};
export const serverRoutePaths:ServerRoutePath[] = ${JSON.stringify([...serverMap])};`;

	log.success("Generated routes file written!");
	await Bun.write(config.generatedFilePath, content);
}

const writeGeneratedFileThrottled = throttle(writeGeneratedFile, 2000);

w.on("ready", () => log.start("👀 Watching routes..."));
w.on("error", log.error);
w.on("close", () => log.end("👋 Stopped watching routes..."));

w.on("add", (fp) => {
	if (fp.includes(config.client.routesDir)) {
		const route = makeClientRoute(fp);
		if (!route) return;
		clientMap.add(route.path);
	} else {
		const route = makeServerRoute(fp);
		if (!route) return;
		serverMap.add(route.path);
	}

	writeGeneratedFileThrottled();
});

w.on("unlink", (fp) => {
	if (fp.includes(config.client.routesDir)) {
		const route = makeClientRoute(fp);
		if (!route) return;
		clientMap.delete(route.path);
	} else {
		const route = makeServerRoute(fp);
		if (!route) return;
		serverMap.delete(route.path);
	}
	writeGeneratedFileThrottled();
});

w.on("rename", (fp, newFp) => {
	if (fp.includes(config.client.routesDir)) {
		const route = makeClientRoute(fp);
		const newRoute = makeClientRoute(newFp);
		if (route) {
			clientMap.delete(route.path);
		}
		if (!newRoute) return;
		clientMap.add(newRoute.path);
	} else {
		const route = makeServerRoute(fp);
		const newRoute = makeServerRoute(newFp);
		if (route) {
			serverMap.delete(route.path);
		}
		if (!newRoute) return;
		serverMap.add(newRoute.path);
	}
	writeGeneratedFileThrottled();
});

w.on("unlinkDir", (dir) => {
	if (dir.includes(config.client.routesDir)) {
		const dirPath = String(dir.replace(config.client.routesDir, ""));
		clientMap = new Set([...clientMap].filter((route) => !route.startsWith(dirPath)));
	} else {
		const dirPath = serverRoutePrefix + String(dir.replace(config.server.routesDir, ""));
		serverMap = new Set([...serverMap].filter((route) => !route.startsWith(dirPath)));
	}

	writeGeneratedFileThrottled();
});

w.on("renameDir", (dir, newDir) => {
	if (dir.includes(config.client.routesDir)) {
		const dirPath = String(dir.replace(config.client.routesDir, ""));
		const newDirPath = String(newDir.replace(config.client.routesDir, ""));

		[...clientMap].map((path) => {
			if (path.startsWith(dirPath)) {
				const newPath = path.replace(dirPath, newDirPath);
				clientMap.delete(path);
				clientMap.add(newPath);
			}
		});
	} else {
		const dirPath = serverRoutePrefix + String(dir.replace(config.server.routesDir, ""));
		const newDirPath = serverRoutePrefix + String(newDir.replace(config.server.routesDir, ""));

		[...serverMap].map((path) => {
			if (path.startsWith(dirPath)) {
				const newPath = path.replace(dirPath, newDirPath);
				serverMap.delete(path);
				serverMap.add(newPath);
			}
		});
	}

	writeGeneratedFileThrottled();
});
