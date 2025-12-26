import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <section className="bg-[#e5e7eb] text-black min-h-screen flex flex-col relative overflow-hidden">
            {/* Main Content Area */}
            <div className="flex-1 px-8 md:px-16 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
                {/* Left Side - Heading and Description */}
                <div className="space-y-4">
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
                    <svg viewBox="0 0 600 480" className="w-full max-w-2xl">
                        <style>
                            {`
                                @keyframes pulse-node {
                                    0% { transform: scale(1); }
                                    50% { transform: scale(1.05); }
                                    100% { transform: scale(1); }
                                }
                                .flow-node {
                                    transform-box: fill-box;
                                    transform-origin: center;
                                    animation: pulse-node 3s infinite ease-in-out;
                                }
                            `}
                        </style>
                        {/* Connection Lines */}
                        {/* Connection Lines & Animated Arrows */}
                        {/* Define arrow marker for reuse if needed, but direct path is easier for animation control */}

                        {/* Row 1 Horizontal Connections */}
                        <path d="M 90 50 L 140 50" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 90 50 L 140 50" />
                        </path>

                        <path d="M 210 50 L 260 50" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 210 50 L 260 50" />
                        </path>

                        <path d="M 330 50 L 380 50" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 330 50 L 380 50" />
                        </path>

                        <path d="M 450 50 L 500 50" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 450 50 L 500 50" />
                        </path>

                        {/* Row 1 to 2 Vertical Connections */}
                        <path d="M 175 75 L 175 120" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 175 75 L 175 120" />
                        </path>

                        <path d="M 295 75 L 295 120" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 295 75 L 295 120" />
                        </path>

                        <path d="M 415 75 L 415 120" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 415 75 L 415 120" />
                        </path>

                        <path d="M 535 75 L 535 120" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 535 75 L 535 120" />
                        </path>

                        {/* Row 2 to 3 Vertical Connections */}
                        <path d="M 175 190 L 175 230" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 175 190 L 175 230" />
                        </path>

                        <path d="M 295 190 L 295 230" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 295 190 L 295 230" />
                        </path>

                        <path d="M 415 190 L 415 230" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 415 190 L 415 230" />
                        </path>

                        <path d="M 535 190 L 535 230" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 535 190 L 535 230" />
                        </path>

                        {/* Row 3 to 4 Vertical Connections */}
                        <path d="M 175 300 L 175 340" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 175 300 L 175 340" />
                        </path>

                        <path d="M 295 300 L 295 340" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 295 300 L 295 340" />
                        </path>

                        <path d="M 415 300 L 415 340" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 415 300 L 415 340" />
                        </path>

                        <path d="M 535 300 L 535 340" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 535 300 L 535 340" />
                        </path>

                        {/* Row 4 to 5 Vertical Connections */}
                        <path d="M 175 410 L 175 450" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 175 410 L 175 450" />
                        </path>

                        <path d="M 295 410 L 295 450" stroke="#666" strokeWidth="2" />
                        <path d="M -4,0 L -12,-4 L -12,4 Z" fill="#8B5CF6">
                            <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 295 410 L 295 450" />
                        </path>

                        {/* Row 1 - Planning */}
                        <g className="flow-node">
                            <rect x="30" y="30" width="80" height="40" rx="4" fill="#B3B3B3" />
                            <text x="70" y="55" fill="black" fontSize="8" textAnchor="middle" fontWeight="500">Requirements</text>
                        </g>

                        <g className="flow-node" style={{ animationDelay: '0.4s' }}>
                            <path d="M 175 30 L 210 50 L 175 70 L 140 50 Z" fill="#66D575" />
                            <text x="175" y="55" fill="black" fontSize="8" textAnchor="middle" fontWeight="600">Design</text>
                        </g>

                        <g className="flow-node" style={{ animationDelay: '0.8s' }}>
                            <path d="M 295 30 L 330 50 L 295 70 L 260 50 Z" fill="#874FFF" />
                            <text x="295" y="55" fill="white" fontSize="8" textAnchor="middle" fontWeight="500">UI/UX</text>
                        </g>

                        <g className="flow-node" style={{ animationDelay: '1.2s' }}>
                            <path d="M 415 30 L 450 50 L 415 70 L 380 50 Z" fill="#3DADFF" />
                            <text x="415" y="55" fill="white" fontSize="8" textAnchor="middle" fontWeight="500">Wireframe</text>
                        </g>

                        <g className="flow-node" style={{ animationDelay: '1.6s' }}>
                            <rect x="500" y="30" width="70" height="40" rx="4" fill="#CDF4D3" />
                            <text x="535" y="55" fill="black" fontSize="8" textAnchor="middle" fontWeight="500">Prototype</text>
                        </g>

                        {/* Row 2 - Development */}
                        <g className="flow-node" style={{ animationDelay: '2s' }}>
                            <rect x="120" y="120" width="110" height="70" rx="6" fill="#3a3f4a" />
                            <text x="175" y="145" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">API Development</text>
                            <text x="175" y="165" fill="#999" fontSize="7" textAnchor="middle">REST/GraphQL</text>
                            <text x="175" y="178" fill="#999" fontSize="7" textAnchor="middle">Spring Boot/Node.js</text>
                        </g>

                        <g className="flow-node" style={{ animationDelay: '2s' }}>
                            <rect x="240" y="120" width="110" height="70" rx="6" fill="#3a3f4a" />
                            <text x="295" y="145" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">Database</text>
                            <text x="295" y="165" fill="#999" fontSize="7" textAnchor="middle">PostgreSQL/MongoDB</text>
                            <text x="295" y="178" fill="#999" fontSize="7" textAnchor="middle">Schema design</text>
                        </g>

                        <g className="flow-node" style={{ animationDelay: '2s' }}>
                            <rect x="360" y="120" width="110" height="70" rx="6" fill="#3a3f4a" />
                            <text x="415" y="145" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">Frontend</text>
                            <text x="415" y="165" fill="#999" fontSize="7" textAnchor="middle">React.js/Next.js</text>
                            <text x="415" y="178" fill="#999" fontSize="7" textAnchor="middle">Responsive UI</text>
                        </g>

                        <g className="flow-node" style={{ animationDelay: '2s' }}>
                            <rect x="480" y="120" width="110" height="70" rx="6" fill="#3a3f4a" />
                            <text x="535" y="145" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">AI Integration</text>
                            <text x="535" y="165" fill="#999" fontSize="7" textAnchor="middle">OpenAI/Gemini</text>
                            <text x="535" y="178" fill="#999" fontSize="7" textAnchor="middle">API Keys</text>
                        </g>

                        {/* Row 3 - Containerization */}
                        <g className="flow-node" style={{ animationDelay: '2.5s' }}>
                            <path d="M 175 230 L 210 265 L 175 300 L 140 265 Z" fill="#FF7556" />
                            <text x="175" y="270" fill="white" fontSize="8" textAnchor="middle" fontWeight="500">Docker</text>
                        </g>

                        <g className="flow-node" style={{ animationDelay: '2.5s' }}>
                            <rect x="240" y="230" width="110" height="70" rx="6" fill="#3a3f4a" />
                            <text x="295" y="255" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">Kubernetes</text>
                            <text x="295" y="275" fill="#999" fontSize="7" textAnchor="middle">Orchestration</text>
                            <text x="295" y="288" fill="#999" fontSize="7" textAnchor="middle">Auto-scaling</text>
                        </g>

                        <g className="flow-node" style={{ animationDelay: '2.5s' }}>
                            <path d="M 415 230 L 450 265 L 415 300 L 380 265 Z" fill="#F2B2D7" />
                            <text x="415" y="270" fill="black" fontSize="8" textAnchor="middle" fontWeight="500">CI/CD</text>
                        </g>

                        <g className="flow-node" style={{ animationDelay: '2.5s' }}>
                            <rect x="480" y="230" width="110" height="70" rx="6" fill="#3a3f4a" />
                            <text x="535" y="255" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">Testing</text>
                            <text x="535" y="275" fill="#999" fontSize="7" textAnchor="middle">Unit & Integration</text>
                            <text x="535" y="288" fill="#999" fontSize="7" textAnchor="middle">E2E Testing</text>
                        </g>

                        {/* Row 4 - Cloud Deployment */}
                        <g className="flow-node" style={{ animationDelay: '3s' }}>
                            <rect x="120" y="340" width="110" height="70" rx="6" fill="#3a3f4a" />
                            <text x="175" y="365" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">GCP</text>
                            <text x="175" y="385" fill="#999" fontSize="7" textAnchor="middle">Google Cloud</text>
                            <text x="175" y="398" fill="#999" fontSize="7" textAnchor="middle">Platform</text>
                        </g>

                        <g className="flow-node" style={{ animationDelay: '3s' }}>
                            <rect x="240" y="340" width="110" height="70" rx="6" fill="#3a3f4a" />
                            <text x="295" y="365" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">AWS</text>
                            <text x="295" y="385" fill="#999" fontSize="7" textAnchor="middle">Amazon Web</text>
                            <text x="295" y="398" fill="#999" fontSize="7" textAnchor="middle">Services</text>
                        </g>

                        <g className="flow-node" style={{ animationDelay: '3s' }}>
                            <rect x="360" y="340" width="110" height="70" rx="6" fill="#3a3f4a" />
                            <text x="415" y="365" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">Azure</text>
                            <text x="415" y="385" fill="#999" fontSize="7" textAnchor="middle">Microsoft Cloud</text>
                            <text x="415" y="398" fill="#999" fontSize="7" textAnchor="middle">Platform</text>
                        </g>

                        <g className="flow-node" style={{ animationDelay: '3.2s' }}>
                            <path d="M 535 340 L 570 375 L 535 410 L 500 375 Z" fill="#FFBC01" />
                            <text x="535" y="380" fill="black" fontSize="8" textAnchor="middle" fontWeight="500">Deploy</text>
                        </g>

                        {/* Row 5 - Monitoring */}
                        <g className="flow-node" style={{ animationDelay: '3.5s' }}>
                            <rect x="120" y="450" width="110" height="30" rx="4" fill="#A0F7FF" />
                            <text x="175" y="470" fill="black" fontSize="8" textAnchor="middle" fontWeight="500">Monitoring</text>
                        </g>

                        <g className="flow-node" style={{ animationDelay: '3.5s' }}>
                            <rect x="240" y="450" width="110" height="30" rx="4" fill="#DCCCFF" />
                            <text x="295" y="470" fill="black" fontSize="8" textAnchor="middle" fontWeight="500">Live Production</text>
                        </g>
                    </svg>
                </motion.div>
            </div>

            {/* Bottom Service Cards */}
            <div className="px-8 md:px-16 pb-28 md:pb-12 -mt-20 md:-mt-0">
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
                            <h3 className="text-sm font-bold text-black">Feeling Stuck?</h3>
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
                            <h3 className="text-sm font-bold text-black">Don't Know How to Start?</h3>
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
                            <h3 className="text-sm font-bold text-black">Need Expert Help?</h3>
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
                            <h3 className="text-sm font-bold text-black">Get Your Product Live</h3>
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
