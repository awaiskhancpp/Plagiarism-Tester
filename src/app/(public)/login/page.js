"use client";

import { DM_Sans, Raleway } from "next/font/google";
import { BsGoogle } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { signIn, getSession } from "next-auth/react";
import Grid from "@/components/Grid";
import { useSession } from "next-auth/react";

const dmSans_lighter = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

const dmSans_lightest = DM_Sans({
  subsets: ["latin"],
  weight: ["300"],
});

const rw = Raleway({
  subsets: ["cyrillic"],
  weight: ["400"],
});

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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

  const handleGoogleLogin = async () => {
    const res = await signIn("google", {
      redirect: false,
    });
    if (res?.error) {
      toast.error(res.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    if (res?.error) {
      toast.error(res.error);
    } else {
      console.log("Login successful", res);

      const session = await getSession();
      const role = session?.user?.role;

      if (role === "teacher") {
        router.push(
          `/dashboard/teacher/${session.user.name
            .toLowerCase()
            .split(" ")
            .join("-")}`
        );
      } else {
        router.push(
          `/dashboard/student/${session.user.name
            .toLowerCase()
            .split(" ")
            .join("-")}`
        );
      }
    }
  };

  return (
    <>
      <title>Sign in - SleuthInk</title>
      {/* 3) Render the Toaster once */}

      <div className="flex items-center justify-center h-auto bg-gradient-to-r from-black to-gray-900 px-4 py-32 sm:px-6 lg:px-0">
        <Grid height={120} />
        <div
          className={`w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl text-center rounded-3xl lg:rounded-4xl
                      px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 shadow-lg lg:shadow-2xl text-gray-200
                      ${
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
            className={`${rw.className} text-7xl mb-6 sm:mb-7 lg:mb-8
                        text-transparent bg-gradient-to-r from-purple-300 to-purple-950 bg-clip-text tracking-tight`}
          >
            Welcome <span className="text-gray-300">Back</span>
          </h1>

          {/* 4) Login form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5 lg:space-y-6"
          >
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value.trim(),
                })
              }
              className={`${dmSans_lighter.className} text-base sm:text-lg lg:text-xl w-full
                          h-17 md:h-16 lg:h-20 p-3 sm:p-4 placeholder:text-gray-200
                          border-gray-200 border-b-[1px] focus:outline-none`}
              placeholder="Enter Email"
              required
            />

            <div>
              <p className="text-right text-sm mr-3 sm:text-base">
                <Link
                  href="/forgot-password"
                  className="text-transparent bg-gradient-to-r bg-clip-text from-purple-200 to-purple-400 border-purple-300 border-b-[1px]"
                >
                  Forgot Password?
                </Link>
              </p>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`${dmSans_lighter.className} text-base sm:text-lg lg:text-xl w-full
                            h-17 md:h-16 lg:h-20 p-3 sm:p-4 placeholder:text-gray-200
                            border-gray-200 border-b-[1px] focus:outline-none`}
                placeholder="Enter Password"
                required
              />
            </div>

            <button
              type="submit"
              className={`${dmSans_lightest.className} cursor-pointer text-3xl w-full h-17 md:h-16 lg:h-20
                          p-3 sm:p-4 bg-gradient-to-r hover:bg-gradient-to-l transition-colors duration-300 hover:from-purple-700 hover:to-purple-900 from-purple-400 to-purple-900 text-gray-300`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className={`${dmSans_lightest.className} cursor-pointer bg-gradient-to-l text-3xl from-purple-400 to-purple-900
                          text-gray-300 w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4 flex items-center justify-center
                          gap-2 sm:gap-3 transition-colors duration-300 hover:from-purple-700 hover:to-purple-900`}
            >
              <BsGoogle className="text-3xl" />
              <span>Sign in with Google</span>
            </button>

            <p className="text-sm sm:text-base text-center mt-4 sm:mt-5">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-transparent bg-gradient-to-r bg-clip-text from-purple-200 to-purple-400
                           border-purple-300 border-b-[1px] font-medium hover:no-underline"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
