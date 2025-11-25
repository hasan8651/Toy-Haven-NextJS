import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
// import { compare } from "bcryptjs";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("smart_db");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) return null;

        // If you used plain-text password:
        if (user.password !== credentials.password) return null;

        // If you used bcrypt:
        // const isMatch = await compare(credentials.password, user.password);
        // if (!isMatch) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      }
    })
  ],

  // session: {
  //   strategy: "jwt",
  // },

  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) token.user = user;
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.user = token.user;
  //     return session;
  //   },
  // },

  pages: {
    signIn: "/login"
  },

  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
