"use server";

import { generateState } from "arctic";
import { cookies } from "next/headers";
import { github } from "../oauth";

export const createGithubAuthURL = async () => {
  try {
    const state = generateState();

    cookies().set("state", state, {
      httpOnly: true,
    });

    const authorizationURL = await github.createAuthorizationURL(state, {
      scopes: ["user:email"],
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
