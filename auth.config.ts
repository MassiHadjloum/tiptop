import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { authFormSchema } from "./lib/utils";
import { getUserByEmail } from "./lib/actions/auth.action";
import bcrypt from "bcryptjs"

const formSchema = authFormSchema("sign-in");

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }), Facebook,
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
    
  ],
} satisfies NextAuthConfig;

export default authConfig