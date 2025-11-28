import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}