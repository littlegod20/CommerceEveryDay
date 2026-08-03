import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden p-6 md:p-10">{children}</main>
    </div>
  );
}
