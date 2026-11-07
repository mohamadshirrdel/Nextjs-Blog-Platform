import { deletePost } from "@/app/actions/post";
import DeletePostButton from "@/app/components/admin/post/DeletePostButton";
import EditPostButton from "@/app/components/admin/post/EditPostButton";
import { getPosts } from "@/app/libs/data/post";
import { getUsers } from "@/app/libs/data/user";

const page = async () => {
  const [posts, allUsers] = await Promise.all([getPosts(), getUsers()]);

  // فقط فیلدهای لازم برای انتخاب نویسنده به کلاینت فرستاده می‌شود
  const users = allUsers
    .filter((user) => !user.isDeleted)
    .map((user) => ({ id: user.id, name: user.name, email: user.email }));

  console.log(posts);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">پست‌ها</h1>

        <p className="mt-2 text-sm text-slate-400">
          مدیریت پست‌های منتشرشده و پیش‌نویس‌های پلتفرم
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="px-6 py-4 font-medium text-slate-300">عنوان</th>

                <th className="px-6 py-4 font-medium text-slate-300">
                  نویسنده
                </th>

                <th className="px-6 py-4 font-medium text-slate-300">وضعیت</th>

                <th className="px-6 py-4 font-medium text-slate-300">
                  تاریخ ایجاد
                </th>

                <th className="px-6 py-4 font-medium text-slate-300">عملیات</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {posts.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    هنوز پستی ایجاد نشده است.
                  </td>
                </tr>
              )}

              {posts.map((post) => (
                <tr key={post.id} className="transition hover:bg-white/5">
                  <td className="max-w-sm px-6 py-4 font-medium text-white">
                    <div className="truncate">{post.title}</div>
                  </td>

                  <td className="px-6 py-4 text-slate-400">
                    {post.author.name}
                  </td>

                  <td className="px-6 py-4">
                    {post.status === "published" ? (
                      <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                        منتشر شده
                      </span>
                    ) : (
                      <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
                        پیش‌نویس
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-slate-400">
                    {new Date(post.createdAt).toLocaleDateString("fa-IR")}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <EditPostButton
                        post={{
                          id: post.id,
                          title: post.title,
                          status:
                            post.status === "published" ? "published" : "draft",
                          author: post.author,
                        }}
                        users={users}
                      />

                      <DeletePostButton postId={post.id} />
                    </div>
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
