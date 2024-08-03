import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "./lib/prisma";
import { getUserById } from "./lib/actions/auth.action";

type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER" | "EMPLOYEE";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // nextAuth will always redirect to this route when something goes wrong
  pages: {
    signIn: '/sign-in',
    error: '/error'
  },
  events: {
    async linkAccount({user}){
      await db.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    // async signIn({ user }) {
    //     const exestingUser = await getUserById(user.id!);
    //     if(!exestingUser || !exestingUser.emailVerified) {
    //       return false;
    //     }
    //   return true;
    // },
    async session({ token, session }) {
      console.log(token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "USER" | "EMPLOYEE";
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token; // loged out
      const exestingUser = await getUserById(token.sub);
      if (!exestingUser) return token;
      token.role = exestingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter"; // Correct the import path if necessary
// import { db } from "./lib/prisma";
// import authConfig from "@/auth.config"; // Ensure the path is correct

// export const {
//   handlers: {GET, POST},
//   signIn, signOut, auth
// } = NextAuth({
//   adapter: PrismaAdapter(db),
//   session: {strategy: 'jwt'},
//   ...authConfig
// })
