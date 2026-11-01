
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

const communityImages = [
    {
        src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=700",
        alt: "Volunteers working together",
        shape: "rounded-t-full",
    },
    {
        src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=700",
        alt: "People supporting their community",
        shape: "rounded-t-full",
    },
    {
        src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700",
        alt: "Community education and support",
        shape: "rounded-t-full",
    },
    {
        src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=700",
        alt: "Volunteers helping others",
        shape: "rounded-t-full",
    },
];

export default function HeroBanner() {
    return (
        <section className="relative overflow-hidden  p-2 sm:p-3">
            {/* Yellow decorative shape */}
            <div className="absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-yellow-400" />

            {/* Main banner */}
            <div className="relative mx-auto max-w-[1450px] overflow-hidden rounded-[28px] border-[6px] border-[#a8e4d4] bg-white dark:border-green-900 dark:bg-gray-950">

                {/* Hero content */}
                <div className="relative z-10 px-6 pb-12 pt-12 sm:px-12 md:px-16 lg:px-20 lg:pb-16 lg:pt-24">

                    {/* Small brand label */}
                    <div className="mb-8 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                        <Heart size={17} fill="currentColor" />
                        Kindora — Together We Care
                    </div>

                    {/* Heading */}
                    <h1 className="max-w-3xl font-serif text-4xl leading-[1.15] font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
                        Together We Create A
                        <span className="block">
                            <span className="relative mr-3 inline-block italic text-[#08a77f]">
                                Future
                                <svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 180 15"
                                    fill="none"
                                >
                                    <path
                                        d="M2 8 C25 -5 40 22 65 8 S105 -5 130 8 S155 20 178 7"
                                        stroke="#08a77f"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                            Of Hope
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-7 max-w-lg text-sm leading-7 text-gray-500 sm:text-base dark:text-gray-400">
                        We bring hope, compassion, and opportunities for
                        stronger communities by connecting people through
                        meaningful social development and community service.
                    </p>

                    {/* CTA */}
                    <Link
                        href="/upcoming-events"
                        className="group mt-7 inline-flex items-center gap-3"
                    >
                        <span className="rounded-full bg-[#08a77f] px-7 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
                            Join Us Today
                        </span>

                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-gray-900 transition group-hover:translate-x-1">
                            <ArrowRight size={20} />
                        </span>
                    </Link>
                </div>

                {/* Community image gallery */}
                <div className="relative z-10 grid grid-cols-2 gap-3 px-3 sm:grid-cols-4 sm:gap-5 sm:px-5 md:px-8">
                    {communityImages.map((image, index) => (
                        <div
                            key={index}
                            className="h-40 overflow-hidden rounded-t-full bg-gray-100 sm:h-48 md:h-56 lg:h-64"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="h-full w-full object-cover transition duration-700 hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
