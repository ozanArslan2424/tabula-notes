import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { log } from "@/lib/log";
import { validateSessionToken } from "@/server/routes/auth/auth-utils";
import { HonoType } from "@/server/types";

export const authCheck = createMiddleware<HonoType>(async (c, next) => {
	const sessionToken = getCookie(c, SESSION_COOKIE_NAME);

	if (!sessionToken) {
		log.error("No session token found");
		c.set("user", null);
		c.set("session", null);
		return next();
	}

	const { session, user } = await validateSessionToken(sessionToken);

	if (!session || !user) {
		log.error("No session found");
		c.set("user", null);
		c.set("session", null);
		return next();
	}

	c.set("user", user);
	c.set("session", session);
	return next();
});
