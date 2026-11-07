"use server";

import { auth } from "@/auth";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectToDB } from "../db";
import User from "../models/User";

const JWT_SECRET = "fidbvijdfnbijonokfmevoperfmbine0ribmpkrwlmblvwe";

export const createToken = async (userId) => {
  return jwt.sign(
    {
      userId,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

export const getCurrentUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const payload = jwt.verify(token, JWT_SECRET);

    await connectToDB();

    const user = await User.findById(payload.userId);

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch (err) {
    return null;
  }
};

export const requireAdmin = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const userId = session.user.id;

  await connectToDB();

  const user = await User.findById(userId);

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/login");
  }

  return true;
};
