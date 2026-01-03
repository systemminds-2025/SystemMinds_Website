import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ConnectSection = () => {
    const [activeSocialIndex, setActiveSocialIndex] = useState(0);
    const [isHoveringSocial, setIsHoveringSocial] = useState(false);
    const [isMobileSocial, setIsMobileSocial] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        projectDetails: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(''); // 'success' or 'error'

    // Social Media Cards Data
    const socialCards = [
        {
            title: "SystemMindz",
            description: "Follow our LinkedIn Company Page for latest innovations and industry updates.",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
            link: "https://www.linkedin.com/company/systemminds",
            color: "#0077b5",
            buttonText: "Connect",
            gradient: "linear-gradient(145deg, #111827 0%, #1f2937 100%)"
        },
        {
            title: "SystemMindz",
            description: "Join our WhatsApp Community for latest news, updates and team engagement.",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            ),
            link: "https://chat.whatsapp.com/CJy8YPpWarEGzi9uAfbnoT",
            color: "#25d366",
            buttonText: "Join Chat",
            gradient: "linear-gradient(145deg, #111827 0%, #1f2937 100%)"
        },
        {
            title: "systemminds.tech",
            description: "Follow us on Instagram. We bring your vision to life with creativity and innovation.",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
            link: "https://www.instagram.com/systemminds.tech/",
            color: "#d62976",
            buttonText: "Follow",
            gradient: "linear-gradient(145deg, #111827 0%, #1f2937 100%)"
        },
        {
            title: "SystemMindz",
            description: "Join our Telegram Channel for instant updates and direct communication.",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
            ),
            link: "https://t.me/+g8kOiqBYvXE3NzJl",
            color: "#0088cc",
            buttonText: "Join Channel",
            gradient: "linear-gradient(145deg, #111827 0%, #1f2937 100%)"
        }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            // Prepare email content
            const emailBody = `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 8px;">
                        <p style="font-size: 16px; line-height: 1.6; color: #111827;">
                            <strong>Full Name:</strong><br/>
                            ${formData.fullName}
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #111827;">
                            <strong>Email:</strong><br/>
                            ${formData.email}
                        </p>
                        ${formData.phone ? `
                        <p style="font-size: 16px; line-height: 1.6; color: #111827;">
                            <strong>Phone:</strong><br/>
                            ${formData.phone}
                        </p>
                        ` : ''}
                        <p style="font-size: 16px; line-height: 1.6; color: #111827;">
                            <strong>Project Details:</strong><br/>
                            ${formData.projectDetails.replace(/\n/g, '<br/>')}
                        </p>
                    </div>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px; font-size: 14px; color: #6b7280;">
                        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
                        <p><strong>Source:</strong> Contact Us Form - SystemMindz Website</p>
                    </div>
                </div>
            `;

            // Send email via API
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: `New Contact Form Submission from ${formData.fullName}`,
                    body: emailBody,
                    replyTo: formData.email,
                    fromName: formData.fullName,
                    fromEmail: formData.email,
                    to: 'info.systemminds@gmail.com'
                })
            });

            const result = await response.json();

            if (result.ok) {
                // Show success message
                setSubmitStatus('success');

                // Reset form
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    projectDetails: ''
                });

                // Reset success message after 5 seconds
                setTimeout(() => setSubmitStatus(''), 5000);
            } else {
                throw new Error(result.error || 'Failed to send email');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');

            // Reset error message after 5 seconds
            setTimeout(() => setSubmitStatus(''), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const checkMobileSocial = () => {
            setIsMobileSocial(window.innerWidth < 768);
        };
        checkMobileSocial();
        window.addEventListener('resize', checkMobileSocial);
        return () => window.removeEventListener('resize', checkMobileSocial);
    }, []);

    // Auto-swap functionality for Social Cards
    useEffect(() => {
        if (isHoveringSocial) return;
        const interval = setInterval(() => {
            setActiveSocialIndex((prev) => (prev + 1) % socialCards.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [isHoveringSocial, socialCards.length]);

    const getSocialPosition = (index) => {
        let position = index - activeSocialIndex;
        const halfLength = Math.floor(socialCards.length / 2);
        if (position > halfLength) position -= socialCards.length;
        if (position < -halfLength) position += socialCards.length;
        return position;
    };

    return (
        <section
            className="relative py-24 md:py-32 bg-white overflow-hidden flex flex-col items-center justify-center min-h-screen"
            id="contact"
        >
            <div className="max-w-[1920px] mx-auto px-[6vw] relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column - Text and Form */}
                    <div className="text-left z-20">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xs sm:text-sm font-semibold text-purple-light uppercase tracking-widest mb-4 md:mb-6 font-montserrat block"
                        >
                            CONNECT WITH US
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-[clamp(28px,5vw,42px)] font-bold text-[#111827] leading-[1.2] mb-6 md:mb-8 font-oswald"
                        >
                            Stay connected across every place your audience exists.
                        </motion.h2>

                        {/* Contact Form */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            {/* Full Name and Work Email in Same Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="fullName" className="block text-xs font-semibold text-gray-600 mb-1.5 font-montserrat">
                                        Full name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="How should we address you?"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-purple-light focus:ring-2 focus:ring-purple-light/20 outline-none transition-all duration-200 text-sm font-montserrat"
                                        required
                                    />
                                </div>

                                {/* Work Email */}
                                <div>
                                    <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1.5 font-montserrat">
                                        Work email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@company.com"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-purple-light focus:ring-2 focus:ring-purple-light/20 outline-none transition-all duration-200 text-sm font-montserrat"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone (Optional) */}
                            <div>
                                <label htmlFor="phone" className="block text-xs font-semibold text-gray-600 mb-1.5 font-montserrat">
                                    Phone (optional)
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 98765 43210"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-purple-light focus:ring-2 focus:ring-purple-light/20 outline-none transition-all duration-200 text-sm font-montserrat"
                                />
                            </div>

                            {/* Project Details */}
                            <div>
                                <label htmlFor="projectDetails" className="block text-xs font-semibold text-gray-600 mb-1.5 font-montserrat">
                                    Project details
                                </label>
                                <textarea
                                    id="projectDetails"
                                    name="projectDetails"
                                    value={formData.projectDetails}
                                    onChange={handleChange}
                                    placeholder="Share goals, timelines, or links. The more detail, the better we can prepare."
                                    rows="4"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-purple-light focus:ring-2 focus:ring-purple-light/20 outline-none transition-all duration-200 text-sm font-montserrat resize-none"
                                    required
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 font-montserrat text-sm flex items-center justify-center gap-2 ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-black text-white hover:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    'Request consultation'
                                )}
                            </button>

                            {/* Success/Error Message */}
                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-green-50 border border-green-200 rounded-lg"
                                >
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h4 className="text-sm font-semibold text-green-800 font-montserrat">Thank you for reaching out!</h4>
                                            <p className="text-xs text-green-700 mt-1 font-montserrat">We've received your message and will get back to you soon.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-50 border border-red-200 rounded-lg"
                                >
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h4 className="text-sm font-semibold text-red-800 font-montserrat">Oops! Something went wrong</h4>
                                            <p className="text-xs text-red-700 mt-1 font-montserrat">Please try again or contact us directly.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.form>
                    </div>

                    {/* Right Column - Social Cards Fan Area */}
                    <div className="relative flex flex-col items-center justify-center">
                        <div
                            className="relative w-full h-[360px] md:h-[450px] flex justify-center items-start perspective-1000"
                            onMouseEnter={() => setIsHoveringSocial(true)}
                            onMouseLeave={() => setIsHoveringSocial(false)}
                        >
                            {socialCards.map((card, index) => {
                                const position = getSocialPosition(index);
                                const isActive = index === activeSocialIndex;

                                // Fan layout calculations
                                const spread = isMobileSocial ? 35 : 180;
                                const spreadY = isMobileSocial ? 25 : 50;
                                const yOffset = Math.abs(position) * spreadY;
                                const xOffset = position * spread;
                                const scale = 1 - Math.abs(position) * 0.15;
                                const zIndex = 50 - Math.abs(position);
                                const rotate = position * (isMobileSocial ? 5 : 10);
                                const isVisible = Math.abs(position) <= 1;
                                const opacity = isVisible ? 1 : 0;
                                const brightness = isActive ? 100 : 95;

                                return (
                                    <motion.div
                                        key={index}
                                        animate={{
                                            x: xOffset,
                                            y: yOffset,
                                            scale,
                                            zIndex,
                                            rotate,
                                            opacity,
                                            filter: `brightness(${brightness}%)`,
                                            boxShadow: isActive ? "0 20px 40px rgba(0,0,0,0.1)" : "none",
                                            borderColor: isActive ? "#e5e7eb" : "transparent"
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute top-0 w-full max-w-[240px] md:max-w-[280px] h-[320px] md:h-[400px] rounded-3xl overflow-hidden origin-bottom bg-white border"
                                        style={{
                                            left: isMobileSocial ? 'calc(50% - 120px)' : 'calc(50% - 140px)',
                                        }}
                                    >
                                        {/* Content Container */}
                                        <div className={`absolute inset-0 z-30 p-5 md:p-6 flex flex-col justify-end transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'}`}>
                                            {/* Icon */}
                                            <div className="w-12 h-12 md:w-14 md:h-14 mb-3 md:mb-4" style={{ color: card.color }}>
                                                {card.icon}
                                            </div>

                                            {/* Title and Description */}
                                            <div>
                                                <h3 className="text-[#111827] font-display font-bold text-xl md:text-2xl leading-tight mb-2">
                                                    {card.title}
                                                </h3>
                                                <p className="text-[#6b7280] text-[10px] md:text-xs leading-relaxed line-clamp-3 font-montserrat font-medium">
                                                    {card.description}
                                                </p>
                                            </div>

                                            {/* Action Button */}
                                            <a
                                                href={card.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-4 inline-flex items-center gap-2 text-white font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 shadow-md"
                                                style={{ backgroundColor: card.color }}
                                            >
                                                {card.buttonText}
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </a>

                                            {/* Decorative Element */}
                                            <div className="w-1/3 h-1 mt-3 md:mt-4 rounded-full opacity-20" style={{ backgroundColor: card.color }} />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Progress Indicators */}
                        <div className="flex gap-3 mt-4 md:mt-6 z-20">
                            {socialCards.map((_, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveSocialIndex(idx)}
                                    className={`rounded-full cursor-pointer transition-all duration-500 ${idx === activeSocialIndex ? 'bg-purple-light w-3 h-3 scale-125' : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConnectSection;
