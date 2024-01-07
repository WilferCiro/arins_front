export const appConfig = {
  API_BACKEND_URL: process.env.API_BACKEND_URL || "http://localhost:5001",

  APP_DOMAIN: process.env.APP_DOMAIN || "arins.co",

  NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "",
  SECRET_JWT: process.env.SECRET_JWT || "",
  API_KEY_LOGIN: process.env.API_KEY_LOGIN || "",

  KEY_KEYWORD: process.env.KEY_KEYWORD || "",
  PUBLIC_KEY: process.env.PUBLIC_KEY || "",
};
