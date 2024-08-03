import { db } from "../prisma";

export const getVerificationtionTokenByEmail = async (email: string) => {
  try {
    const token = await db.verificationToken.findFirst({
      where: { email },
    });
    return token;
  } catch {
    return null;
  }
};
export const getVerificationtionTokenByToken = async (token: string) => {
  try {
    const verificationtoken = await db.verificationToken.findUnique({
      where: { token },
    });
    return verificationtoken;
  } catch {
    return null;
  }
};
