import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { apiAuthPrefix, authRoutes, DEFAULT_REDIRECT_LOGIN, publicRoutes } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
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
    return Response.redirect(new URL("/sign-in", nextUrl))
  }
  return null
  
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
