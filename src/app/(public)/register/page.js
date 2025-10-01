"use client";
import { DM_Sans, Raleway } from "next/font/google";
import { BsGoogle } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Grid from "@/components/Grid";
import { useSession } from "next-auth/react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["1000"],
});

const dmSans_lighter = DM_Sans({
  subsets: ["latin-ext"],
  weight: ["400"],
});

const dmSans_lightest = DM_Sans({
  subsets: ["latin"],
  weight: ["300"],
});

const rw = Raleway({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Login() {
  const router = useRouter();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "", // Added this field
  });
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.role === "teacher") {
        router.push(
          `/dashboard/teacher/${session.user.name
            .toLowerCase()
            .split(" ")
            .join("-")}`
        );
      } else if (session.user.role === "student") {
        router.push(
          `/dashboard/student/${session.user.name
            .toLowerCase()
            .split(" ")
            .join("-")}`
        );
      }
    }
  }, [status, session]);

  useEffect(() => {
    // Check if touch device
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const handleMouseMove = (e) => {
      if (!isTouchDevice) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        const rotateY = (x - 0.5) * 20;
        const rotateX = (0.5 - y) * 20;
        setRotation({ x: rotateX, y: rotateY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTouchDevice]);

  const formHandler = async (e) => {
    e.preventDefault();

    // Password confirmation validation
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`/api/auth/register`, {
        username: form.username.trim(),
        email: form.email,
        role: form.role,
        password: form.password,
      });

      toast.success("Registration successful!");
      router.push("/login");
    } catch (error) {
      toast.error(
        error.response.data.error || "Registration failed. Please try again."
      );
      console.log(error.response.data.error);
    }
  };
  const handleGoogleLogin = async () => {
    const res = await signIn("google", {
      redirect: false,
    });
    if (res?.error) {
      toast.error(res.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-auto bg-gradient-to-r from-black to-gray-900 px-4 py-32 sm:px-6 lg:px-0 ">
      <title>Sign up - SleuthInk</title>
      <Grid height={170} />
      <div
        className={`w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl text-center rounded-3xl lg:rounded-4xl px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 shadow-lg lg:shadow-2xl text-gray-200 ${
          isTouchDevice
            ? ""
            : "transition-transform duration-100 ease-out transform-style-preserve-3d"
        }`}
        style={{
          transform: isTouchDevice
            ? "none"
            : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <h1
          className={`${rw.className} text-5xl  lg:text-8xl mb-6 sm:mb-7 lg:mb-8 text-transparent bg-gradient-to-r from-purple-300 to-purple-900 bg-clip-text  tracking-tight`}
        >
          <span className="text-gray-300">Create</span> Account
        </h1>

        <form
          onSubmit={formHandler}
          className="space-y-4 sm:space-y-5 lg:space-y-6"
        >
          <input
            type="text"
            value={form.username}
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
            name="username"
            className={`${dmSans_lighter.className} bg-transparent text-base sm:text-lg lg:text-xl w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4 placeholder:text-gray-400 text-gray-200 border-gray-200 border-b-[1px] focus:outline-none focus:border-purple-400`}
            placeholder="Full Name"
            required
          />
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value.trim() })}
            name="email"
            type="email"
            className={`${dmSans_lighter.className} bg-transparent text-base sm:text-lg lg:text-xl w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4 placeholder:text-gray-400 text-gray-200 border-gray-200 border-b-[1px] focus:outline-none focus:border-purple-400`}
            placeholder="Enter Email"
            required
          />

          <div className="relative mb-4">
            <select
              value={form.role}
              onChange={(e) => {
                setForm({ ...form, role: e.target.value });
              }}
              name="role"
              className={`${dmSans_lighter.className} appearance-none bg-transparent text-gray-200 text-xl w-full h-17 sm:h-20 p-4 cursor-pointer focus:outline-none border-gray-200 border-b-[1px] focus:border-purple-400`}
              required
            >
              <option value="" disabled hidden className="text-gray-400">
                Select your role
              </option>
              <option value="student" className="text-black">
                Student
              </option>
              <option value="teacher" className="text-black">
                Teacher
              </option>
              <option value="researcher" className="text-black">
                Researcher
              </option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <input
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            name="password"
            type="password"
            className={`${dmSans_lighter.className} bg-transparent text-base sm:text-lg lg:text-xl w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4 placeholder:text-gray-400 text-gray-200 border-gray-200 border-b-[1px] focus:outline-none focus:border-purple-400`}
            placeholder="Enter Password"
            required
          />
          <input
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            name="confirmPassword"
            type="password"
            className={`${dmSans_lighter.className} bg-transparent text-base sm:text-lg lg:text-xl w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4 placeholder:text-gray-400 text-gray-200 border-gray-200 border-b-[1px] focus:outline-none focus:border-purple-400`}
            placeholder="Confirm Password"
            required
          />

          <button
            type="submit"
            className={`${dmSans_lightest.className} cursor-pointer text-3xl w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4 bg-gradient-to-r hover:bg-gradient-to-l  from-purple-400 to-purple-900 text-gray-300 transition-colors duration-300 hover:from-purple-700 hover:to-purple-900`}
          >
            Register
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className={`${dmSans_lightest.className} cursor-pointer  bg-gradient-to-l text-3xl from-purple-400 to-purple-900 text-gray-300 w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4 flex items-center justify-center gap-2 sm:gap-3 transition-colors duration-300 hover:from-purple-700 hover:to-purple-900`}
          >
            <BsGoogle className="text-3xl" />
            <span>Sign up with Google</span>
          </button>

          <p className="text-sm sm:text-base text-center mt-4 sm:mt-5">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-transparent bg-gradient-to-r bg-clip-text from-purple-200 to-purple-400 border-purple-300 border-b-[1px] font-medium hover:no-underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
