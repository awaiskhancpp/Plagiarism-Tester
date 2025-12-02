"use client";

import { usePathname } from "next/navigation";
<<<<<<< HEAD
import { useEffect, useRef } from "react";
=======
import { useEffect } from "react";
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
import { useSession } from "next-auth/react";

export default function ClearReportCache() {
  const { data: session } = useSession();
  const pathname = usePathname();
<<<<<<< HEAD
  const previousPathRef = useRef(pathname);

  useEffect(() => {
    if (!session?.user?.name) return;

    const reportPathPattern = `/dashboard/student/${session.user.name
      .toLowerCase()
      .replace(/\s+/g, "-")}/report/`;

    // Only clear when leaving a report page, not when entering one
    const wasOnReportPage =
      previousPathRef.current?.startsWith(reportPathPattern);
    const isOnReportPage = pathname.startsWith(reportPathPattern);

    if (wasOnReportPage && !isOnReportPage) {
      console.log("Left report page, clearing cache");
      localStorage.removeItem("report");
      sessionStorage.removeItem("report");
    }

    previousPathRef.current = pathname;
=======

  useEffect(() => {
    if (!session?.user?.name) return; // <-- guard

    const currentPath = `/dashboard/student/${session.user.name
      .toLowerCase()
      .replace(" ", "-")}/report/`;

    if (!pathname.startsWith(currentPath) && localStorage.getItem("report")) {
      localStorage.removeItem("report");
    }
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
  }, [pathname, session]);

  return null;
}
