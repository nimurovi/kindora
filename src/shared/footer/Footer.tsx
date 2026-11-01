
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  
  Mail,
  MapPin,
  Heart,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const footerLinks = {
  Explore: [
    { label: "Home", href: "/" },
    { label: "Upcoming Events", href: "/upcoming-events" },
    { label: "Create Event", href: "/create-event" },
  ],
  Community: [
    { label: "Manage Events", href: "/manage-events" },
    { label: "Joined Events", href: "/joined-events" },
    { label: "Sign In", href: "/signin" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-[#f5faf7] text-gray-900 dark:border-white/10 dark:bg-[#080f0c] dark:text-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-green-300/20 blur-[100px] dark:bg-green-500/10" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-emerald-300/20 blur-[100px] dark:bg-emerald-500/10" />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:px-10">
        {/* Main brand section */}
        <div className="grid gap-12 border-b border-gray-200 pb-14 dark:border-white/10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Kindora logo"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <span className="text-2xl font-bold tracking-tight">
                Kindora<span className="text-emerald-600">.</span>
              </span>
            </Link>

            <h2 className="mt-7 text-3xl font-bold leading-tight sm:text-4xl">
              Together, we make
              <span className="block font-serif italic text-emerald-600">
                good things happen.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-gray-400">
              A place where people connect, share ideas, and turn small acts
              of kindness into meaningful community impact.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:border-emerald-500 hover:bg-emerald-600 hover:text-white dark:border-white/15"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:border-emerald-500 hover:bg-emerald-600 hover:text-white dark:border-white/15"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:border-emerald-500 hover:bg-emerald-600 hover:text-white dark:border-white/15"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
                {heading}
              </h3>

              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
              Get in touch
            </h3>

            <div className="space-y-5 text-sm text-gray-600 dark:text-gray-400">
              <p className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                <span>Connect with our community</span>
              </p>

              <p className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />
                <span>Building stronger communities, everywhere.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between gap-4 py-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} Kindora. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
            Made with <Heart size={13} className="fill-emerald-600 text-emerald-600" /> for communities.
          </p>

          <Link
            href="/upcoming-events"
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
          >
            Explore Events
            <ArrowUpRight
              size={14}
              className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
