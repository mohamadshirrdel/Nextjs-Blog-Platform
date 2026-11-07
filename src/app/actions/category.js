"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../libs/db";
import Category from "../libs/models/Category";
import { requireAdmin } from "../libs/utils/auth";
export const createCategory = async (state, formData) => {
  requireAdmin();

  try {
    const title = formData.get("title");
    const slug = formData.get("slug");
    const parent = formData.get("parent");

    if (!title || slug.length < 3) {
      return {
        success: false,
        message: "نام و لینک دسته‌بندی الزامی‌ می‌باشند",
        values: {
          title,
          slug,
        },
      };
    }

    await connectToDB();

    const existingCategory = await Category.findOne({ slug });

    if (existingCategory) {
      return {
        success: false,
        message: "لینک دسته‌بندی تکراری می‌باشد",
        values: {
          title,
          slug,
        },
      };
    }

    await Category.create({
      title,
      slug,
      parent: parent || null,
    });

    revalidatePath("admin/categories");

    return {
      success: true,
      message: "دسته‌بندی با موفقیت ایجاد شد",
    };
  } catch (err) {
    console.log(err);

    return {
      success: false,
      message: "مشکلی رخ داد",
    };
  }
};
