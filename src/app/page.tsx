"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      const { data, error } = await supabase
        .from("Counter")
        .select("counter")
        .eq("id", 1)
        .single();

      if (!error && data) {
        setCount(data.counter);
      }
    }

    fetchCount();
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white dark:bg-black">
      <div className="flex flex-col items-center gap-6">
        <span className="text-6xl font-bold text-black dark:text-white">
          {count === null ? "..." : count}
        </span>
        <button
          onClick={async () => {
            const newCount = (count ?? 0) + 1;
            setCount(newCount);
            const { error } = await supabase
              .from("Counter")
              .update({ counter: newCount })
              .eq("id", 1);
            if (error) console.error("Supabase update error:", error);
          }}
          className="rounded-full bg-black px-8 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-300"
        >
          Increment
        </button>
      </div>
    </div>
  );
}
