import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { z } from "zod";
import "@/lib/mongodb";
import jwt from "jsonwebtoken";
import settingsModel from "@/models/settings.model";

export const authOptions = {
  session: { strategy: "jwt" },
  debug: true,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(creds) {
        try {
          const { email, password } = z
            .object({
              email: z.string().email("Please enter a valid email address."),
              password: z.string(),
            })
            .parse(creds);

          const user = await User.findOne({ email });
          if (!user) throw new Error("No user found. Please register first.");
          if (!(await bcrypt.compare(password, user.password)))
            throw new Error("Invalid credentials. Please try again.");

          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          if (error.name === "ZodError") {
            // Get the first error message only
            const firstError = error.errors[0];
            throw new Error(firstError.message);
          }

          // Handle other errors
          throw new Error(error.message);
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      async profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // Handle initial sign-in
      if (account) {
        if (account.provider === "credentials") {
          token.sub = user.id;
          token.role = user.role;
          token.email = user.email;
          token.name = user.name;
          token.picture = user.image ?? null;
          console.log("- Credentials login, role set to:", token.role);
        } else if (account.provider === "google") {
          const dbUser = await User.findOneAndUpdate(
            { email: user.email },
            {
              $set: { name: user.name, image: user.image },
              $setOnInsert: { role: null, password: null },
            },
            { upsert: true, new: true }
          );

          const existingSettings = await settingsModel.findOne({
            userId: dbUser._id,
          });
          if (!existingSettings) {
            await settingsModel.create({
              userId: dbUser._id,
              name: dbUser.name,
              email: dbUser.email,
            });
          }

          token.sub = dbUser._id.toString();
          token.role = dbUser.role;
          token.email = dbUser.email;
          token.name = dbUser.name;
          token.picture = dbUser.image;
        }
        try {
          const settings = await settingsModel.findOne({ userId: token.sub });
          if (settings) {
            // If settings exist and have name/email, use those instead
            if (settings.name) token.name = settings.name;
            if (settings.email) token.email = settings.email;

            // Also update the User model to keep it in sync
            await User.findByIdAndUpdate(token.sub, {
              name: settings.name,
              email: settings.email,
            });

            console.log(
              "✅ Synced token and User model with settings on login:",
              {
                name: token.name,
                email: token.email,
              }
            );
          }
        } catch (error) {
          console.error("Error syncing settings on login:", error);
        }
      }

      // Handle session updates (when update() is called)
      if (trigger === "update") {
        try {
          const dbUser = await User.findOne({ email: token.email });
          if (dbUser) {
            const oldRole = token.role;
            token.role = dbUser.role;
            token.name = dbUser.name;
            token.email = dbUser.email;
          } else {
            console.log("JWT: No user found in DB for email:", token.email);
          }
        } catch (error) {
          console.error("JWT: Error fetching updated user data:", error);
        }
      }

      console.log("- Final token role:", token.role);
      try {
        const signed = jwt.sign(token, process.env.NEXTAUTH_SECRET, {
          algorithm: "HS256",
        });
        console.log("🔐 Signed JWT:", signed);
      } catch (err) {
        console.error("Error signing token:", err);
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.image = token.picture;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
