import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full max-w-4xl flex-col items-start justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
      <h1 className="text-5xl font-bold text-zinc-900 dark:text-white">
        Welcome to <span className="text-violet-600">MeetWork!</span>
      </h1>
      <p className="mt-4 text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima saepe
        iusto enim alias quam dolore beatae, ratione nam vitae ullam, provident
        ut, libero corrupti vero! Modi ut eum tempore commodi?
      </p>
      <div>
        <Button variant="default" className="mt-6">
          <Link href="/candidates">Espace candidat</Link>
        </Button>
        <Button variant="outline" className="mt-6 ml-4">
          <Link href="/recruiters">Espace entreprise</Link>
        </Button>
      </div>
    </main>
  );
}
