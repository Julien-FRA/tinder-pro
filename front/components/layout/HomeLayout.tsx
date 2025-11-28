import Menu from "../navigation/Menu";

export default function HomeLayout({
  children,
  itemsCenter = true,
}: {
  children: React.ReactNode;
  itemsCenter?: boolean;
}) {
  return (
    <>
      <Menu />
      <main className={`flex min-h-screen w-full max-w-4xl flex-col ${itemsCenter ? "items-center" : "items-start"} justify-center mx-auto py-32 px-16 dark:bg-black gap-3`}>
        {children}
      </main>
    </>
  );
}
