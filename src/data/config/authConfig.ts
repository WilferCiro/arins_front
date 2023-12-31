// Nextjs and react
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { isExpired, decodeToken } from "react-jwt";

// Web3

// Custom
import { UserAuthSchema } from "@/domain/schemas/UserAuthSchema";
// import { checkIsAdmin } from "@/domain/utils/auth.utils";

const checkIsAdmin = (address: string) => {
  return true;
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "MoralisAuth",
      credentials: {
        token: {
          label: "Token",
          type: "text",
          placeholder: "",
        },
      },
      async authorize(credentials) {
        try {
          const { token } = credentials as {
            token: string;
          };

          const decoded = decodeToken(token) as { address: string };
          const isAdmin = checkIsAdmin(decoded.address) ?? false;

          const user: UserAuthSchema = {
            token,
            isAdmin,
          } as UserAuthSchema;
          return user as any;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  // adding user info to the user session object
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as UserAuthSchema;
      return session;
    },
  },
};
