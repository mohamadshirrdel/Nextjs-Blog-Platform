import { deleteComment, updateCommentStatus } from "@/app/actions/comment";
import { getAdminComments, getCommentCounts } from "@/app/libs/data/comment";
import Link from "next/link";

const tabs = [
  { key: "pending", label: "در انتظار تایید" },
  { key: "approved", label: "منتشر شده" },
  { key: "rejected", label: "رد شده" },
  { key: "all", label: "همه" },
];

const statusBadge = {
  pending: {
    label: "در انتظار تایید",
    className: "bg-yellow-500/10 text-yellow-400",
  },
  approved: {
    label: "منتشر شده",
    className: "bg-green-500/10 text-green-400",
  },
  rejected: {
    label: "رد شده",
    className: "bg-red-500/10 text-red-400",
  },
};

const page = async ({ searchParams }) => {
  const params = await searchParams;

  const activeTab = tabs.some((tab) => tab.key === params?.status)
    ? params.status
    : "pending";

  const [comments, counts] = await Promise.all([
    getAdminComments(activeTab),
    getCommentCounts(),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">نظرات</h1>

        <p className="mt-2 text-sm text-slate-400">
          نظرات کاربران را بررسی کنید؛ فقط نظرات تاییدشده زیر پست‌ها نمایش داده
          می‌شوند
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={`/admin/comments?status=${tab.key}`}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition ${
              activeTab === tab.key
                ? "border-blue-500/40 bg-blue-500/10 text-blue-300"
                : "border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {tab.label}

            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
              {counts[tab.key].toLocaleString("fa-IR")}
            </span>
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="px-6 py-4 font-medium text-slate-300">نظر</th>

                <th className="px-6 py-4 font-medium text-slate-300">کاربر</th>

                <th className="px-6 py-4 font-medium text-slate-300">پست</th>

                <th className="px-6 py-4 font-medium text-slate-300">وضعیت</th>

                <th className="px-6 py-4 font-medium text-slate-300">تاریخ</th>

                <th className="px-6 py-4 font-medium text-slate-300">عملیات</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {comments.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    نظری در این بخش وجود ندارد.
                  </td>
                </tr>
              )}

              {comments.map((comment) => {
                const badge = statusBadge[comment.status];

                return (
                  <tr key={comment.id} className="transition hover:bg-white/5">
                    <td className="max-w-sm px-6 py-4 text-slate-200">
                      <p className="line-clamp-4 whitespace-pre-wrap leading-7">
                        {comment.content}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-slate-400">
                      <p className="text-white">{comment.author.name}</p>

                      <p className="mt-1 text-xs">{comment.author.email}</p>
                    </td>

                    <td className="max-w-[200px] px-6 py-4 text-slate-400">
                      {comment.post.id ? (
                        <Link
                          href={`/blog/${comment.post.id}`}
                          target="_blank"
                          className="block truncate transition hover:text-blue-400"
                        >
                          {comment.post.title}
                        </Link>
                      ) : (
                        <span className="text-slate-600">
                          {comment.post.title}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-400">
                      {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {comment.status !== "approved" && (
                          <form action={updateCommentStatus}>
                            <input
                              type="hidden"
                              name="commentId"
                              value={comment.id}
                            />

                            <input
                              type="hidden"
                              name="status"
                              value="approved"
                            />

                            <button
                              type="submit"
                              className="text-sm text-green-400 transition hover:text-green-300"
                            >
                              تایید
                            </button>
                          </form>
                        )}

                        {comment.status !== "rejected" && (
                          <form action={updateCommentStatus}>
                            <input
                              type="hidden"
                              name="commentId"
                              value={comment.id}
                            />

                            <input
                              type="hidden"
                              name="status"
                              value="rejected"
                            />

                            <button
                              type="submit"
                              className="text-sm text-yellow-400 transition hover:text-yellow-300"
                            >
                              رد
                            </button>
                          </form>
                        )}

                        <form action={deleteComment}>
                          <input
                            type="hidden"
                            name="commentId"
                            value={comment.id}
                          />

                          <button
                            type="submit"
                            className="text-sm text-red-400 transition hover:text-red-300"
                          >
                            حذف
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
