"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { authFormSchema } from "../utils";
import { db } from "../prisma";
import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_LOGIN } from "@/routes";
import { AuthError } from "next-auth";

const formSchema = authFormSchema("sign-up");
export const Login = async (data: z.infer<typeof formSchema>) => {
  try {
    console.log(data);
    const validData = formSchema.safeParse(data)
    if (!validData.success) return { error: "Invalid inputs" };
  
    const {email, password} = validData.data;

    await signIn('credentials', {
      email, password, redirectTo: DEFAULT_REDIRECT_LOGIN
    })

  } catch (err) {
    if(err instanceof AuthError){
      switch (err.type) {
        case "CredentialsSignin":
          return {error: "Invalide Credencial"}
      }
    }
  }

};

export const Register = async (values: z.infer<typeof formSchema>) => {
  console.log(values);
  if (!values) return { error: "Error ocured" };

  const {
    email,
    password,
    firstName,
    lastName,
    userName,
    dateOfBirth,
    phoneNumber,
  } = values as {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
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
      passwrd: hashPassword,
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth),
      userName,
      phoneNumber,
    },
  });

  return { success: "Email sent!" };
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
