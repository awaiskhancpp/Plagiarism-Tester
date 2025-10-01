"use client";
import ClearReportCache from "@/components/ClearReportCache";
import StudentNavbar from "@/components/navbars/UserNavbar";

export default function StudentLayout({ children }) {
  return (
    <div className="">
      <StudentNavbar />
      <ClearReportCache />
      <main>{children}</main>
    </div>
  );
}
