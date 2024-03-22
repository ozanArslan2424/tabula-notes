import { lucia } from "@/lib/auth";
import db from "@/lib/db";
import { google } from "@/lib/oauth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
}

export const GET = async (req: NextRequest) => {
  try {
    const url = req.nextUrl;
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code || !state) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const codeVerifier = cookies().get("codeVerifier")?.value;
    const savedState = cookies().get("state")?.value;

    if (!codeVerifier || !savedState) {
      return Response.json({ error: "Code verifier or saved state does not exist" }, { status: 400 });
    }

    if (savedState !== state) {
      return Response.json({ error: "State does not match" }, { status: 400 });
    }

    const { accessToken, accessTokenExpiresAt, idToken, refreshToken } = await google.validateAuthorizationCode(
      code,
      codeVerifier,
    );

    const googleRes = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    });

    const googleData = (await googleRes.json()) as GoogleUser;

    await db.$transaction(async (tr) => {
      const user = await tr.user.findFirst({
        where: {
          id: googleData.id,
        },
      });

      if (!user) {
        const newUser = await tr.user.create({
          data: {
            id: googleData.id,
            email: googleData.email,
            username: googleData.name,
            image: googleData.picture,
          },
        });

        if (!newUser) {
          return Response.json({ error: "Failed to create user" }, { status: 500 });
        }

        const newUserAccount = await tr.account.create({
          data: {
            id: googleData.id,
            userId: googleData.id,
            providerId: googleData.id,
            expiresAt: accessTokenExpiresAt,
            accessToken,
            refreshToken,
            provider: "google",
          },
        });

        if (!newUserAccount) {
          return Response.json({ error: "Failed to create account" }, { status: 500 });
        }
      } else {
        const updatedUserAccount = await tr.account.update({
          where: {
            id: googleData.id,
          },
          data: {
            expiresAt: accessTokenExpiresAt,
            accessToken,
            refreshToken,
          },
        });

        if (!updatedUserAccount) {
          return Response.json({ error: "Failed to update account" }, { status: 500 });
        }
      }

      return NextResponse.redirect(new URL("/dash", process.env.NEXT_PUBLIC_URL), { status: 302 });
    });

    const session = await lucia.createSession(googleData.id, {
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    cookies().set("state", "", {
      expires: new Date(0),
    });
    cookies().set("codeVerifier", "", {
      expires: new Date(0),
    });

    return NextResponse.redirect(new URL("/dash", process.env.NEXT_PUBLIC_URL), {
      status: 302,
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
};
