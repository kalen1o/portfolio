"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const ContactPage = () => {
    const [success, setSuccess] = useState(false);
    const text = "Say Hello";

    const buildMailtoHref = (message, email) => {
        const subject = encodeURIComponent("Portfolio Contact");
        const body = encodeURIComponent(`${message}\n\nFrom: ${email}`);
        return `mailto:trantienquang101198@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <motion.div
            className="h-full"
            initial={{ y: "-200vh" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1 }}
        >
            <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
                {/* TEXT CONTAINER */}
                <div className="h-1/2 lg:h-full lg:w-1/2 flex items-center justify-center text-6xl">
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
                        😊
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
                    className="h-1/2 lg:h-full lg:w-1/2 bg-red-50 rounded-xl text-xl flex flex-col gap-8 justify-center p-24"
                >
                    <span>Dear kalen_1o,</span>
                    <textarea
                        rows={6}
                        className="bg-transparent border-b-2 border-b-black outline-none resize-none"
                        name="user_message"
                    />
                    <span>My mail address is:</span>
                    <input
                        name="user_email"
                        type="text"
                        className="bg-transparent border-b-2 border-b-black outline-none"
                    />
                    <span>Regards</span>
                    <button className="bg-purple-200 rounded font-semibold text-gray-600 p-4">
                        Send
                    </button>
                    {success && (
                        <span className="text-green-600 font-semibold">
                            Your email client should open with a draft now.
                        </span>
                    )}
                </form>
            </div>
        </motion.div>
    );
};

export default ContactPage;
