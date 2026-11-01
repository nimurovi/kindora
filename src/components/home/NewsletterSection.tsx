
import {
  ArrowRight,
  Mail,
  Send,
  Sparkles,
} from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#087f5b] px-6 py-14 text-white shadow-xl sm:px-12 sm:py-16 lg:px-20">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border-[45px] border-white/10" />
        <div className="pointer-events-none absolute -bottom-36 -left-20 h-80 w-80 rounded-full border-[45px] border-white/10" />

        <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
              <Sparkles size={16} />
              Stay Connected
            </div>

            <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Be Part of Something{" "}
              <span className="font-serif italic text-[#b9f6ca]">
                Meaningful.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
              Get the latest community events, volunteering opportunities,
              and inspiring stories delivered straight to your inbox.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-white/75">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#b9f6ca]" />
                Community updates
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#b9f6ca]" />
                Upcoming events
              </span>
            </div>
          </div>

          {/* Newsletter form - visual only */}
          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#b9f6ca] text-[#087f5b]">
              <Mail size={27} />
            </div>

            <h3 className="text-2xl font-semibold">
              Join Our Newsletter
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/75">
              A little inspiration and a lot of positive impact, delivered
              to your inbox.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-gray-400">
                <Mail size={18} />
                <span className="text-sm">Enter your email address</span>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b9f6ca] px-6 py-3.5 font-semibold text-[#075c43] transition hover:bg-white"
              >
                Subscribe
                <ArrowRight size={18} />
              </button>
            </div>

            <p className="mt-4 text-xs leading-5 text-white/60">
              Stay inspired. Stay involved. Make a difference.
            </p>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="relative z-10 mt-12 flex items-center justify-center gap-3 border-t border-white/15 pt-7 text-sm text-white/70">
          <Send size={16} />
          <span>Small updates. Bigger impact. Stronger communities.</span>
        </div>
      </div>
    </section>
  );
}
