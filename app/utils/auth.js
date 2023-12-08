import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";
import clientPromise from "./clientPromise";
import bcrypt from "bcryptjs";
import User from "../models/User";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
      credentials: {
        email: {
          label: "e-mail",
          type: "email",
          placeholder: "email@exemplo.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();
        if (credentials == null) return null;
        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              return user;
            } else {
              throw new Error("E-mail ou password estão incorretos!");
            }
          } else {
            throw new Error("Usuário não encontrado");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/panel",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user._id,
          nome: user.nome,
          email: user.email,
          telefone: user.telefone,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
