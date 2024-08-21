"use server"

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  const token = Math.random().toString();

  const userId = session?.user?.id;
  if (!userId) {
    return {
      message: "User not logged in",
    };
  }
  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: amount,
      provider,
      status: "Processing",
      token,
      startTime: new Date(),
    },
  });

  return {
    message: "On Ramp Transaction added",
  };
}
