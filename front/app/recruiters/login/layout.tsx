import HomeLayout from "@/components/layout/HomeLayout";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HomeLayout itemsCenter={true}>{children}</HomeLayout>;
}
