import { github, lucia } from "@/lib/auth";
import db from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface GithubUser {
  id: number;
  name: string;
  avatar_url: string;
}

export const GET = async (req: NextRequest) => {
  try {
    const url = req.nextUrl;
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code || !state) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const savedState = cookies().get("state")?.value;

    if (!savedState) {
      return Response.json({ error: "Saved state does not exist" }, { status: 400 });
    }

    if (savedState !== state) {
      return Response.json({ error: "State does not match" }, { status: 400 });
    }

    const { accessToken } = await github.validateAuthorizationCode(code);

    const githubRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    });

    const githubData = (await githubRes.json()) as GithubUser;
    const githubID = githubData.id.toString();

    await db.$transaction(async (tr) => {
      const user = await tr.user.findFirst({
        where: {
          id: githubID,
        },
      });

      if (!user) {
        const newUser = await tr.user.create({
          data: {
            id: githubID,
            username: githubData.name,
            image: githubData.avatar_url,
          },
        });

        if (!newUser) {
          return Response.json({ error: "Failed to create user" }, { status: 500 });
        }

        const newUserAccount = await tr.account.create({
          data: {
            id: githubID,
            userId: githubID,
            providerId: githubID,
            accessToken,
            provider: "github",
          },
        });

        if (!newUserAccount) {
          return Response.json({ error: "Failed to create account" }, { status: 500 });
        }
      } else {
        const updatedUserAccount = await tr.account.update({
          where: {
            id: githubID,
          },
          data: {
            accessToken,
          },
        });

        if (!updatedUserAccount) {
          return Response.json({ error: "Failed to update account" }, { status: 500 });
        }
      }

      return NextResponse.redirect(new URL("/dash", process.env.NEXT_PUBLIC_URL), { status: 302 });
    });

    const session = await lucia.createSession(githubID, {
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    cookies().set("state", "", {
      expires: new Date(0),
    });

    return NextResponse.redirect(new URL("/dash", process.env.NEXT_PUBLIC_URL), {
      status: 302,
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
};
