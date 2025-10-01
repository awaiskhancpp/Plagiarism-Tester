// app/dashboard/layout.js
import CopywriteFooter from "@/components/footers/CopywriteFooter";
import { Toaster } from "sonner";
export default function DashboardLayout({ children }) {
  return (
    <>
      <Toaster />
      {children}
      <CopywriteFooter />
    </>
  );
}
