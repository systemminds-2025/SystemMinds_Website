
import React from 'react';
import logoImage from '../img/logo.png';
import socialIconsImage from '../img/social_icons.png';
import smartbotImage from '../img/PhotoshopExtension_Image.png';

const Footer = () => {
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
                            <img src={socialIconsImage} alt="Social Media Icons" className="h-12 object-contain" />
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
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="bg-gray-800/50 border border-gray-700 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors w-full"
                            />
                            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg text-sm transition-colors w-full">
                                Subscribe Now
                            </button>
                        </div>
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
                    <p className="text-gray-500 text-xs md:text-sm">© 2025 SystemMinds. All rights reserved.</p>
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
