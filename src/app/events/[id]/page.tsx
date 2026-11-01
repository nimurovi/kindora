
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    MapPin,
    UserRound,
    CalendarCheck,
    LoaderCircle,
    LogIn,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Event {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnail: string;
    location: string;
    eventDate: string;
    creatorName: string;
    creatorEmail: string;
}

export default function EventDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const id = params.id as string;

    const { data: session, isPending } = authClient.useSession();

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [joining, setJoining] = useState(false);

    // Fetch event details
    useEffect(() => {
        if (!id) return;

        const fetchEvent = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `${API_URL}/get-event-by-id/${encodeURIComponent(id)}`,
                    { cache: "no-store" }
                );

                const data = await response.json();

                console.log("Fetched event data:", data);

                if (!response.ok) {
                    throw new Error(data.message || "Event not found.");
                }

                setEvent(data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to load event."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    // Join event
    const handleJoinEvent = async () => {
        if (isPending) return;

        if (!session?.user) {
            router.push(
                `/signin?callbackURL=${encodeURIComponent(`/events/${id}`)}`
            );
            return;
        }

        try {
            setError("");
            setJoining(true);

            const response = await fetch(`${API_URL}/join-event`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    eventId: id,
                    user: {
                        id: session.user.id,
                        name: session.user.name,
                        email: session.user.email,
                        image: session.user.image,
                    },
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to join event.");
            }

            alert(data.message);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong."
            );
        } finally {
            setJoining(false);
        }
    };

    // Loading state
    if (loading || isPending) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="text-center">
                    <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-green-600" />
                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                        Loading event details...
                    </p>
                </div>
            </div>
        );
    }

    // Error state
    if (error && !event) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-5 dark:bg-gray-950">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Event not found
                    </h1>
                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                        {error}
                    </p>
                    <Link
                        href="/upcoming-events"
                        className="mt-5 inline-flex rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                    >
                        Back to Events
                    </Link>
                </div>
            </main>
        );
    }

    if (!event) return null;

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900 dark:bg-gray-950 dark:text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Back button */}
                <Link
                    href="/upcoming-events"
                    className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                >
                    <ArrowLeft size={18} />
                    Back to Events
                </Link>

                {/* Event banner */}
                <div className="relative h-[280px] overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-800 sm:h-[420px]">
                    {event.thumbnail && (
                        <Image
                            src={event.thumbnail}
                            alt={event.title}
                            fill
                            priority
                            unoptimized
                            sizes="100vw"
                            className="object-cover"
                        />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6">
                        <span className="rounded-full bg-green-600 px-4 py-2 text-xs font-bold text-white">
                            {event.eventType}
                        </span>

                        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                            {event.title}
                        </h1>
                    </div>
                </div>

                {/* Event content */}
                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_350px]">

                    {/* Left section */}
                    <div>
                        <div className="grid gap-4 sm:grid-cols-2">

                            {/* Date */}
                            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                                <div className="rounded-xl bg-green-100 p-3 text-green-700 dark:bg-green-950 dark:text-green-400">
                                    <CalendarDays size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Event Date
                                    </p>
                                    <p className="mt-1 font-semibold">
                                        {new Date(
                                            `${event.eventDate.slice(0, 10)}T00:00:00`
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                                <div className="rounded-xl bg-green-100 p-3 text-green-700 dark:bg-green-950 dark:text-green-400">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Location
                                    </p>
                                    <p className="mt-1 font-semibold">
                                        {event.location}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 sm:p-8">
                            <h2 className="text-2xl font-bold">
                                About This Event
                            </h2>

                            <p className="mt-4 whitespace-pre-line leading-8 text-gray-600 dark:text-gray-400">
                                {event.description}
                            </p>

                            <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-green-100 p-3 text-green-700 dark:bg-green-950 dark:text-green-400">
                                        <UserRound size={22} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Organized by
                                        </p>
                                        <p className="font-semibold">
                                            {event.creatorName}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right section - Join card */}
                    <aside>
                        <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-green-100 p-3 text-green-700 dark:bg-green-950 dark:text-green-400">
                                    <CalendarCheck size={24} />
                                </div>
                                <div>
                                    <h2 className="font-bold">
                                        Join This Event
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Make a difference together.
                                    </p>
                                </div>
                            </div>

                            <div className="my-6 border-t border-gray-200 dark:border-gray-800" />

                            <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                                Be part of this community event and help create a positive impact.
                            </p>

                            <button
                                onClick={handleJoinEvent}
                                disabled={joining || isPending}
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
                            >
                                {session?.user ? (
                                    <CalendarCheck size={18} />
                                ) : (
                                    <LogIn size={18} />
                                )}

                                {session?.user ? "Join Event" : "Login to Join"}
                            </button>

                            {error && (
                                <p className="mt-3 text-center text-sm text-red-600 dark:text-red-400">
                                    {error}
                                </p>
                            )}

                            <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                                Login is required to join this event.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
