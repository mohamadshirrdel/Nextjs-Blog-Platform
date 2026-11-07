import React from "react";

const Categories = ({ parentCategories, subCategories }) => {
  return (
    <div className="overflow-hidden mt-5 rounded-xl border border-white/10 bg-slate-950">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-6 py-4 font-medium text-slate-300">
                دسته‌بندی
              </th>

              <th className="px-6 py-4 font-medium text-slate-300">Slug</th>

              <th className="px-6 py-4 font-medium text-slate-300">نوع</th>

              <th className="px-6 py-4 font-medium text-slate-300">عملیات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {parentCategories.map((category) => {
              const children = subCategories.filter(
                (sub) => sub.parent === category.id,
              );

              return (
                <React.Fragment key={category.id}>
                  <tr className="bg-white/[0.02]">
                    <td className="px-6 py-4 font-semibold text-white">
                      {category.title}
                    </td>

                    <td className="px-6 py-4 text-slate-400">
                      {category.slug}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                        دسته اصلی
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <form>
                        <button
                          type="submit"
                          className="text-sm text-red-400 transition hover:text-red-300"
                        >
                          حذف
                        </button>
                      </form>
                    </td>
                  </tr>

                  {children.map((child) => (
                    <tr key={child.id}>
                      <td className="px-6 py-4 pr-12 text-slate-300">
                        ↳ {child.title}
                      </td>

                      <td className="px-6 py-4 text-slate-500">{child.slug}</td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
                          زیر‌دسته
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <form>
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
                </React.Fragment>
              );
            })}

            {parentCategories.length === 0 && (
              <tr>
                <td
                  colspan="4"
                  className="px-6 py-12 text-center text-slate-500"
                >
                  هنوز دسته‌بندی‌ای ایجاد نشده است.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
