"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

export default function ClearReportCache() {
  const { data: session } = useSession();
  const pathname = usePathname();
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
  }, [pathname, session]);

  return null;
}
