 
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import {
    CalendarDays,
    MapPin,
    Image as ImageIcon,
    Type,
    FileText,
    ArrowLeft,
    PlusCircle,
} from "lucide-react";

const eventTypes = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Blood Donation",
    "Community Service",
    "Education",
    "Food Distribution",
    "Other",
];

export default function CreateEventPage() {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        eventType: "",
        thumbnail: "",
        location: "",
        eventDate: "",
    });

    // Get today's date in local time
    const today = new Date();
    const minDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
    ].join("-");

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!session?.user) {
            toast.error("Please login before creating an event.");
            router.push("/signin");
            return;
        }

        if (!session.user.email) {
            toast.error("Unable to identify your account.");
            return;
        }

        // Validate event date
        if (formData.eventDate <= minDate) {
            toast.error("Please select a future event date.");
            return;
        }

        try {
            setLoading(true);

            const eventData = {
                ...formData,
                creatorEmail: session.user.email,
                creatorName: session.user.name,
            };

            const response = await fetch("http://localhost:8000/create-event",
                 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(eventData),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to create event.");
            }

            toast.success("Event created successfully!");

            setFormData({
                title: "",
                description: "",
                eventType: "",
                thumbnail: "",
                location: "",
                eventDate: "",
            });

            router.push("/upcoming-events");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-50 dark:bg-slate-800">
                <p className="text-green-700 dark:text-green-400 font-medium">
                    Loading...
                </p>
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 dark:bg-slate-800 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200">
                    Login Required
                </h2>
                <p className="text-gray-500 dark:text-slate-400 mt-2">
                    Please login to create an event.
                </p>
                <Link
                    href="/signin"
                    className="mt-5 rounded-lg bg-green-700 px-6 py-3 text-white font-semibold hover:bg-green-800"
                >
                    Go to Login
                </Link>
            </div>
        );
    }

   
    return (
        <div className="min-h-screen bg-[#f0f7f1] dark:bg-slate-950 py-10 px-4">

            <div className="max-w-3xl mx-auto">

                {/* Back Button */}
                <Link
                    href="/upcoming-events"
                    className="inline-flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-200 mb-6"
                >
                    <ArrowLeft size={18} />
                    Back to Upcoming Events
                </Link>

                {/* Heading */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                            <PlusCircle className="text-green-700 dark:text-green-400" size={27} />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-200">
                                Create an Event
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                                Bring your community together and make a difference.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-slate-900 border border-green-100 dark:border-green-900/60 rounded-2xl shadow-sm p-6 sm:p-8">

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Event Title */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                                <Type size={17} className="text-green-700 dark:text-green-400" />
                                Event Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Example: Winter Clothes Distribution"
                                required
                                maxLength={100}
                                className="w-full h-12 px-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/50 text-sm"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                                <FileText size={17} className="text-green-700 dark:text-green-400" />
                                Event Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your event, its purpose, and activities..."
                                required
                                rows={5}
                                maxLength={2000}
                                className="w-full p-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/50 text-sm resize-none"
                            />
                        </div>

                        {/* Event Type */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                                Event Type
                            </label>

                            <select
                                name="eventType"
                                value={formData.eventType}
                                onChange={handleChange}
                                required
                                className="w-full h-12 px-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/50 text-sm"
                            >
                                <option value="">
                                    Select event type
                                </option>

                                {eventTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Thumbnail URL */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                                <ImageIcon size={17} className="text-green-700 dark:text-green-400" />
                                Thumbnail Image URL
                            </label>

                            <input
                                type="url"
                                name="thumbnail"
                                value={formData.thumbnail}
                                onChange={handleChange}
                                placeholder="https://example.com/event-image.jpg"
                                required
                                className="w-full h-12 px-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/50 text-sm"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                                <MapPin size={17} className="text-green-700 dark:text-green-400" />
                                Event Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Example: Mirpur 10, Dhaka"
                                required
                                className="w-full h-12 px-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/50 text-sm"
                            />
                        </div>

                        {/* Event Date */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                                <CalendarDays size={17} className="text-green-700 dark:text-green-400" />
                                Event Date
                            </label>

                            <input
                                type="date"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                min={minDate}
                                required
                                className="w-full h-12 px-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/50 text-sm"
                            />

                            <p className="text-xs text-gray-400 dark:text-slate-400 mt-2">
                                Only future dates are allowed.
                            </p>
                        </div>

                        {/* Creator Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                                Created By
                            </label>

                            <input
                                type="email"
                                value={session.user.email}
                                readOnly
                                className="w-full h-12 px-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 text-sm cursor-not-allowed"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-semibold rounded-lg transition shadow-md shadow-green-700/10"
                        >
                            <PlusCircle size={19} />
                            {loading ? "Creating Event..." : "Create Event"}
                        </button>

                    </form>
                </div>

                <p className="text-center text-xs text-gray-400 dark:text-slate-400 mt-6">
                    Together, we can make our community a better place.
                </p>

            </div>
        </div>
    );
}
