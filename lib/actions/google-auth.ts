"use server";
import { google } from "@/lib/oauth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";

export const createGoogleAuthURL = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
    });

    cookies().set("state", state, {
      httpOnly: true,
    });

    const authorizationURL = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ["email", "profile"],
    });

    return {
      success: true,
      data: authorizationURL.toString(),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};
