 
"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignIn() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Email and Password Login
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            toast.error("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                toast.error(error.message || "Login failed!");
                return;
            }

            if (data) {
                toast.success("Login successful!");

                router.push("/");
                router.refresh();
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Google Login
    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            toast.error("Google login failed!");
        }
    };

    // GitHub Login
    const handleGithubSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });
        } catch (error) {
            toast.error("GitHub login failed!");
        }
    };

    return (
        <div className="min-h-screen bg-[#f0f6f1] dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-10">

            {/* Header */}
            <div className="text-center mb-6">
                <Link href="/">
                    <h1 className="text-3xl font-extrabold text-[#078b43] mb-3">
                        Kindora
                    </h1>
                </Link>

                <h2 className="text-2xl font-bold text-[#26332a] dark:text-slate-100">
                    Welcome Back!
                </h2>

                <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 max-w-sm">
                    Sign in to discover events, join community activities,
                    and make a difference.
                </p>
            </div>

            {/* Sign In Card */}
            <div className="w-full max-w-[400px] bg-[#fbfdfb] dark:bg-slate-900 border border-[#dfe8e0] dark:border-slate-700 rounded-2xl p-6 sm:p-7 shadow-lg shadow-green-900/5">

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-800 dark:text-slate-200 mb-1.5"
                        >
                            Email Address
                        </label>

                        <input
                            name="email"
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            className="w-full h-11 px-3 text-sm text-gray-800 dark:text-slate-200 border border-[#dfe8e0] dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/50 transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-800 dark:text-slate-200 mb-1.5"
                        >
                            Password
                        </label>

                        <input
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                            className="w-full h-11 px-3 text-sm text-gray-800 dark:text-slate-200 border border-[#dfe8e0] dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/50 transition"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 bg-[#078b43] hover:bg-[#067737] disabled:bg-green-400 text-white text-sm font-semibold rounded-lg shadow-md shadow-green-900/10 transition-colors duration-200"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-[#dfe5df] dark:bg-slate-700" />

                    <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">
                        OR CONTINUE WITH
                    </span>

                    <div className="flex-1 h-px bg-[#dfe5df] dark:bg-slate-700" />
                </div>

                {/* Social Sign In */}
                <div className="grid grid-cols-2 gap-3">

                    <button
                        onClick={handleGoogleSignIn}
                        type="button"
                        className="h-10 px-2 border border-[#dfe8e0] dark:border-slate-700 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-gray-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        <FcGoogle className="text-lg shrink-0" />
                        Google
                    </button>

                    <button
                        onClick={handleGithubSignIn}
                        type="button"
                        className="h-10 px-2 border border-[#dfe8e0] dark:border-slate-700 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-gray-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        <FaGithub className="text-lg shrink-0" />
                        GitHub
                    </button>

                </div>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-600 dark:text-slate-300 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-[#078b43] dark:text-green-400 font-semibold hover:underline"
                    >
                        Create Account
                    </Link>
                </p>

            </div>

            {/* Back to Home */}
            <Link
                href="/"
                className="mt-6 text-sm text-gray-400 dark:text-slate-400 hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
                ← Back to Home
            </Link>

        </div>
    );
}
 