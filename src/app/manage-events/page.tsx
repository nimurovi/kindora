"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
    CalendarDays,
    MapPin,
    Pencil,
    Search,
    Trash2,
    X,
    LoaderCircle,
    CalendarPlus,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";



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

interface EventForm {
    title: string;
    description: string;
    eventType: string;
    thumbnail: string;
    location: string;
    eventDate: string;
}

const emptyForm: EventForm = {
    title: "",
    description: "",
    eventType: "Community Service",
    thumbnail: "",
    location: "",
    eventDate: "",
};

export default function ManageEventsPage() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [form, setForm] = useState<EventForm>(emptyForm);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);

    // Load only the logged-in user's events.
    useEffect(() => {
        if (isPending) return;

        if (!user) {
            setLoading(false);
            return;
        }

        const fetchMyEvents = async () => {
            try {
                setLoading(true);
                setError("");


                const response = await fetch(
                    `http://localhost:8000/get-event/${user.email}`,
                    {
                        method: "GET",
                        cache: "no-store",
                    }
                );


                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to load your events.");
                }

                setEvents(Array.isArray(data) ? data : data.events || []);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Something went wrong."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyEvents();
    }, [user, isPending]);

    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const matchesSearch =
                event.title.toLowerCase().includes(search.toLowerCase()) ||
                event.location.toLowerCase().includes(search.toLowerCase());

            const matchesFilter =
                filter === "All" || event.eventType === filter;

            return matchesSearch && matchesFilter;
        });
    }, [events, search, filter]);

    const categories = [
        "All",
        ...Array.from(new Set(events.map((event) => event.eventType))),
    ];

    const openEditModal = (event: Event) => {
        setEditingEvent(event);

        setForm({
            title: event.title,
            description: event.description,
            eventType: event.eventType,
            thumbnail: event.thumbnail,
            location: event.location,
            eventDate: event.eventDate.slice(0, 10),
        });

        setError("");
        setSuccess("");
    };

    const closeEditModal = () => {
        setEditingEvent(null);
        setForm(emptyForm);
        setError("");
    };

    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            setError("Please log in to update your event.");
            return;
        }

        if (!editingEvent) return;

        if (!form.eventDate || form.eventDate <= getToday()) {
            setError("Please select a future event date.");
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const response = await fetch(
                `http://localhost:8000/update-event/${user.email}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        eventId: editingEvent._id,
                        ...form,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update event.");
            }

            setEvents((previousEvents) =>
                previousEvents.map((event) =>
                    event._id === editingEvent._id
                        ? { ...event, ...form }
                        : event
                )
            );

            setSuccess("Your event has been updated successfully.");
            closeEditModal();

        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Could not update event."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!user || !deletingEvent) return;

        const event = deletingEvent;

        try {
            setDeletingId(event._id);
            setError("");
            setSuccess("");

            const response = await fetch(
                `http://localhost:8000/delete-event/${user.email}`,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        eventId: event._id
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to delete event.");
            }

            setEvents((previousEvents) =>
                previousEvents.filter((item) => item._id !== event._id)
            );

            setSuccess("Event deleted successfully.");
            setDeletingEvent(null);

        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Could not delete event."
            );
        } finally {
            setDeletingId(null);
        }
    };

    if (isPending || loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="text-center">
                    <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-green-600" />
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        Loading your events...
                    </p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-5 dark:bg-gray-950">
                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Login required
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Please log in to manage your events.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900 dark:bg-gray-950 dark:text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Page heading */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                            Your dashboard
                        </p>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Manage Events
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            View, update, and manage the events you have created.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-3 dark:border-green-900 dark:bg-green-950/40">
                        <CalendarDays className="h-6 w-6 text-green-600 dark:text-green-400" />
                        <div>
                            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                                {events.length}
                            </p>
                            <p className="text-xs text-green-700 dark:text-green-300">
                                Total events
                            </p>
                        </div>
                    </div>
                </div>

                {/* Alerts */}
                {error && !editingEvent && (
                    <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300">
                        {success}
                    </div>
                )}

                {/* Search and filter */}
                <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="search"
                            placeholder="Search by event name or location..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                        />
                    </div>

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none focus:border-green-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Event list */}
                {filteredEvents.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
                        <CalendarPlus className="mx-auto h-12 w-12 text-gray-400" />
                        <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                            {events.length === 0
                                ? "You haven't created any events yet"
                                : "No matching events found"}
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            {events.length === 0
                                ? "Your created events will appear here."
                                : "Try changing your search or category filter."}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {filteredEvents.map((event) => (
                            <article
                                key={event._id}
                                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-black/30"
                            >
                                <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
                                    {event.thumbnail ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={event.thumbnail}
                                            alt={event.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-gray-400">
                                            <CalendarDays size={40} />
                                        </div>
                                    )}

                                    <span className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                                        {event.eventType}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <h2 className="line-clamp-1 text-xl font-bold text-gray-900 dark:text-white">
                                        {event.title}
                                    </h2>

                                    <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                        {event.description}
                                    </p>

                                    <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <p className="flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4 text-green-600 dark:text-green-400" />
                                            {formatDate(event.eventDate)}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                                            <span className="line-clamp-1">{event.location}</span>
                                        </p>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
                                        <button
                                            type="button"
                                            onClick={() => openEditModal(event)}
                                            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setDeletingEvent(event)}
                                            disabled={deletingId === event._id}
                                            className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950"
                                        >
                                            {deletingId === event._id ? (
                                                <LoaderCircle size={16} className="animate-spin" />
                                            ) : (
                                                <Trash2 size={16} />
                                            )}
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit event modal */}
            {editingEvent && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
                    <div className="my-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-800">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Update Event
                                </h2>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Edit your event information below.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeEditModal}
                                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                aria-label="Close edit form"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleUpdate}
                            className="space-y-5 p-5">
                            {error && (
                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                                    {error}
                                </div>
                            )}

                            <div className="grid gap-5 sm:grid-cols-2">
                                <FormField label="Event Title">
                                    <input
                                        required
                                        value={form.title}
                                        onChange={(e) =>
                                            setForm({ ...form, title: e.target.value })
                                        }
                                        className={inputClass}
                                        placeholder="Enter event title"
                                    />
                                </FormField>

                                <FormField label="Event Type">
                                    <select
                                        value={form.eventType}
                                        onChange={(e) =>
                                            setForm({ ...form, eventType: e.target.value })
                                        }
                                        className={inputClass}
                                    >
                                        {[
                                            "Donation",
                                            "Plantation",
                                            "Cleanup",
                                            "Awareness",
                                            "Recycling",
                                            "Community Service",
                                        ].map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </FormField>

                                <FormField label="Location">
                                    <input
                                        required
                                        value={form.location}
                                        onChange={(e) =>
                                            setForm({ ...form, location: e.target.value })
                                        }
                                        className={inputClass}
                                        placeholder="Enter event location"
                                    />
                                </FormField>

                                <FormField label="Event Date">
                                    <input
                                        required
                                        type="date"
                                        min={getToday()}
                                        value={form.eventDate}
                                        onChange={(e) =>
                                            setForm({ ...form, eventDate: e.target.value })
                                        }
                                        className={inputClass}
                                    />
                                </FormField>
                            </div>

                            <FormField label="Thumbnail URL">
                                <input
                                    required
                                    type="url"
                                    value={form.thumbnail}
                                    onChange={(e) =>
                                        setForm({ ...form, thumbnail: e.target.value })
                                    }
                                    className={inputClass}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </FormField>

                            <FormField label="Description">
                                <textarea
                                    required
                                    rows={4}
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({ ...form, description: e.target.value })
                                    }
                                    className={inputClass}
                                    placeholder="Describe your event..."
                                />
                            </FormField>

                            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 dark:border-gray-800 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving && (
                                        <LoaderCircle size={16} className="animate-spin" />
                                    )}
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            {deletingEvent && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:border dark:border-gray-700 dark:bg-gray-900">

                        {/* Icon */}
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                            <Trash2 className="h-8 w-8 text-red-600 dark:text-red-400" />
                        </div>

                        {/* Text */}
                        <div className="mt-5 text-center">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Delete Event?
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                Are you sure you want to delete{" "}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    "{deletingEvent.title}"
                                </span>
                                ? This action cannot be undone.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="mt-7 flex gap-3">

                            <button
                                type="button"
                                onClick={() => setDeletingEvent(null)}
                                disabled={deletingId === deletingEvent._id}
                                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={deletingId === deletingEvent._id}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {deletingId === deletingEvent._id ? (
                                    <>
                                        <LoaderCircle size={16} className="animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 size={16} />
                                        Yes, Delete
                                    </>
                                )}
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500";

function FormField({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {label}
            </label>
            {children}
        </div>
    );
}

function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function formatDate(dateString: string) {
    return new Date(`${dateString.slice(0, 10)}T00:00:00`).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
        }
    );
}