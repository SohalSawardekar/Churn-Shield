import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/users";
import { connectToDB } from "@/utils/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: {
    strategy: "jwt", // Use strategy instead of deprecated `jwt: true`
    maxAge: 24 * 60 * 60, // 1 day
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" }, // Use "username" instead of "email"
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDB();

          // Find user by username
          const existingUser = await User.findOne({
            username: credentials.email,
          });

          if (!existingUser) {
            throw new Error("User not found.");
          }

          // Check password
          const isValidPassword =
            credentials.password === existingUser.password ? true : false;

          if (!isValidPassword) {
            throw new Error("Invalid password.");
          }

          // Return user object
          return {
            id: existingUser._id.toString(),
            username: existingUser.username,
            role: existingUser.role,
          };
        } catch (error) {
          console.error("Authentication Error:", error.message);
          throw new Error("Invalid credentials. Please try again.");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Corrected SECRET key
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirect to login page if not authenticated
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
