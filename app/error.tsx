"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="font-display text-2xl">Something went wrong</h2>
      <button onClick={reset} className="rounded-brand bg-primary px-5 py-2.5 text-primary-ink">Try again</button>
    </main>
  );
}
