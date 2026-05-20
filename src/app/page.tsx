import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <div className="mx-auto max-w-2xl px-6 py-24 space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Scraper Skeletons
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Per-lead preview sites for the scraper-dashboard outreach flow.
          Individual pages live at{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            /[place_id]
          </code>
          .
        </p>
        <p className="text-sm text-zinc-500">
          Demo:{" "}
          <Link
            href="/ChIJ_HOT_001"
            className="underline underline-offset-4 hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            /ChIJ_HOT_001
          </Link>
        </p>
      </div>
    </main>
  );
}
