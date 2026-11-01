 
"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignUp() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const photoURL = formData.get("photoURL") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        // Validate required fields
        if (!name || !email || !password || !confirmPassword) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            toast.error(
                "Password must contain uppercase, lowercase letters and at least 6 characters."
            );
            return;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
                image: photoURL || undefined,
            });

            if (error) {
                toast.error(error.message || "Registration failed!");
                return;
            }

            if (data) {
                toast.success("Account created successfully!");

                router.push("/");
                router.refresh();
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Google Registration
    const handleGoogleSignUp = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            toast.error("Google registration failed!");
        }
    };

    // GitHub Registration
    const handleGithubSignUp = async () => {
        try {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });
        } catch (error) {
            toast.error("GitHub registration failed!");
        }
    };

    return (
        <div className="min-h-screen bg-[#f0f7f1] dark:bg-slate-950 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-7">
                    <Link href="/" className="inline-block mb-4">
                        <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-400">
                            Kindora
                        </h1>
                    </Link>

                    <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200">
                        Create an Account
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">
                        Join Kindora and make a difference in your community.
                    </p>
                </div>

                {/* Register Card */}
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-lg shadow-green-900/5">

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                                Full Name
                            </label>

                            <input
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                required
                                className="w-full h-11 px-4 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/50 transition"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                                Email Address
                            </label>

                            <input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="w-full h-11 px-4 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/50 transition"
                            />
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                                Photo URL
                                <span className="text-gray-400 dark:text-slate-400 font-normal ml-1">
                                    (Optional)
                                </span>
                            </label>

                            <input
                                name="photoURL"
                                type="url"
                                placeholder="https://example.com/photo.jpg"
                                className="w-full h-11 px-4 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/50 transition"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                                Password
                            </label>

                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                required
                                className="w-full h-11 px-4 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/50 transition"
                            />

                            <p className="text-xs text-gray-400 dark:text-slate-400 mt-1.5">
                                At least 6 characters, including uppercase and lowercase letters.
                            </p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                                Confirm Password
                            </label>

                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="Re-enter your password"
                                required
                                className="w-full h-11 px-4 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/50 transition"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold text-sm rounded-lg transition-all shadow-md shadow-green-600/20"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />

                        <span className="text-xs text-gray-400 dark:text-slate-400 font-medium">
                            OR CONTINUE WITH
                        </span>

                        <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
                    </div>

                    {/* Social Registration */}
                    <div className="grid grid-cols-2 gap-3">

                        <button
                            onClick={handleGoogleSignUp}
                            type="button"
                            className="h-11 border border-gray-200 dark:border-slate-700 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                        >
                            <FcGoogle className="text-xl" />
                            Google
                        </button>

                        <button
                            onClick={handleGithubSignUp}
                            type="button"
                            className="h-11 border border-gray-200 dark:border-slate-700 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                        >
                            <FaGithub className="text-xl" />
                            GitHub
                        </button>

                    </div>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-500 dark:text-slate-400 mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold"
                        >
                            Login
                        </Link>
                    </p>

                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link
                        href="/"
                        className="text-sm text-gray-400 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition"
                    >
                        ← Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
}
 