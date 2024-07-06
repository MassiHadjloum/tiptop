import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "./lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {strategy: 'jwt'},
 ...authConfig
})

// .env.local
// DB_HOST=localhost
// DB_USER=myuser
// DB_PASSWORD=mypassword
// DB_NAME=tiptop


// AUTH_SECRET=mSaxQBtqqQbdhBoCFnHMLxNLmPzb0DaiMInMkbmeZkg=
// NEXT_AUTH_URL=http://localhost:3000

// GOOGLE_CLIENT_ID=464690717192-fa2tnf4g606vjttiop7emfmr2mqhasrm.apps.googleusercontent.com
// GOOGLE_CLIENT_SECRET=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

// FACEBOOK_CLIENT_ID=
// FACEBOOK_CLIENT_SECRET=

// .env
// # Environment variables declared in this file are automatically made available to Prisma.
// # See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

// # Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
// # See the documentation for all the connection string options: https://pris.ly/d/connection-strings

// DATABASE_URL="mysql://myuser:mypassword@localhost:3306/tiptop?schema=public?connection_limit=10"