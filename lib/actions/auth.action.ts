"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { authFormSchema } from "../utils";
import { db } from "../prisma";
import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_LOGIN } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "../auth/tokens";
import { sendVerificationEmail } from "../mail";

const formSchema = authFormSchema("sign-in");
export const Login = async (data: z.infer<typeof formSchema>) => {
  try {
    const validData = formSchema.safeParse(data)
    if (!validData.success) return { error: "Invalid inputs" };
  
    const {email, password} = validData.data;
    const existingUser = await getUserByEmail(email)

    if(!existingUser || !existingUser.email || !existingUser.password) {
      return {error: "Email does not exist."}
    }

    if(!existingUser.emailVerified) {
      const vereficationToken = await generateVerificationToken(existingUser.email)
      await sendVerificationEmail(vereficationToken.email, vereficationToken.token);
      return {success: "Confirmation email sent."}
    }

    await signIn('credentials', {
      email, password, redirectTo: DEFAULT_REDIRECT_LOGIN
    })

  } catch (err) {
    if(err instanceof AuthError){
      switch (err.type) {
        case "CredentialsSignin":
          return {error: "Invalide Credencial"}
        default:
          return { error: "Something went wrong !!!"}
      }
    }
    throw err;
  }

};

export const Register = async (values: z.infer<typeof formSchema>) => {
  console.log(values);
  const validData = formSchema.safeParse(values)
  if (!validData.success) return { error: "Invalid inputs" };

  const {
    email,
    password,
    userName,
    dateOfBirth,
    phoneNumber,
  } = values as {
    email: string;
    password: string;
    userName: string;
    dateOfBirth: string;
    phoneNumber: string;
  };
  const hashPassword = await bcrypt.hash(password, 10);

  const exestingUser = await getUserByEmail(email);

  if (exestingUser) {
    return { error: "Error: Email exists!!!" };
  }
  await db.user.create({
    data: {
      email,
      password: hashPassword,
      dateOfBirth: new Date(dateOfBirth),
      userName,
      phoneNumber,
    },
  });

  const vereficationToken = await generateVerificationToken(email)
  console.log("------- ", vereficationToken)

  await sendVerificationEmail(vereficationToken.email, vereficationToken.token);
  return { success: "Confirmation Email sent!" };
};

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: {
        email,
      },
    });
  } catch (e) {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({
      where: {
        id,
      },
    });
  } catch (e) {
    return null;
  }
};
