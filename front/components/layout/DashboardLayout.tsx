import SideMenu from "../navigation/SideMenu";
import TopMenu from "../navigation/TopMenu";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full">
      <SideMenu />
      <div className="flex-1 lg:ml-64 flex flex-col">
        <TopMenu />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
