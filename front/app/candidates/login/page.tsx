import LoginForm from "@/app/candidates/login/components/LoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CandidatesLoginPage() {
  return (
    <>
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white text-center mb-4">
        Bienvenue sur l&apos;espace
        <span className="text-violet-600"> candidat!</span>
      </h1>
      <LoginForm />
      <div className="flex flex-row items-center">
        <p>Pas encore inscrit ?</p>
        <Button variant="link" className="ml-2 p-0">
          <Link href="/candidates/register">S&apos;inscrire</Link>
        </Button>
      </div>
    </>
  );
}
