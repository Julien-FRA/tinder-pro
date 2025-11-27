import HomeLayout from "@/components/layout/HomeLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <HomeLayout itemsCenter={false}>
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
          <Link href="/candidates/login">Espace candidat</Link>
        </Button>
        <Button variant="outline" className="mt-6 ml-4">
          <Link href="/recruiters/login">Espace entreprise</Link>
        </Button>
      </div>
    </HomeLayout>
  );
}
