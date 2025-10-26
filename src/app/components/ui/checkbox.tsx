import { motion } from "motion/react";
import { useAtom } from "jotai";
import { selectCategoryAtom } from "@/app/components/states";
import { ALL_CATEGORIES } from "@/app/components/types";

export const Checkbox = () => {
  const [selectedCategory, setCategories] = useAtom(selectCategoryAtom);
  return (
    <motion.fieldset
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="m-2 rounded-2xl border border-zinc-200 bg-white/95 p-3 text-zinc-900 shadow ring-1
        ring-black/5 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-100 sm:p-4"
    >
      <legend className="px-1 text-sm font-bold uppercase tracking-wide text-zinc-900 dark:text-zinc-50">
        <h2 className="text-sm pt-6 font-bold uppercase tracking-wide text-zinc-900 dark:text-zinc-50">
          Choose categories
        </h2>
      </legend>
      <div
        className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4"
        role="group"
        aria-label="Product categories"
        data-testid="category-checkboxes"
      >
        {ALL_CATEGORIES.map((cat) => {
          const id = `cat-${cat.replace(/\s+/g, "-")}`;
          const checked = selectedCategory.includes(cat);
          return (
            <label
              key={cat}
              htmlFor={id}
              className={`
                        flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm
                        transition-colors
                        ${
                          checked
                            ? "border-indigo-400 bg-indigo-50 text-indigo-900 dark:border-indigo-600/60 dark:bg-indigo-500/10 dark:text-indigo-200"
                            : "border-zinc-300/60 bg-white/70 text-zinc-900 dark:border-slate-700 dark:bg-white/5 dark:text-zinc-200"
                        }
                      `}
            >
              <input
                id={id}
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-400 dark:border-slate-600"
                checked={checked}
                onChange={(v) => {
                  if (v.target.checked) {
                    setCategories((category) =>
                      [...category, cat].filter(Boolean),
                    );
                  } else {
                    setCategories((category) =>
                      category.filter((c) => c !== cat),
                    );
                  }
                }}
              />
              <span className="truncate">{cat}</span>
            </label>
          );
        })}
      </div>
    </motion.fieldset>
  );
};
