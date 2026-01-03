
import React, { useState } from 'react';
import logoImage from '../img/profilet_logo.png';
// import socialIconsImage from '../img/social_icons.png'; // File missing
import smartbotImage from '../img/profilet_logo.png';

const Footer = () => {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterStatus, setNewsletterStatus] = useState(''); // 'success' or 'error'
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();

        if (!newsletterEmail || !newsletterEmail.includes('@')) {
            setNewsletterStatus('error');
            return;
        }

        setIsSubscribing(true);
        setNewsletterStatus('');

        try {
            // Prepare email content
            const emailBody = `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
                        New Newsletter Subscription
                    </h2>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 8px;">
                        <p style="font-size: 16px; line-height: 1.6; color: #111827;">
                            <strong>Subscriber Email:</strong><br/>
                            ${newsletterEmail}
                        </p>
                    </div>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px; font-size: 14px; color: #6b7280;">
                        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
                        <p><strong>Source:</strong> Newsletter Subscription - SystemMindz Website Footer</p>
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
                    subject: 'New Newsletter Subscription',
                    body: emailBody,
                    replyTo: newsletterEmail,
                    fromEmail: newsletterEmail,
                    to: 'info.systemminds@gmail.com'
                })
            });

            const result = await response.json();

            if (result.ok) {
                setNewsletterStatus('success');
                setNewsletterEmail('');

                // Reset status after 3 seconds
                setTimeout(() => setNewsletterStatus(''), 3000);
            } else {
                throw new Error(result.error || 'Failed to subscribe');
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            setNewsletterStatus('error');

            // Reset error status after 3 seconds
            setTimeout(() => setNewsletterStatus(''), 3000);
        } finally {
            setIsSubscribing(false);
        }
    };

    return (
        <footer className="bg-[#111827] pt-[80px] pb-10 text-white overflow-hidden relative font-montserrat">
            <div className="max-w-[1200px] mx-auto px-6 relative z-10">

                {/* Main Footer Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">

                    {/* Col 1: Brand & About (Full width on mobile) */}
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
                        <div>
                            <h4 className="text-lg font-bold font-oswald text-white mb-6 uppercase tracking-wide">SystemMindz</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Empowering businesses with cutting-edge AI, Cloud, and Digital solutions. Your partner in digital transformation.
                            </p>
                        </div>
                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {/* social Icons image was missing */}
                        </div>
                    </div>

                    {/* Col 2: Quick Links (Left on Mobile) */}
                    <div className="col-span-1">
                        <h4 className="text-lg font-bold font-oswald text-white mb-6 uppercase tracking-wide">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'About Us', 'Services', 'Our Work', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-purple-400 transition-colors"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Services (Right on Mobile) */}
                    <div className="col-span-1">
                        <h4 className="text-lg font-bold font-oswald text-white mb-6 uppercase tracking-wide">Our Services</h4>
                        <ul className="space-y-3">
                            {['Web Development', 'Cloud Solutions', 'AI Integration', 'Mobile Apps', 'Data Analytics'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-purple-400 transition-colors"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4: Newsletter (Full width on mobile) */}
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-lg font-bold font-oswald text-white mb-6 uppercase tracking-wide">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to get the latest news and updates.</p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                className="bg-gray-800/50 border border-gray-700 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors w-full"
                                required
                            />
                            <button
                                type="submit"
                                disabled={isSubscribing}
                                className={`font-semibold py-3 px-4 rounded-lg text-sm transition-colors w-full flex items-center justify-center gap-2 ${isSubscribing
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : newsletterStatus === 'success'
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : newsletterStatus === 'error'
                                            ? 'bg-red-600 hover:bg-red-700'
                                            : 'bg-purple-600 hover:bg-purple-700'
                                    } text-white`}
                            >
                                {isSubscribing ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Subscribing...
                                    </>
                                ) : newsletterStatus === 'success' ? (
                                    '✓ Subscribed!'
                                ) : newsletterStatus === 'error' ? (
                                    'Invalid Email'
                                ) : (
                                    'Subscribe Now'
                                )}
                            </button>
                        </form>
                    </div>

                </div>

                {/* Large Stylized Text with Bot */}
                <div className="relative py-10 border-t border-gray-800/50">
                    <h1 className="text-[clamp(50px,13vw,160px)] font-bold font-oswald leading-none tracking-tighter text-white/5 select-none flex flex-wrap items-center justify-center pointer-events-none">
                        SYSTEM
                        <span className="relative w-[60px] md:w-[120px] h-[60px] md:h-[120px] mx-2 -mt-4 md:-mt-8">
                            <img src={smartbotImage} alt="SmartBot" className="w-full h-full object-contain animate-float drop-shadow-2xl opacity-80" />
                        </span>
                        MINDS
                    </h1>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-800">
                    <p className="text-gray-500 text-xs md:text-sm">© 2025 SystemMindz. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-white text-xs md:text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-white text-xs md:text-sm transition-colors">Terms of Service</a>
                        <a href="#" className="text-gray-500 hover:text-white text-xs md:text-sm transition-colors">Cookies</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
