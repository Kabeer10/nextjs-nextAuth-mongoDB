import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env";

import { dbConnect, mongoClient, User } from "./db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(mongoClient),

  callbacks: {
    async redirect({ baseUrl }) {
      // After a user signs in, redirect to the dashboard page.
      return baseUrl + "/dash";
    },
    session(params) {
      params.session.user.id = params.user?.id;
      return params.session;
    },
  },
  events: {
    createUser: async (message) => {
      const user = message.user;
      await dbConnect();
      // In Google Login, due to some reason, the emailVerified field is not set to true.
      // So, we set it to true here.
      // You can also set other fields like  role, etc. here.
      await User.findByIdAndUpdate(user.id, {
        emailVerified: true,
        createdAt: Date.now(),
      });
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
