import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <section className="bg-black text-white min-h-screen flex flex-col relative overflow-hidden">
            {/* Main Content Area */}
            <div className="flex-1 px-8 md:px-16 pt-28 md:pt-32 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative">
                {/* Left Side - Heading and Description */}
                <div className="space-y-8">
                    <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest">TRANSFORM YOUR IDEAS INTO REALITY</p>
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Professional Services & Innovative Products
                    </motion.h1>


                    {/* Description Blocks */}
                    <motion.div
                        className="space-y-4 text-xs md:text-sm text-gray-400 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <div>
                            <p>SystemMinds is a full-stack digital studio delivering robust products, future-ready platforms, and tailor-made enterprise solutions. We blend strategy, UI engineering, and cloud-native development to accelerate growth for ambitious brands. Our comprehensive approach ensures seamless integration of cutting-edge technologies with business objectives.</p>
                        </div>
                        <div>
                            <p>With expertise spanning React.js, Spring Boot, Python, and modern cloud technologies, we transform complex business challenges into elegant, scalable digital solutions. Our team combines technical excellence with creative problem-solving to deliver products that not only meet today's needs but are built to evolve with your business. From initial consultation to post-launch support, we provide end-to-end services that drive measurable results and sustainable growth.</p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side - Flowchart Diagram */}
                <motion.div
                    className="hidden lg:flex items-center justify-center relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <svg viewBox="0 0 600 450" className="w-full max-w-2xl">
                        {/* Connection Lines */}
                        <path d="M 90 60 L 140 60" stroke="#666" strokeWidth="2" />
                        <path d="M 210 60 L 260 60" stroke="#666" strokeWidth="2" />
                        <path d="M 330 60 L 380 60" stroke="#666" strokeWidth="2" />
                        <path d="M 450 60 L 500 60" stroke="#666" strokeWidth="2" />

                        <path d="M 175 85 L 175 130" stroke="#666" strokeWidth="2" />
                        <path d="M 295 85 L 295 130" stroke="#666" strokeWidth="2" />
                        <path d="M 415 85 L 415 130" stroke="#666" strokeWidth="2" />

                        <path d="M 175 200 L 175 240" stroke="#666" strokeWidth="2" />
                        <path d="M 295 200 L 295 240" stroke="#666" strokeWidth="2" />
                        <path d="M 415 200 L 415 240" stroke="#666" strokeWidth="2" />

                        <path d="M 175 310 L 175 350" stroke="#666" strokeWidth="2" />
                        <path d="M 295 310 L 295 350" stroke="#666" strokeWidth="2" />
                        <path d="M 415 310 L 415 350" stroke="#666" strokeWidth="2" />

                        <path d="M 480 370 L 530 370" stroke="#666" strokeWidth="2" />

                        {/* Row 1 - Top */}
                        <rect x="30" y="40" width="60" height="40" rx="4" fill="#B3B3B3" />
                        <text x="60" y="65" fill="black" fontSize="9" textAnchor="middle" fontWeight="500">Market Feed</text>

                        {/* Diamond shape for Research */}
                        <path d="M 175 40 L 210 60 L 175 80 L 140 60 Z" fill="#66D575" />
                        <text x="175" y="65" fill="black" fontSize="9" textAnchor="middle" fontWeight="600">Research</text>

                        {/* Diamond shape for Ideate */}
                        <path d="M 295 40 L 330 60 L 295 80 L 260 60 Z" fill="#874FFF" />
                        <text x="295" y="65" fill="white" fontSize="9" textAnchor="middle" fontWeight="500">Ideate</text>

                        {/* Diamond shape */}
                        <path d="M 415 40 L 450 60 L 415 80 L 380 60 Z" fill="#3DADFF" />
                        <text x="415" y="65" fill="white" fontSize="8" textAnchor="middle" fontWeight="500">Post Model</text>

                        {/* Diamond shape */}
                        <path d="M 535 35 L 575 60 L 535 85 L 495 60 Z" fill="#CDF4D3" />
                        <text x="535" y="65" fill="black" fontSize="8" textAnchor="middle" fontWeight="500">Interaction E...</text>

                        {/* Row 2 */}
                        <rect x="120" y="130" width="110" height="70" rx="6" fill="#3a3f4a" />
                        <text x="175" y="155" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">Data Analysis</text>
                        <text x="175" y="175" fill="#999" fontSize="8" textAnchor="middle">Customer insights</text>
                        <text x="175" y="188" fill="#999" fontSize="7" textAnchor="middle">and behavior patterns</text>

                        {/* Diamond */}
                        <path d="M 295 130 L 330 165 L 295 200 L 260 165 Z" fill="#FF7556" />
                        <text x="295" y="170" fill="white" fontSize="9" textAnchor="middle" fontWeight="500">Design</text>

                        {/* Diamond */}
                        <path d="M 415 130 L 450 165 L 415 200 L 380 165 Z" fill="#F2B2D7" />
                        <text x="415" y="170" fill="black" fontSize="8" textAnchor="middle" fontWeight="500">Develop</text>

                        {/* Row 3 */}
                        <rect x="120" y="240" width="110" height="70" rx="6" fill="#3a3f4a" />
                        <text x="175" y="265" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">App UI</text>
                        <text x="175" y="285" fill="#999" fontSize="8" textAnchor="middle">User experience</text>
                        <text x="175" y="298" fill="#999" fontSize="7" textAnchor="middle">design and testing</text>

                        <rect x="240" y="240" width="110" height="70" rx="6" fill="#3a3f4a" />
                        <text x="295" y="265" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">Development</text>
                        <text x="295" y="285" fill="#999" fontSize="8" textAnchor="middle">Build and deploy</text>
                        <text x="295" y="298" fill="#999" fontSize="7" textAnchor="middle">production ready</text>

                        <rect x="360" y="240" width="110" height="70" rx="6" fill="#3a3f4a" />
                        <text x="415" y="265" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">Testing</text>
                        <text x="415" y="285" fill="#999" fontSize="8" textAnchor="middle">Quality assurance</text>
                        <text x="415" y="298" fill="#999" fontSize="7" textAnchor="middle">and validation</text>

                        {/* Row 4 - Bottom */}
                        {/* Diamond */}
                        <path d="M 175 350 L 210 380 L 175 410 L 140 380 Z" fill="#FFBC01" />
                        <text x="175" y="385" fill="black" fontSize="9" textAnchor="middle" fontWeight="500">Deploy</text>

                        <rect x="240" y="350" width="110" height="70" rx="6" fill="#3a3f4a" />
                        <text x="295" y="375" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">Monitoring</text>
                        <text x="295" y="395" fill="#999" fontSize="8" textAnchor="middle">Performance tracking</text>
                        <text x="295" y="408" fill="#999" fontSize="7" textAnchor="middle">and analytics</text>

                        <rect x="360" y="350" width="110" height="70" rx="6" fill="#3a3f4a" />
                        <text x="415" y="375" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">Optimization</text>
                        <text x="415" y="395" fill="#999" fontSize="8" textAnchor="middle">Continuous</text>
                        <text x="415" y="408" fill="#999" fontSize="7" textAnchor="middle">improvement</text>

                        <rect x="480" y="350" width="50" height="40" rx="4" fill="#A0F7FF" />
                        <text x="505" y="375" fill="black" fontSize="9" textAnchor="middle" fontWeight="500">Exit</text>
                    </svg>
                </motion.div>
            </div>

            {/* Bottom Service Cards */}
            <div className="px-8 md:px-16 pb-12 md:pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1 - Social Media Marketing */}
                    <motion.div
                        className="bg-[#F2B2D7] rounded-xl p-3 flex items-center justify-between group cursor-pointer hover:scale-105 transition-transform duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                                    <path d="M17 2H7C4.79086 2 3 3.79086 3 6V18C3 20.2091 4.79086 22 7 22H17C19.2091 22 21 20.2091 21 18V6C21 3.79086 19.2091 2 17 2Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-bold text-black">Social Media Marketing</h3>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-[#F2B2D7] transition-colors flex-shrink-0">
                            <span className="text-xs">→</span>
                        </div>
                    </motion.div>

                    {/* Card 2 - Data and Analytics */}
                    <motion.div
                        className="bg-[#CDF4D3] rounded-xl p-3 flex items-center justify-between group cursor-pointer hover:scale-105 transition-transform duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                                    <path d="M3 3V21H21" />
                                    <path d="M7 16L12 11L16 15L21 10" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-bold text-black">Data and Analytics</h3>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-[#CDF4D3] transition-colors flex-shrink-0">
                            <span className="text-xs">→</span>
                        </div>
                    </motion.div>

                    {/* Card 3 - Marketing Strategy */}
                    <motion.div
                        className="bg-[#FFBC01] rounded-xl p-3 flex items-center justify-between group cursor-pointer hover:scale-105 transition-transform duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-bold text-black">Marketing Strategy</h3>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-[#FFBC01] transition-colors flex-shrink-0">
                            <span className="text-xs">→</span>
                        </div>
                    </motion.div>

                    {/* Card 4 - Search Engine Optimization */}
                    <motion.div
                        className="bg-[#B3B3B3] rounded-xl p-3 flex items-center justify-between group cursor-pointer hover:scale-105 transition-transform duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21L16.65 16.65" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-bold text-black">Search Engine Optimization</h3>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-[#B3B3B3] transition-colors flex-shrink-0">
                            <span className="text-xs">→</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
