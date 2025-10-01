"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ClearReportCache() {
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (!session?.user?.name) return; // <-- guard

    const currentPath = `/dashboard/student/${session.user.name
      .toLowerCase()
      .replace(" ", "-")}/report/`;

    if (!pathname.startsWith(currentPath) && localStorage.getItem("report")) {
      localStorage.removeItem("report");
    }
  }, [pathname, session]);

  return null;
}
