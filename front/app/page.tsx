export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-5xl font-bold text-zinc-900 dark:text-white">
          Welcome to <span className="text-blue-600">MeetWork!</span>
        </h1>
        <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300">
          Your professional networking application.
        </p>
      </main>
    </div>
  );
}
