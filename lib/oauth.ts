import { GitHub, Google } from "arctic";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleRedirectUri = process.env.NEXT_PUBLIC_URL + "/api/oauth/google";

export const google = new Google(googleClientId!, googleClientSecret!, googleRedirectUri);

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

export const github = new GitHub(githubClientId!, githubClientSecret!, {
  redirectURI: process.env.NEXT_PUBLIC_URL + "/api/oauth/github",
});
