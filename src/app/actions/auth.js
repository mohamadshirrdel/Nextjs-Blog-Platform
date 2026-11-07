"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import z from "zod";
import { connectToDB } from "../libs/db";
import User from "../libs/models/User";
import { createToken, requireAdmin } from "../libs/utils/auth";
import { registerSchema } from "../validators/auth";
import { revalidatePath } from "next/cache";

export async function register(state, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const result = registerSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error),
      values: {
        name: formData.get("name"),
        email: formData.get("email"),
      },
    };
  }

  await connectToDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return {
      success: false,
      errors: {
        email: ["این ایمیل از قبل ثبت نام شده"],
      },
      values: {
        name: formData.get("name"),
        email: formData.get("email"),
      },
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const usersCount = await User.countDocuments();

    const role = usersCount === 0 ? "admin" : "user";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = createToken(user._id);

    const cookiesStore = await cookies();

    cookiesStore.set("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      message: "ثبت نام با موفقیت انجام شد",
    };
  } catch (err) {
    console.log(err);
  }
}

export async function updateUserRole(formData) {
  await requireAdmin();

  const userId = formData.get("userId");
  const role = formData.get("role");

  if (!userId) {
    throw new Error("آیدی کاربر الزامی می‌باشد");
  }

  if (!["user", "admin"].includes(role)) {
    throw new Error("نقش تعیین شده معتبر نیست");
  }

  await connectToDB();

  await User.findByIdAndUpdate(userId, {
    role,
  });

  revalidatePath("/admin/users");
}
