import React from 'react';
import { motion } from 'framer-motion';

import heroImage from '../img/HERO.gif';

const HeroSection = () => {
    return (
        <section className="bg-[#fbfbfb] text-black min-h-screen flex flex-col relative overflow-hidden">
            {/* Main Content Area */}
            <div className="flex-1 px-8 md:px-16 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
                {/* Left Side - Heading, Description, and Service Cards */}
                <div className="space-y-8">
                    <div>
                        <p className="text-sm font-semibold text-purple-light uppercase tracking-widest mb-6 font-montserrat">TRANSFORM YOUR IDEAS INTO REALITY</p>
                        <motion.h1
                            className="text-[clamp(28px,5vw,42px)] font-bold leading-[1.2] tracking-tight font-oswald lg:mb-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            Professional Services & <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-light after:to-purple-dark">Innovative Products</span>
                        </motion.h1>
                        <br />
                        {/* Description Blocks */}
                        <motion.div
                            className="space-y-4 text-xs md:text-sm text-gray-400 leading-relaxed lg:mt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <div>
                                <p>SystemMindz is a full-stack digital studio delivering robust products, future-ready platforms, and tailor-made enterprise solutions. We blend strategy, UI engineering, and cloud-native development to accelerate growth for ambitious brands. Our comprehensive approach ensures seamless integration of cutting-edge technologies with business objectives.</p>
                            </div>
                            <div>
                                <p>With expertise spanning React.js, Spring Boot, Python, and modern cloud technologies, we transform complex business challenges into elegant, scalable digital solutions. Our team combines technical excellence with creative problem-solving to deliver products that not only meet today's needs but are built to evolve with your business. From initial consultation to post-launch support, we provide end-to-end services that drive measurable results and sustainable growth.</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Mobile Only - Hero Image (Visible on small screens, hidden on lg screens) */}
                    <div className="lg:hidden w-full h-[300px] relative my-6">
                        <img
                            src={heroImage}
                            alt="Hero"
                            className="w-full h-full object-cover rounded-3xl"
                        />
                    </div>

                    {/* Integrated Service Cards (Moved from bottom) */}
                    <div className="grid grid-cols-4 lg:grid-cols-[0.8fr_1.4fr_1fr_1fr] gap-2 pt-4">
                        {/* Card 1 - Social Media Marketing */}
                        <motion.div
                            className="bg-[#F2B2D7] rounded-full px-1 py-1 md:px-4 md:py-3 flex items-center justify-center group cursor-pointer hover:scale-105 transition-transform duration-300 w-full h-full"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <h3 className="text-[9px] leading-tight md:text-xs font-bold text-black md:whitespace-nowrap text-center">Feeling Stuck?</h3>
                        </motion.div>

                        {/* Card 2 - Data and Analytics */}
                        <motion.div
                            className="bg-[#CDF4D3] rounded-full px-1 py-1 md:px-4 md:py-3 flex items-center justify-center group cursor-pointer hover:scale-105 transition-transform duration-300 w-full h-full"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                        >
                            <h3 className="text-[9px] leading-tight md:text-xs font-bold text-black md:whitespace-nowrap text-center">Don't Know How to Start?</h3>
                        </motion.div>

                        {/* Card 3 - Marketing Strategy */}
                        <motion.div
                            className="bg-[#FFBC01] rounded-full px-1 py-1 md:px-4 md:py-3 flex items-center justify-center group cursor-pointer hover:scale-105 transition-transform duration-300 w-full h-full"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <h3 className="text-[9px] leading-tight md:text-xs font-bold text-black md:whitespace-nowrap text-center">Need Expert Help?</h3>
                        </motion.div>

                        {/* Card 4 - Search Engine Optimization */}
                        <motion.div
                            className="bg-[#B3B3B3] rounded-full px-1 py-1 md:px-4 md:py-3 flex items-center justify-center group cursor-pointer hover:scale-105 transition-transform duration-300 w-full h-full"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                        >
                            <h3 className="text-[9px] leading-tight md:text-xs font-bold text-black md:whitespace-nowrap text-center">Get Your Product Live</h3>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side - Image */}
                <motion.div
                    className="hidden lg:flex items-center justify-center relative w-full h-[600px]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <img
                        src={heroImage}
                        alt="Hero"
                        className="w-full h-full object-cover rounded-3xl"
                    />
                </motion.div>
            </div>
            {/* Removed Bottom Service Cards Section */}
        </section>
    );
};

export default HeroSection;
