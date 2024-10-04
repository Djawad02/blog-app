import NextAuth, { NextAuthOptions, User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "string", placeholder: "Username" },
        password: { label: "Password", type: "string", placeholder: "Password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.password || !credentials.username) return null;

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) return null;  
        
        const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordsMatch) return null;

        // Convert the id to a string to match NextAuth's User type expectations
        return { id: String(user.id), name: user.name, email: user.username } as User;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
