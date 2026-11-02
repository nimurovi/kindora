
"use client";

import { useEffect, useMemo, useState } from "react";
import {
    CalendarDays,
    Search,
    Leaf,
    Heart,
    ArrowRight,
    Sparkles,
    MapPin,
} from "lucide-react";

import EventCard from "@/components/events/EventCard";

import { Event } from "@/types/event";

const categories = [
    "All Events",
    "Cleanup",
    "Plantation",
    "Donation",
    "Awareness",
    "Community Service",
    "Recycling",
];

// Local date in YYYY-MM-DD format
const getToday = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export default function UpcomingEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedCategory, setSelectedCategory] =
        useState("All Events");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/get-events`,
                    
                    { 
                        method: "GET",
                        cache: "no-store" }
                );

                if (!response.ok) {
                    throw new Error("Unable to load events.");
                }

                const data = await response.json();

                setEvents(Array.isArray(data) ? data : data.events || []);
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

        fetchEvents();
    }, []);

    // Only upcoming events
    const upcomingEvents = useMemo(() => {
        const today = getToday();

        return events.filter(
            (event) => event.eventDate?.slice(0, 10) > today
        );
    }, [events]);

    // Category and search filtering
    const filteredEvents = useMemo(() => {
        return upcomingEvents.filter((event) => {
            const matchesCategory =
                selectedCategory === "All Events" ||
                event.eventType === selectedCategory;

            const matchesSearch =
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [upcomingEvents, selectedCategory, searchTerm]);

    return (
        <main className="min-h-screen bg-[#f7faf7] dark:bg-slate-950">

            {/* ================= HERO SECTION ================= */}
            <section className="relative overflow-hidden bg-gradient-to-r from-[#e5f5e9] via-[#f2faf4] to-[#d8f0df] dark:from-slate-950 dark:via-slate-900 dark:to-[#102d20]">

                <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-green-200/30 dark:bg-green-500/10 blur-3xl" />
                <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-200/30 dark:bg-emerald-500/10 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 md:grid-cols-2 md:px-8 lg:py-20">

                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 dark:border-green-800 bg-white dark:bg-slate-900/85 px-4 py-2 text-sm font-semibold text-green-800 dark:text-green-300 shadow-sm">
                            <Leaf size={16} />
                            Together for a Better Tomorrow
                        </div>

                        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#173b29] dark:text-green-100 sm:text-5xl lg:text-6xl">
                            Upcoming
                            <span className="block text-green-700 dark:text-green-400">
                                Events
                            </span>
                        </h1>

                        <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 dark:text-slate-300 sm:text-lg">
                            Join community events and make a positive impact
                            in your area. Every small action creates a better
                            tomorrow.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 rounded-xl bg-white dark:bg-slate-900 px-4 py-3 shadow-sm">
                                <CalendarDays className="text-green-700 dark:text-green-400" size={20} />
                                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">
                                    {upcomingEvents.length} Upcoming Events
                                </span>
                            </div>

                            <div className="flex items-center gap-2 rounded-xl bg-white dark:bg-slate-900 px-4 py-3 shadow-sm">
                                <Heart className="text-green-700 dark:text-green-400" size={20} />
                                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">
                                    Make an Impact
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Hero image */}
                    <div className="relative hidden md:block">
                        <img
                            src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1000"
                            alt="Green trees and nature"
                            className="h-[310px] w-full rounded-[35px] object-cover shadow-xl"
                        />

                        <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-lg">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400">
                                <SproutIcon />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-gray-900 dark:text-slate-100">
                                    Be the change
                                </p>
                                <p className="text-xs text-gray-500 dark:text-slate-400">
                                    Start something meaningful
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= EVENTS SECTION ================= */}
            <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">

                {/* Section heading */}
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-green-700 dark:text-green-400">
                            <Sparkles size={16} />
                            Explore opportunities
                        </div>

                        <h2 className="text-3xl font-extrabold text-[#173b29] dark:text-green-100">
                            Find Your Next Event
                        </h2>

                        <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                            Discover initiatives and become part of something bigger.
                        </p>
                    </div>

                    <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
                        Showing {filteredEvents.length} of {upcomingEvents.length} events
                    </p>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400"
                        />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search events or locations..."
                            className="w-full rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3.5 pl-12 pr-5 text-sm text-gray-700 dark:text-slate-300 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                        />
                    </div>
                </div>

                {/* Category filters */}
                <div className="mb-9 flex gap-3 overflow-x-auto pb-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${selectedCategory === category
                                ? "bg-green-700 text-white shadow-md shadow-green-700/20"
                                : "border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-300 hover:border-green-300 hover:text-green-700 dark:hover:text-green-400"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* ================= EVENT GRID ================= */}
                {loading ? (
                    <div className="py-20 text-center">
                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-200 dark:border-green-800 border-t-green-700" />
                        <p className="mt-4 text-sm font-medium text-gray-500 dark:text-slate-400">
                            Loading upcoming events...
                        </p>
                    </div>
                ) : error ? (
                    <div className="rounded-2xl border border-red-100 bg-red-50 dark:bg-red-950/30 p-10 text-center">
                        <p className="font-semibold text-red-600">{error}</p>
                        <p className="mt-2 text-sm text-red-500">
                            Please check your API server and try again.
                        </p>
                    </div>
                ) : filteredEvents.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredEvents.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-green-200 dark:border-green-800 bg-white dark:bg-slate-900 px-5 py-20 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400">
                            <CalendarDays size={30} />
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-slate-100">
                            No events found
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-slate-400">
                            We couldn&apos;t find any upcoming events matching
                            your search. Try another category or search term.
                        </p>

                        <button
                            onClick={() => {
                                setSelectedCategory("All Events");
                                setSearchTerm("");
                            }}
                            className="mt-6 rounded-full bg-green-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-800"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </section>

            {/* ================= BOTTOM CTA ================= */}
            <section className="px-5 pb-14 md:px-8">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-3xl bg-[#174b31] dark:bg-[#102d20] px-8 py-12 text-center text-white md:flex-row md:px-14 md:text-left">

                    <div>
                        <h2 className="text-2xl font-extrabold sm:text-3xl">
                            Have an idea to make a difference?
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-green-100">
                            Start your own community initiative and inspire others to join.
                        </p>
                    </div>

                    <a
                        href="/create-event"
                        className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white dark:bg-slate-900 px-7 py-3.5 text-sm font-bold text-green-800 dark:text-green-300 transition hover:bg-green-50 dark:hover:bg-slate-800"
                    >
                        Create an Event
                        <ArrowRight size={18} />
                    </a>
                </div>
            </section>

        </main>
    );
}

// Small icon component
function SproutIcon() {
    return <Leaf size={24} />;
}
