// app/api/auth/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import "@/lib/mongodb";
import User from "@/models/user.model";
import settingsModel from "@/models/settings.model";

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long."),
  email: z.string().email("Please enter a valid email address."),
  role: z.enum(["student", "teacher", "developer"]),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(100, "Password must be less than 100 characters.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/\d/, "Password must contain at least one number.")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character."
    )
    .refine(
      (password) => !/\s/.test(password),
      "Password cannot contain spaces."
    ),
});

export async function POST(req) {
  try {
    const { username, email, role, password } = signupSchema.parse(
      await req.json()
    );

    if (await User.findOne({ email })) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: username,
      email,
      role,
      password: hash,
    });

    await settingsModel.create({
      userId: user._id,
      name: user.name,
      email: user.email,
    });

    return NextResponse.json(
      {
        message: "Registered successfully",
        user: { id: user._id, email, role },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.name === "ZodError") {
      // Return the first validation error
      const firstError = error.errors[0];
      return NextResponse.json({ error: firstError.message }, { status: 400 });
    }

    // Handle other errors
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}
