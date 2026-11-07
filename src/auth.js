import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { connectToDB } from "./app/libs/db";
import User from "./app/libs/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Next.js Auth",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // Auth
        console.log("user ->", credentials);

        const { email, password } = credentials;

        await connectToDB();

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),

    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),

    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    signIn: async ({ user, account }) => {
      console.log("user ->", user);
      console.log("account ->", account);

      if (account.provider === "github" || account.provider === "google") {
        await connectToDB();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = await User.create({
            name: user.name,
            email: user.email,
          });

          user.id = newUser._id.toString();
        } else {
          user.id = existingUser._id.toString();
        }
      }

      return true;
    },

    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
      }

      return session;
    },
  },
});
