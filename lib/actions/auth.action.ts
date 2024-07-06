"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { authFormSchema } from "../utils";
import { db } from "../prisma";

const formSchema = authFormSchema("sign-up");
export const Login = async (data: z.infer<typeof formSchema>) => {
  console.log(data);
  if (!data) return { error: "Error ocured" };
  return { success: "Email sent!" };
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
