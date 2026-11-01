
"use client";
import ThemeToggle from "@/shared/ThemeToggle";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  PlusCircle,
  LogOut,
  Menu,
  X,
  UserRound,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const isLoggedIn = !!user;
  const displayName = user?.name || "User";
  const profileImage = user?.image;

  const navLinks = [
    {
      name: "Upcoming Events",
      href: "/upcoming-events",
    },
  ];

  const dashboardLinks = [
    {
      name: "Create Event",
      href: "/create-event",
      icon: PlusCircle,
    },
    {
      name: "Manage Events",
      href: "/manage-events",
      icon: LayoutDashboard,
    },
    {
      name: "Joined Events",
      href: "/joined-events",
      icon: CalendarDays,
    },
  ];

  const handleLogout = async () => {
    await authClient.signOut();

    setDropdownOpen(false);
    setIsOpen(false);

    router.push("/signin");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-100 dark:border-green-900/60 bg-white dark:bg-slate-950/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo and Brand Name */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Kindora Logo"
            width={46}
            height={46}
            priority
            className="h-11 w-11 object-contain"
          />

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-green-800 dark:text-green-300">
              Kindora
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-[2px] text-green-600 dark:text-green-400">
              Connect. Participate. Grow.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              className={`text-sm font-semibold transition-colors ${pathname === link.href
                ? "text-green-700 dark:text-green-400"
                : "text-slate-600 dark:text-slate-300 hover:text-green-700 dark:hover:text-green-400"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Authentication */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Your existing Login/Profile button */}
        </div>
        <div className="hidden items-center gap-4 md:flex">
          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-lg bg-green-100 dark:bg-green-900/40" />
          ) : !isLoggedIn ? (
            <Link
              href="/signin"
              className="rounded-lg bg-green-700 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-800"
            >
              Login
            </Link>
          ) : (
            <div className="relative">

              {/* Profile Button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  title={displayName}
                  aria-label="Open profile menu"
                  aria-expanded={dropdownOpen}
                  className="group flex items-center gap-2 rounded-full border border-green-100 dark:border-green-900/60 bg-white dark:bg-slate-900 p-1.5 transition hover:border-green-300 hover:bg-green-50 dark:hover:bg-slate-800"
                >
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-green-100 dark:bg-green-900/40">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt={displayName}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    ) : (
                      <UserRound
                        size={22}
                        className="m-auto mt-2 text-green-700 dark:text-green-400"
                      />
                    )}
                  </div>

                  <span className="max-w-28 truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {displayName}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`mr-1 text-green-700 dark:text-green-400 transition-transform ${dropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <div className="border-t border-green-50 dark:border-green-900/60 p-2">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
              {/* Profile Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-xl border border-green-100 dark:border-green-900/60 bg-white dark:bg-slate-900 shadow-xl">

                  {/* User Information */}
                  <div className="border-b border-green-50 bg-green-50 dark:bg-slate-800 px-4 py-4">
                    <p className="truncate text-sm font-bold text-green-900 dark:text-green-200">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {user?.email}
                    </p>
                  </div>

                  {/* Dashboard Links */}
                  <div className="p-2">
                    {dashboardLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 transition hover:bg-green-50 dark:hover:bg-slate-800 hover:text-green-800 dark:hover:text-green-300"
                        >
                          <Icon size={18} className="text-green-700 dark:text-green-400" />
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Logout */}
                  <div className="border-t border-green-50 dark:border-green-900/60 p-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-green-800 dark:text-green-300 transition hover:bg-green-50 dark:hover:bg-slate-800 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-green-100 dark:border-green-900/60 bg-white dark:bg-slate-900 px-5 py-5 shadow-lg md:hidden">

          <div className="flex flex-col gap-2">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-green-50 dark:hover:bg-slate-800 hover:text-green-800 dark:hover:text-green-300"
              >
                {link.name}
              </Link>
            ))}

            {!isPending && !isLoggedIn && (
              <Link
                href="/signin"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-lg bg-green-700 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-green-800"
              >
                Login
              </Link>
            )}

            {!isPending && isLoggedIn && (
              <>
                {/* Mobile User Information */}
                <div className="my-2 flex items-center gap-3 border-y border-green-100 dark:border-green-900/60 py-4">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full bg-green-100 dark:bg-green-900/40">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt={displayName}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    ) : (
                      <UserRound
                        size={23}
                        className="m-auto mt-2 text-green-700 dark:text-green-400"
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-green-900 dark:text-green-200">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* Mobile Dashboard Links */}
                {dashboardLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-green-50 dark:hover:bg-slate-800 hover:text-green-800 dark:hover:text-green-300"
                    >
                      <Icon size={18} className="text-green-700 dark:text-green-400" />
                      {link.name}
                    </Link>
                  );
                })}

                {/* Mobile Logout */}
                <button
                  onClick={handleLogout}
                  className="mt-2 flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
