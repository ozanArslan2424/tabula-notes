import { Google } from "arctic";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.NEXT_PUBLIC_URL + "/api/oauth/google";

export const google = new Google(clientId!, clientSecret!, redirectUri);
