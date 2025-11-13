import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CandidatesPage() {
  return (
    <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black gap-2">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white text-center">
        Bienvenue sur l&apos;espace
        <span className="text-violet-600"> candidat!</span>
      </h1>

      <div className="flex flex-row items-center mt-4">
        <p>Déjà inscrit ?</p>
        <Button variant="link" className="ml-2 p-0">
          <Link href="/candidates">Se connecter</Link>
        </Button>
      </div>
    </main>
  );
}
