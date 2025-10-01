"use client";
import { Berkshire_Swash, DM_Sans, Raleway } from "next/font/google";
import { LiaHomeSolid } from "react-icons/lia";
import { CiLogin } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const rw = Raleway({
  subsets: ["cyrillic", "latin"],
  weight: ["500"],
});

const bs = Berkshire_Swash({
  subsets: ["latin"],
  weight: ["400"],
});

const ds = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

// Function to generate menu items based on role and username
const getMenuItems = (role, userName) => {
  const nameSlug = userName
    ? userName.toLowerCase().replace(/\s+/g, "-")
    : "user";

  if (role === "teacher") {
    return [
      { href: `/dashboard/teacher/${nameSlug}`, label: "Dashboard" },
      {
        href: `/dashboard/teacher/${nameSlug}/lexical-analysis`,
        label: "Lexical Analysis",
      },
      {
        href: `/dashboard/teacher/${nameSlug}/semantic-analysis`,
        label: "Semantic Analysis",
      },
      {
        href: `/dashboard/teacher/${nameSlug}/internal-analysis`,
        label: "Internal Analysis",
      },
      { href: `/dashboard/teacher/${nameSlug}/reports`, label: "Reports" },
      { href: `/dashboard/teacher/${nameSlug}/settings`, label: "Settings" },
      { href: "/login", label: "Logout" },
    ];
  }

  if (role === "student") {
    return [
      { href: `/dashboard/student/${nameSlug}`, label: "Dashboard" },
      {
        href: `/dashboard/student/${nameSlug}/upload`,
        label: "Check Plagiarism",
      },
      { href: `/dashboard/student/${nameSlug}/report`, label: "Reports" },
      { href: `/dashboard/student/${nameSlug}/settings`, label: "Settings" },
      { href: "/login", label: "Logout" },
    ];
  }

  // Default / not logged in
  return [{ href: "/login", label: "Login" }];
};

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMenu, setIsMenu] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  // Get user display name - prioritize name, then email username
  const getUserDisplayName = () => {
    if (!session?.user) return "User";
    if (session.user.name) return session.user.name;
    return "User";
  };

  // Get dynamic menu items based on session role
  const menuItems = getMenuItems(session?.user?.role, getUserDisplayName());

  return (
    <>
      <div className={`${ds.className} w-full h-20 top-0 right-0 z-50 fixed`}>
        <div className="flex justify-between items-center h-20 px-6 backdrop-blur-sm bg-white/0 py-2">
          <div className={`${bs.className} text-gray-200 text-4xl`}>
            SluethInk.
          </div>

          <div className="flex items-center gap-4">
            {/* User Info Section */}
            {status === "authenticated" && session?.user && (
              <div className="flex items-center gap-4">
                <span
                  className={`${rw.className} text-gray-200 text-sm px-7 underline md:text-base font-medium`}
                >
                  {getUserDisplayName()}
                </span>
              </div>
            )}

            {/* Menu Button */}
            {!isMenu ? (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="border-none relative text-sm md:text-base text-gray-300 cursor-pointer transition-all duration-500"
                onClick={() => setIsMenu(true)}
              >
                <FiMenu className="text-4xl" />
              </motion.div>
            ) : (
              <div
                className={`${rw.className} flex items-center justify-center gap-12`}
              >
                <AnimatePresence>
                  {menuItems.map((item, index) => {
                    // Handle "Logout" differently
                    if (item.label === "Logout") {
                      return (
                        <motion.div
                          key="logout"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1,
                            ease: "easeOut",
                          }}
                        >
                          <button
                            onClick={() => {
                              setIsMenu(false);
                              handleLogout();
                            }}
                            className={`${rw.className} text-gray-200 text-sm md:text-base cursor-pointer hover:text-white transition-colors`}
                          >
                            {item.label}
                          </button>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1,
                          ease: "easeOut",
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Link
                          href={item.href}
                          className={`${rw.className} text-gray-200 text-sm md:text-base hover:text-white transition-colors`}
                          onClick={() => setIsMenu(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="border-none relative text-sm md:text-base text-gray-300 cursor-pointer"
                  onClick={() => setIsMenu(false)}
                >
                  <RxCross1 className="text-4xl" />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
