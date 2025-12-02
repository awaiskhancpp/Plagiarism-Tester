"use client";

import { useState, useEffect } from "react";
import { Roboto, DM_Sans } from "next/font/google";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RoleModal() {
  const { data: session, status, update } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const roles = [
    {
      id: "student",
      title: "Student",
      description:
        "Access learning materials, submit assignments, and track your academic progress with real-time feedback",
      features: [
        "Submit Documents",
        "View Reports",
        "Track Progress",
        "Academic Tools",
      ],
    },
    {
      id: "teacher",
      title: "Teacher",
      description:
        "Create courses, manage students, and evaluate academic integrity with comprehensive analytics",
      features: [
        "Manage Classes",
        "Review Submissions",
        "Grade Assignments",
        "Analytics Dashboard",
      ],
    },
    {
      id: "developer",
      title: "Developer",
      description:
        "Access advanced research tools, databases, and collaboration features for your projects",
      features: [
        "Research Database",
        "Citation Tools",
        "Collaboration Hub",
        "Advanced Analytics",
      ],
    },
  ];

  useEffect(() => {
    if (status === "authenticated" && session) {
      const roleJustSelected = localStorage.getItem("role_just_selected");
      const hasNoRole =
        !session.user.role ||
        session.user.role === null ||
        session.user.role === undefined ||
        session.user.role === "";

      if (hasNoRole && !roleJustSelected) {
        setShowModal(true);
      } else {
        setShowModal(false);
        if (roleJustSelected) {
          localStorage.removeItem("role_just_selected");
        }
      }
    }
  }, [status, session]);

  const handleSelectRole = async () => {
    if (!selectedRole || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to set role");
      }

      localStorage.setItem("role_just_selected", "true");
      setShowModal(false);

      const updatedSession = await update();

      setTimeout(async () => {
        await update();
      }, 1000);

      const nameSlug = session?.user?.name
        ? session.user.name
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
        : "user";

      setTimeout(() => {
        window.location.href = `/dashboard/${selectedRole}/${nameSlug}`;
      }, 1500);
    } catch (err) {
      alert("Failed to set role. Try again.");
      setIsLoading(false);
      localStorage.removeItem("role_just_selected");
    }
  };

  if (status === "loading" || !showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/80 to-gray-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md text-white rounded-lg border border-gray-700/50 max-w-5xl w-full shadow-2xl">
        {/* Header */}
        <div className="text-center p-10 pb-8 border-b border-gray-700/30">
          <h2
            className={`${roboto.className} text-5xl md:text-6xl font-bold mb-4`}
          >
            Select Your{" "}
            <span className="bg-gradient-to-r from-purple-300 to-purple-700 bg-clip-text text-transparent">
              Role
            </span>
          </h2>
          <p className={`${dmSans.className} text-gray-400 text-lg`}>
            Welcome,{" "}
            <span className="text-purple-300 font-medium">
              {session?.user?.name}
            </span>
            ! Choose your role to customize your SleuthInk experience
          </p>
        </div>

        {/* Role Cards */}
        <div className="px-10 py-10">
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`
                  relative bg-gray-800/40 backdrop-blur-sm rounded-lg p-7 
                  border-2 transition-all duration-300 cursor-pointer group
                  ${
                    selectedRole === role.id
                      ? "border-purple-500 bg-purple-900/20 shadow-lg shadow-purple-500/20"
                      : "border-gray-600/50 hover:border-purple-400/50 hover:bg-gray-700/30"
                  }
                `}
                onClick={() => setSelectedRole(role.id)}
              >
                {/* Role Title */}
                <h3
                  className={`${roboto.className} text-2xl font-bold mb-3 text-white`}
                >
                  {role.title}
                </h3>

                {/* Role Description */}
                <p
                  className={`${dmSans.className} text-gray-400 text-sm mb-6 leading-relaxed h-12`}
                >
                  {role.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 border-t border-gray-700/30 pt-6">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          selectedRole === role.id
                            ? "bg-purple-400 w-3 h-3"
                            : "bg-gray-500"
                        }`}
                      ></div>
                      <span
                        className={`${dmSans.className} text-sm text-gray-300 font-medium`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Selection Indicator */}
                {selectedRole === role.id && (
                  <div className="absolute -top-3 -right-3">
                    <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center border-3 border-gray-900 shadow-lg">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <div className="flex flex-col items-center pt-4">
            <button
              onClick={handleSelectRole}
              disabled={!selectedRole || isLoading}
              className={`
                ${
                  dmSans.className
                } px-14 py-4 rounded-lg text-lg  transition-all duration-300
                flex items-center justify-center min-w-[240px] shadow-lg
                ${
                  selectedRole && !isLoading
                    ? "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white duration-500 transition-colors"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Setting up your account...
                </>
              ) : selectedRole ? (
                `Continue as ${roles.find((r) => r.id === selectedRole)?.title}`
              ) : (
                "Select a role to continue"
              )}
            </button>

            <p
              className={`${dmSans.className} text-xs text-gray-500 mt-5 font-medium`}
            >
              You can change your role later in account settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
