
import Link from "next/link";
import {
    HeartHandshake,
    ShieldCheck,
    GraduationCap,
    CalendarDays,
    ArrowUpRight,
    Users,
    HandHeart,
    Leaf,
} from "lucide-react";

const services = [
    {
        icon: HeartHandshake,
        title: "Community Events",
        description:
            "Discover meaningful community activities, social campaigns, and opportunities to make a positive difference.",
        featured: false,
    },
    {
        icon: ShieldCheck,
        title: "Volunteer & Participate",
        description:
            "Connect with people who care. Join local initiatives and contribute your time to causes that matter.",
        featured: true,
    },
    {
        icon: GraduationCap,
        title: "Create Events",
        description:
            "Have an idea to improve your community? Organize an event and bring people together for a shared purpose.",
        featured: false,
    },
    {
        icon: CalendarDays,
        title: "Track Your Activities",
        description:
            "Manage the events you organize and keep track of the community activities you have joined.",
        featured: false,
    },
];

export default function FeaturesSection() {
    return (
        <section className="overflow-hidden bg-white px-4 py-20 sm:px-6 md:py-24 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl">

                {/* Services heading */}
                <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div>
                        <span className="text-sm font-semibold tracking-wide text-emerald-700 dark:text-emerald-400">
                            Our Services
                        </span>

                        <h2 className="mt-3 max-w-2xl text-2xl leading-snug font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                            We are dedicated to making a
                            <br className="hidden sm:block" /> positive impact in our community.
                        </h2>
                    </div>

                    <div className="flex h-20 w-28 shrink-0 flex-col items-center justify-center self-start rounded-[45%] bg-[#91ded4] text-center text-emerald-900 md:self-center dark:bg-emerald-900 dark:text-emerald-100">
                        <Users size={20} />
                        <span className="mt-1 text-sm font-bold">
                            Together
                        </span>
                        <span className="text-[10px]">
                            Stronger Communities
                        </span>
                    </div>
                </div>

                {/* Service cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <div
                                key={service.title}
                                className={`group min-h-[175px] rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 ${
                                    service.featured
                                        ? "border-[#236c5d] bg-[#236c5d] text-white shadow-lg shadow-emerald-900/10"
                                        : "border-gray-200 bg-white text-gray-900 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/5 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:border-emerald-800"
                                }`}
                            >
                                <Icon
                                    size={23}
                                    strokeWidth={1.6}
                                    className={
                                        service.featured
                                            ? "text-white"
                                            : "text-[#236c5d] dark:text-emerald-400"
                                    }
                                />

                                <h3 className="mt-4 text-base font-semibold">
                                    {service.title}
                                </h3>

                                <p
                                    className={`mt-2 text-xs leading-5 ${
                                        service.featured
                                            ? "text-emerald-50"
                                            : "text-gray-500 dark:text-gray-400"
                                    }`}
                                >
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Impact section */}
                <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

                    {/* Image collage */}
                    <div className="relative mx-auto w-full max-w-xl">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">

                            {/* Left image column */}
                            <div className="grid gap-3 sm:gap-4">
                                <div className="h-36 overflow-hidden rounded-2xl sm:h-44">
                                    <img
                                        src="/photo1.jpeg"
                                        alt="Community volunteers working together"
                                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                    />
                                </div>

                                <div className="h-36 overflow-hidden rounded-2xl sm:h-44">
                                    <img
                                        src="/photo2.jpeg"
                                        alt="People connecting through community activities"
                                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Right image */}
                            <div className="h-full min-h-[300px] overflow-hidden rounded-2xl sm:min-h-[364px]">
                                <img
                                    src="/photo3.jpeg"
                                    alt="Children receiving community support"
                                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Community badge */}
                        <div className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-full bg-[#236c5d] px-5 py-3 text-white shadow-xl sm:right-8">
                            <div className="flex -space-x-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#236c5d] bg-emerald-200 text-emerald-900">
                                    <Users size={17} />
                                </div>
                                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#236c5d] bg-yellow-200 text-yellow-900">
                                    <HeartHandshake size={17} />
                                </div>
                                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#236c5d] bg-pink-200 text-pink-900">
                                    <HandHeart size={17} />
                                </div>
                            </div>

                            <span className="text-sm font-semibold">
                                Community Together
                            </span>
                        </div>
                    </div>

                    {/* Impact content */}
                    <div className="pt-5 lg:pt-0">
                        <span className="text-sm font-semibold tracking-wide text-emerald-700 dark:text-emerald-400">
                            Our Impact
                        </span>

                        <h2 className="mt-4 max-w-xl text-3xl leading-tight font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Real change through
                            <span className="text-[#08a77f]">
                                {" "}collective action.
                            </span>
                        </h2>

                        <p className="mt-6 text-sm leading-7 text-gray-600 dark:text-gray-400">
                            Every meaningful change starts with people coming
                            together. Kindora brings communities closer by
                            making it easier to organize events, find
                            volunteering opportunities, and participate in
                            initiatives that create a better future.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                            From environmental activities and educational
                            support to community service and social awareness,
                            we believe everyone has something valuable to
                            contribute.
                        </p>

                        {/* Impact highlights */}
                        <div className="mt-7 grid grid-cols-2 gap-5 border-t border-gray-200 pt-6 dark:border-gray-800">
                            <div>
                                <div className="flex items-center gap-2 text-[#08a77f]">
                                    <Users size={20} />
                                    <span className="text-sm font-semibold">
                                        Community
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Connect with people who care.
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-[#08a77f]">
                                    <Leaf size={20} />
                                    <span className="text-sm font-semibold">
                                        Positive Change
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Turn good intentions into action.
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <Link
                            href="/upcoming-events"
                            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#236c5d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#185747]"
                        >
                            Explore Our Community
                            <ArrowUpRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
