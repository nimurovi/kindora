
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Images } from "lucide-react";

const galleryImages = [
    {
        src: "/photo5.webp",
        title: "Community Volunteering",
        category: "Volunteer Activities",
        className: "md:col-span-2 md:row-span-2",
    },
    {
        src: "/photo6.jpeg",
        title: "People Helping People",
        category: "Community Support",
        className: "",
    },
    {
        src: "/photo7.webp",
        title: "Education for Everyone",
        category: "Education",
        className: "",
    },
    {
        src: "/photo8.png",
        title: "Making a Difference",
        category: "Social Development",
        className: "md:col-span-2",
    },
];

export default function GallerySection() {
    return (
        <section className="bg-white px-4 py-20 sm:px-6 md:py-24 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl">

                {/* Section heading */}
                <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
                            <Images size={17} />
                            Our Gallery
                        </span>

                        <h2 className="mt-5 max-w-2xl text-3xl leading-tight font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
                            Moments That
                            <span className="text-[#08a77f]">
                                {" "}Inspire Change.
                            </span>
                        </h2>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
                            Every picture tells a story of kindness,
                            teamwork, and hope. Explore moments from
                            community activities that bring people together.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400">
                        <HeartHandshake size={20} />
                        Together We Make a Difference
                    </div>
                </div>

                {/* Gallery grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[190px]">

                    {galleryImages.map((image) => (
                        <div
                            key={image.title}
                            className={`group relative min-h-[230px] overflow-hidden rounded-2xl bg-gray-100 ${image.className} dark:bg-gray-900`}
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                            />

                            {/* Image overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 transition group-hover:from-black/85" />

                            {/* Image information */}
                            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                                <span className="inline-block rounded-full bg-green-500/90 px-3 py-1 text-xs font-semibold text-white">
                                    {image.category}
                                </span>

                                <h3 className="mt-3 text-lg font-bold text-white sm:text-xl">
                                    {image.title}
                                </h3>
                            </div>

                            {/* Hover icon */}
                            <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-green-700 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom message */}
                <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl bg-[#edf9f3] px-6 py-8 text-center sm:flex-row sm:text-left dark:bg-gray-900">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Be part of our next story.
                        </h3>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Join a community that believes every small action matters.
                        </p>
                    </div>

                    <Link
                        href="/upcoming-events"
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#08a77f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                        Join an Event
                        <ArrowUpRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
