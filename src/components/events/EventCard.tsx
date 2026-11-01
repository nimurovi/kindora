
import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    MapPin,
    Leaf,
} from "lucide-react";
import { Event } from "@/types/event";

interface EventCardProps {
    event: Event;
}

const categoryStyles: Record<string, string> = {
    Donation: "bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-300",
    Plantation: "bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400",
    Cleanup: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300",
    Awareness: "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-300",
    Recycling: "bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-300",
    "Community Service": "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
};

export default function EventCard({ event }: EventCardProps) {
    const categoryStyle =
        categoryStyles[event.eventType] || "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300";

    const formattedDate = new Date(
        `${event.eventDate.slice(0, 10)}T00:00:00`
    ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Event Thumbnail */}
            <div className="relative h-52 overflow-hidden bg-green-50 dark:bg-slate-800">
                <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Category */}
                <span
                    className={`absolute left-4 top-4 rounded-full px-4 py-2 text-xs font-bold ${categoryStyle}`}
                >
                    <Leaf size={13} className="mr-1 inline" />
                    {event.eventType}
                </span>

                {/* Date */}
                <div className="absolute right-4 top-4 rounded-xl bg-white dark:bg-slate-950/95 px-3 py-2 text-center shadow-sm">
                    <CalendarDays
                        size={16}
                        className="mx-auto mb-1 text-green-700 dark:text-green-400"
                    />
                    <p className="text-xs font-bold text-gray-800 dark:text-slate-200">
                        {formattedDate}
                    </p>
                </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col p-5">

                <h3 className="line-clamp-1 text-lg font-bold text-gray-900 dark:text-slate-100 transition-colors group-hover:text-green-700 dark:hover:text-green-400">
                    {event.title}
                </h3>

                {/* Location */}
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                    <MapPin size={16} className="shrink-0 text-green-600 dark:text-green-400" />
                    <span className="line-clamp-1">{event.location}</span>
                </div>

                {/* Description */}
                <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-gray-500 dark:text-slate-400">
                    {event.description}
                </p>

                {/* Organizer and Button */}
                <div className="mt-auto flex items-center justify-between gap-2 border-t border-gray-100 dark:border-slate-700 pt-4">
                    <div className="min-w-0">
                        <p className="text-xs text-gray-400 dark:text-slate-400">Organized by</p>
                        <p className="truncate text-sm font-semibold text-gray-800 dark:text-slate-200">
                            {event.creatorName}
                        </p>
                    </div>

                    <Link
                        href={`/events/${event._id}`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-green-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-green-800"
                    >
                        View Event
                        <ArrowRight size={15} />
                    </Link>
                </div>
            </div>
        </article>
    );
}
