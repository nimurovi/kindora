"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, Search, Ticket, ArrowRight, Loader2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import EventCard from "@/components/events/EventCard";


import type { Event } from "@/types/event";

export default function JoinedEventsPage() {
    const { data: session, isPending } = authClient.useSession();

    const [joinedEvents, setJoinedEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isPending) return;

        if (!session?.user) {
            setJoinedEvents([]);
            setLoading(false);
            return;
        }

        const fetchJoinedEvents = async () => {
            const { data, error } = await authClient.token()
            const token = data?.token
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/my-joined-events?userId=${encodeURIComponent(session.user.id)}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                        method: "GET",
                        cache: "no-store",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load joined events."
                    );
                }

                // Sort events by date: earliest first
                const sortedEvents = (data as Event[]).sort(
                    (a, b) =>
                        new Date(a.eventDate).getTime() -
                        new Date(b.eventDate).getTime()
                );

                setJoinedEvents(sortedEvents);
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

        fetchJoinedEvents();
    }, [session, isPending]);

    const filteredEvents = useMemo(() => {
        return joinedEvents.filter((event) =>
            [
                event.title,
                event.location,
                event.eventType,
            ]
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }, [joinedEvents, searchTerm]);

    if (isPending || loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-white dark:bg-gray-950">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 dark:bg-gray-950">
                <div className="max-w-md text-center">
                    <Ticket className="mx-auto mb-5 h-14 w-14 text-green-600" />

                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Login Required
                    </h1>

                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                        Please login to see the events you have joined.
                    </p>

                    <Link
                        href="/signin"
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                        Login Now
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10">
                    <div className="mb-3 flex items-center gap-2 text-green-600">
                        <CalendarDays size={22} />
                        <span className="font-semibold">
                            Your Activities
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                        Joined Events
                    </h1>

                    <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
                        Keep track of all the community events you have joined.
                        Your upcoming events are shown first.
                    </p>
                </div>

                {/* Search and count */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search your joined events..."
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:ring-green-900"
                        />
                    </div>

                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {joinedEvents.length}{" "}
                        {joinedEvents.length === 1 ? "Event" : "Events"} Joined
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                        {error}
                    </div>
                )}

                {/* Event cards */}
                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredEvents.map((event) => (
                            <EventCard
                                key={event._id}
                                event={event}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center dark:border-gray-800 dark:bg-gray-900">
                        <Ticket className="mx-auto mb-4 h-12 w-12 text-gray-400" />

                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {searchTerm
                                ? "No matching events found"
                                : "You haven't joined any events yet"}
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-gray-600 dark:text-gray-400">
                            {searchTerm
                                ? "Try searching with a different event name or location."
                                : "Explore upcoming community events and join the activities you care about."}
                        </p>

                        {!searchTerm && (
                            <Link
                                href="/upcoming-events"
                                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                            >
                                Explore Events
                                <ArrowRight size={18} />
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}