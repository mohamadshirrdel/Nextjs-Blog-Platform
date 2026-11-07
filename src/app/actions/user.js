"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../libs/db";
import User from "../libs/models/User";
import { requireAdmin } from "../libs/utils/auth";

export const deleteUser = async (formData) => {
  try {
    await requireAdmin();

    const userId = formData.get("userId");

    if (!userId) {
      throw new Error("ارسال شناسه کاربر الزامی می‌باشد");
    }

    console.log("1111", userId);

    await connectToDB();

    const user = await User.findOneAndUpdate(
      {
        _id: userId.toString(),
        isDeleted: false,
      },
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
        },
      },
    );

    console.log("2222", user);

    revalidatePath("/admin/users");
  } catch (err) {
    console.log(err.message);
  }
};
