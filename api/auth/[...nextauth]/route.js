// pages/api/auth/[...nextauth].js (or app/api/auth/[...nextauth]/route.js)
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace this with your own authentication logic:
        const user = { id: 1, name: "John Doe", email: credentials.email };
        // For a real app, check the credentials here and return null if they are invalid.
        if (credentials.email && credentials.password) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
