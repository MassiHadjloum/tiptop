import { v4 as uuidv4 } from "uuid";
import { getVerificationtionTokenByEmail } from "./verificationToken";
import { db } from "../prisma";
import { VerificationToken } from "@prisma/client";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationtionTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await db.
  verificationToken.create({
    data: {
      email, token, expires
    }
  })
  return verificationToken as VerificationToken
};
