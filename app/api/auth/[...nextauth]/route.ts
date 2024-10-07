import NextAuth, { NextAuthOptions, User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { authOptions } from "../authOptions";


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
