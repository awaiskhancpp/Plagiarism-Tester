"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
        "Access learning materials, submit assignments, and track your academic progress",
      icon: "🎓",
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
        "Create courses, manage students, and evaluate academic integrity",
      icon: "👩‍🏫",
      features: [
        "Manage Classes",
        "Review Submissions",
        "Grade Assignments",
        "Analytics Dashboard",
      ],
    },
    {
      id: "researcher",
      title: "Researcher",
      description:
        "Access advanced research tools, databases, and collaboration features",
      icon: "🔬",
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
      <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md text-white rounded-md border border-gray-700/50 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center p-8 pb-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-purple-300 to-purple-700 bg-clip-text text-transparent">
              Role
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Welcome, {session?.user?.name}! Select your role to customize your
            SleuthInk experience
          </p>
        </div>

        {/* Role Cards */}
        <div className="px-8 pb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`
                  relative bg-gray-800/50 backdrop-blur-sm rounded-md p-6 
                  border transition-all duration-300 cursor-pointer group
                  ${
                    selectedRole === role.id
                      ? "border-purple-500 bg-purple-900/30 scale-105"
                      : "border-gray-600 hover:border-purple-400 hover:bg-gray-700/50"
                  }
                `}
                onClick={() => setSelectedRole(role.id)}
              >
                {/* Role Icon */}
                <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                  {role.icon}
                </div>

                {/* Role Title */}
                <h3 className="text-xl font-bold text-center mb-3 text-white">
                  {role.title}
                </h3>

                {/* Role Description */}
                <p className="text-gray-400 text-center text-sm mb-4 leading-relaxed">
                  {role.description}
                </p>

                {/* Features List */}
                <div className="space-y-2">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                          selectedRole === role.id
                            ? "bg-purple-400"
                            : "bg-gray-500"
                        }`}
                      ></div>
                      <span className="text-xs text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Selection Indicator */}
                {selectedRole === role.id && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center border-2 border-white">
                      <svg
                        className="w-3 h-3 text-white"
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
          <div className="flex flex-col items-center">
            <button
              onClick={handleSelectRole}
              disabled={!selectedRole || isLoading}
              className={`
                px-12 py-4 rounded-md text-lg font-semibold transition-all duration-300
                flex items-center justify-center min-w-[200px]
                ${
                  selectedRole && !isLoading
                    ? "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white transform hover:scale-95"
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
                  Setting up...
                </>
              ) : selectedRole ? (
                `Continue as ${roles.find((r) => r.id === selectedRole)?.title}`
              ) : (
                "Select a role to continue"
              )}
            </button>

            <p className="text-xs text-gray-500 mt-4">
              You can change your role later in account settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
