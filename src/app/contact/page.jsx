"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const ContactPage = () => {
    const [success, setSuccess] = useState(false);
    const text = "Say Hello";

    const buildMailtoHref = (message, email) => {
        const subject = encodeURIComponent("Portfolio Contact");
        const body = encodeURIComponent(`${message}\n\nFrom: ${email}`);
        return `mailto:${profile.contact.email}?subject=${subject}&body=${body}`;
    };

    // Auto-clear success after 5s
    useEffect(() => {
        if (!success) return;
        const t = setTimeout(() => setSuccess(false), 5000);
        return () => clearTimeout(t);
    }, [success]);

    const dismissSuccess = () => {
        if (success) setSuccess(false);
    };

    const inputClass =
        "bg-white rounded border-2 border-black p-3 outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 text-base";

    return (
        <motion.div
            className="h-full"
            initial={{ y: "-200vh" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1 }}
        >
            <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
                {/* TEXT CONTAINER */}
                <div className="h-1/2 lg:h-full lg:w-1/2 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl">
                    <div>
                        {text.split("").map((letter, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0 }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: index * 0.1,
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>
                </div>
                {/* FORM CONTAINER */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const message = String(formData.get("user_message") || "");
                        const email = String(formData.get("user_email") || "");
                        const href = buildMailtoHref(message, email);
                        window.location.href = href;
                        setSuccess(true);
                        e.currentTarget.reset();
                    }}
                    className="h-1/2 lg:h-full lg:w-1/2 bg-red-50 rounded-xl text-base md:text-lg flex flex-col gap-5 justify-center p-6 sm:p-8 md:p-12 lg:p-16"
                >
                    <p className="font-semibold text-lg md:text-xl">Dear Visitor,</p>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="user_message" className="text-sm font-medium text-gray-700">
                            Your message <span className="text-red-500" aria-hidden="true">*</span>
                            <span className="sr-only">(required)</span>
                        </label>
                        <textarea
                            id="user_message"
                            name="user_message"
                            rows={6}
                            required
                            placeholder="Hi Quang, I'd like to talk about..."
                            onChange={dismissSuccess}
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="user_email" className="text-sm font-medium text-gray-700">
                            Your email <span className="text-red-500" aria-hidden="true">*</span>
                            <span className="sr-only">(required)</span>
                        </label>
                        <input
                            id="user_email"
                            name="user_email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="you@example.com"
                            onChange={dismissSuccess}
                            className={inputClass}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-purple-200 rounded font-semibold text-gray-900 p-4 hover:bg-purple-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                    >
                        Send
                    </button>

                    <div role="status" aria-live="polite" className="min-h-[1.5rem]">
                        {success && (
                            <span className="text-green-700 font-semibold">
                                Your email client should open with a draft now.
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default ContactPage;
