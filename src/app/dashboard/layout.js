// app/dashboard/layout.js
import CopywriteFooter from "@/components/footers/CopywriteFooter";
import { Toaster } from "sonner";
export default function DashboardLayout({ children }) {
  return (
    <>
<<<<<<< HEAD
      <Toaster richColors />
=======
      <Toaster />
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
      {children}
      <CopywriteFooter />
    </>
  );
}
