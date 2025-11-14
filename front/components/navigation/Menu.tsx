import Link from "next/link";
import { Button } from "../ui/button";

export default function Menu() {
  return (
    <header className="flex flex-row h-20 px-3 items-center border-b border-b-zinc-200 dark:border-b-zinc-700 fixed top-0 left-0 right-0 backdrop-blur-md shadow-sm">
      <Link href="/" className="text-2xl font-bold text-zinc-900 dark:text-white">
        Meet<span className="text-violet-600">Work</span>
      </Link>
      <nav className="ml-auto flex flex-row space-x-4 items-center">
        <Button variant="default">
          <Link href={"/candidates/login"}>Espace candidat</Link>
        </Button>
        <Button variant="outline">
          <Link href={"/recruiters/login"}>Espace recruteur</Link>
        </Button>
      </nav>
    </header>
  );
}
