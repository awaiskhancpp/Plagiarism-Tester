// app/(public)/layout.js
import Navbar from "@/components/navbars/MainNavbar";
import Footer from "@/components/footers/Footer";

import { Toaster } from "sonner";
import CopywriteFooter from "@/components/footers/CopywriteFooter";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />

      {children}
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{
          className: "bg-white text-black",
          style: {
            background: "#fff",
            color: "#000",
            fontFamily: "DM Sans, sans-serif",
          },
        }}
      />
      <Footer />
      <CopywriteFooter />
    </>
  );
}
