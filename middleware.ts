import NextAuth from "next-auth";
// import authConfig from "./auth.config";
import { apiAuthPrefix, authRoutes, DEFAULT_REDIRECT_LOGIN, publicRoutes } from "./routes";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/prisma";
// const { auth } = NextAuth(authConfig);

import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { authFormSchema } from "./lib/utils";
import { getUserByEmail } from "./lib/actions/auth.action";
import bcrypt from "bcryptjs"

const formSchema = authFormSchema("sign-in");

const authConfig = {
  providers: [
    Credentials({
      async authorize(credential) {
        const validatedFields = formSchema.safeParse(credential)
        if(validatedFields.success) {
          const {email, password} = validatedFields.data;
          const user = await getUserByEmail(email)
          if(!user || !user.password) return null

          const passwordCheck = await bcrypt.compare(
            password, user.password
          )

          if(passwordCheck) return user
        }
        return null
      }
    }),
    // Google, Facebook
  ],
} satisfies NextAuthConfig;

export const {
  handlers: {GET, POST},
  signIn, signOut, auth
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {strategy: 'jwt'},
  ...authConfig
})

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req .auth;
  // Logged in users are authenticated, otherwise redirect to login page
  console.log("ROUTE: ", req.nextUrl.pathname, "LOGGED IN: ", isLoggedIn);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if(isApiAuthRoute) {
    return null
  }
  if(isAuthRoute) {
    if(isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT_LOGIN, nextUrl))
    }
    return null
  }
  if(!isLoggedIn && !isPublicRoute) {
    console.log("==== redirecting to signin")
    return Response.redirect(new URL("/sign-in", nextUrl))
  }
  return null
  
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};