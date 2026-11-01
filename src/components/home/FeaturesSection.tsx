
import Link from "next/link";
import {
    CalendarDays,
    Users,
    HeartHandshake,
    MapPin,
    ShieldCheck,
    HandHeart,
    ArrowUpRight,
} from "lucide-react";

const features = [
    {
        number: "01",
        icon: CalendarDays,
        title: "Discover Community Events",
        description:
            "Explore upcoming community activities, social campaigns, and volunteering opportunities in one place.",
        color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    },
    {
        number: "02",
        icon: HeartHandshake,
        title: "Join Meaningful Causes",
        description:
            "Take part in activities that matter to you and contribute your time to make a positive difference.",
        color: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
    },
    {
        number: "03",
        icon: HandHeart,
        title: "Create Your Own Events",
        description:
            "Have an idea for your community? Create an event and invite others to participate in your initiative.",
        color: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-400",
    },
    {
        number: "04",
        icon: Users,
        title: "Build Strong Connections",
        description:
            "Meet people who share your interests, collaborate with volunteers, and grow a stronger community.",
        color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    },
    {
        number: "05",
        icon: MapPin,
        title: "Find Events Near You",
        description:
            "Discover community activities by location and find opportunities to get involved around you.",
        color: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
    },
    {
        number: "06",
        icon: ShieldCheck,
        title: "Manage Your Activities",
        description:
            "Keep track of the events you organize and the activities you have joined through your account.",
        color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
    },
];

export default function FeaturesSection() {
    return (
        <section className="bg-white px-4 py-20 sm:px-6 md:py-28 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl">

                {/* Section heading */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-950/50 dark:text-green-400">
                        <HeartHandshake size={17} />
                        What We Offer
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
                        Everything You Need to
                        <span className="text-green-600 dark:text-green-500">
                            {" "}Make an Impact
                        </span>
                    </h2>

                    <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-400">
                        Kindora makes it easier to discover opportunities,
                        connect with people, and turn your good intentions
                        into meaningful community action.
                    </p>
                </div>

                {/* Feature cards */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.number}
                                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-[#fbfefc] p-7 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/5 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-green-900"
                            >
                                {/* Number */}
                                <div className="absolute right-6 top-6 text-sm font-bold tracking-widest text-gray-200 dark:text-gray-700">
                                    {feature.number}
                                </div>

                                {/* Icon */}
                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color}`}
                                >
                                    <Icon size={27} strokeWidth={1.8} />
                                </div>

                                {/* Content */}
                                <h3 className="mt-7 text-xl font-bold text-gray-900 dark:text-white">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>

                                {/* Bottom decoration */}
                                <div className="mt-7 flex items-center justify-between">
                                    <span className="h-1 w-12 rounded-full bg-green-500 transition-all duration-300 group-hover:w-20" />

                                    <ArrowUpRight
                                        size={20}
                                        className="text-gray-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-green-600"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-3xl bg-[#08a77f] px-7 py-9 sm:flex-row sm:px-10">
                    <div>
                        <h3 className="text-2xl font-bold text-white">
                            Ready to make a difference?
                        </h3>
                        <p className="mt-2 text-sm text-green-50">
                            Find an event and become part of something meaningful.
                        </p>
                    </div>

                    <Link
                        href="/upcoming-events"
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
                    >
                        Explore Events
                        <ArrowUpRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
