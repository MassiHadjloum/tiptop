import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return <main className="flex items-center justify-center h-screen">

    {children}</main>;
}
