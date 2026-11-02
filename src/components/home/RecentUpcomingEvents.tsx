
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Loader2 } from "lucide-react";

import EventCard from "@/components/events/EventCard";
import type { Event } from "@/types/event";
 
const API_URL = process.env.NEXT_PUBLIC_API_URL ;
export default function RecentUpcomingEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/recent-upcoming-events`,
                    {
                        method: "GET",
                        cache: "no-store",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch upcoming events."
                    );
                }

                setEvents(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUpcomingEvents();
    }, []);

    return (
        <section className="bg-[#f8fcf9] px-4 py-20 sm:px-6 md:py-24 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl">

                {/* Section heading */}
                <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
                            <CalendarDays size={17} />
                            Upcoming Activities
                        </span>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Recent Upcoming Events
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
                            Discover upcoming community activities and find
                            opportunities to make a positive difference.
                        </p>
                    </div>

                    <Link
                        href="/upcoming-events"
                        className="inline-flex w-fit items-center gap-2 font-semibold text-green-700 transition hover:gap-3 dark:text-green-400"
                    >
                        View All Events
                        <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex min-h-64 items-center justify-center">
                        <Loader2 className="h-9 w-9 animate-spin text-green-600" />
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                        {error}
                    </div>
                )}

                {/* Event cards */}
                {!loading && !error && events.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <EventCard
                                key={event._id}
                                event={event}
                            />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && events.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center dark:border-gray-800 dark:bg-gray-900">
                        <CalendarDays className="mx-auto h-12 w-12 text-gray-400" />

                        <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                            No Upcoming Events
                        </h3>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            New community events will appear here when they
                            are created.
                        </p>
                    </div>
                )}

                {/* Bottom link */}
                {!loading && !error && events.length > 0 && (
                    <div className="mt-12 text-center">
                        <Link
                            href="/upcoming-events"
                            className="inline-flex items-center gap-2 rounded-xl border border-green-600 px-7 py-3 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white dark:text-green-400 dark:hover:text-white"
                        >
                            Explore All Events
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
