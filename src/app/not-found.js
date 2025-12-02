"use client";
import Link from "next/link";
import { Raleway } from "next/font/google";
import { useSession } from "next-auth/react";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200"],
});

export default function NotFound() {
  const { data: session } = useSession();

  const role = session?.user?.role;
  const name = session?.user?.name || "user";

  const nameSlug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const getRoleRoute = () => {
    if (!role) return "/choose-role";
    return `/dashboard/${role}/${nameSlug}`;
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-black to-gray-900 ">
      <div className="text-center">
        <h2
          className={`${raleway.className} text-transparent p-2 text-8xl bg-gradient-to-r from-purple-300 to-purple-800 bg-clip-text`}
        >
          No Such Page
        </h2>
        <p className={`${raleway.className} text-white text-2xl mt-5 mb-20`}>
          Could not find requested resource.
        </p>
        <Link
          href={getRoleRoute()}
          className={`${raleway.className} bg-gradient-to-r text-white mt-10 py-7 px-10 text-2xl to-purple-400 from-purple-800`}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
