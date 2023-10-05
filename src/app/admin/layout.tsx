import DefaultSidebar from "@/components/Sidebar";
import { headers } from "next/headers";

export const metadata = {
  title: "eddah admin panel",
  description: "Eddah admin panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const title = pathname.split("/")[2];
  return (
    <div className="flex gap-4">
      <DefaultSidebar />
      <div className="p-10 w-full">{children}</div>
    </div>
  );
}
