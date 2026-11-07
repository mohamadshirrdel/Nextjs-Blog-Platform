import { updateUserRole } from "@/app/actions/auth";
import { deleteUser } from "@/app/actions/user";
import { getUsers } from "@/app/libs/data/user";
import React from "react";

const page = async () => {
  const users = await getUsers();

  console.log(users);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">کاربران</h1>

        <p className="mt-2 text-sm text-slate-400">
          لیست کاربران ثبت‌نام‌شده در پلتفرم
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="px-6 py-4 font-medium text-slate-300">نام</th>

                <th className="px-6 py-4 font-medium text-slate-300">ایمیل</th>

                <th className="px-6 py-4 font-medium text-slate-300">نقش</th>

                <th className="px-6 py-4 font-medium text-slate-300">
                  تاریخ عضویت
                </th>

                <th className="px-6 py-4 font-medium text-slate-300">عملیات</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    هنوز کاربری ثبت‌نام نکرده است.
                  </td>
                </tr>
              )}

              {users.map((user) => (
                <tr key={user.id} className="transition hover:bg-white/5">
                  <td className="px-6 py-4 font-medium text-white">
                    {user.name}
                  </td>

                  <td className="px-6 py-4 text-slate-400">{user.email}</td>

                  <td className="px-6 py-4">
                    <form
                      action={updateUserRole}
                      className="flex items-center gap-2"
                    >
                      <input type="hidden" name="userId" value={user.id} />

                      <select
                        name="role"
                        key={user.role}
                        defaultValue={user.role}
                        className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                      >
                        <option value="user">کاربر</option>
                        <option value="admin">ادمین</option>
                      </select>

                      <button
                        type="submit"
                        className="text-sm text-blue-400 transition hover:text-blue-300"
                      >
                        ذخیره
                      </button>
                    </form>
                  </td>

                  <td className="px-6 py-4 text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString("fa-IR")}
                  </td>

                  <td className="px-6 py-4">
                    <form action={deleteUser}>
                      <input type="hidden" name="userId" value={user.id} />

                      <button
                        type="submit"
                        className="text-sm text-red-400 transition hover:text-red-300"
                      >
                        حذف
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
