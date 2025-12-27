import React from 'react';
import { motion } from 'framer-motion';

const Journey = () => {
    return (
        <div className="pt-20">
            {/* OUR STORY SECTION - Company Journey */}
            <section className="bg-white py-[100px] px-5 border-t border-[#e5e7eb] relative overflow-hidden">
                <div className="max-w-[1200px] mx-auto relative z-10">
                    <div className="text-center max-w-[800px] mx-auto mb-20">
                        <p className="text-xs font-semibold text-purple-light uppercase tracking-widest mb-2 font-montserrat">OUR STORY</p>
                        <h2 className="text-[clamp(28px,5vw,42px)] font-bold leading-[1.2] text-[#111827] mb-6 tracking-tight font-oswald">
                            From a startup vision to a trusted technology partner—<span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-light after:to-purple-dark">here's how SystemMindz came to be</span>
                        </h2>
                    </div>

                    {/* DESKTOP: Snake Infographic Roadmap */}
                    <div className="hidden md:block relative h-[600px] w-full max-w-[1100px] mx-auto mt-10">
                        {/* SVG Snake Path */}
                        <svg className="absolute top-0 left-0 w-full h-full p-10 overflow-visible" viewBox="0 0 1000 500" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#374151" />
                                    <stop offset="50%" stopColor="#1f2937" />
                                    <stop offset="100%" stopColor="#000000" />
                                </linearGradient>
                                <filter id="shadow">
                                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.1" />
                                </filter>
                            </defs>

                            <path d="M50,150 C300,150 300,400 550,400 C800,400 800,150 1050,150" fill="none" stroke="#e5e7eb" strokeWidth="102" strokeLinecap="round" />
                            <path d="M50,150 C300,150 300,400 550,400 C800,400 800,150 1050,150" fill="none" stroke="#ffffff" strokeWidth="90" strokeLinecap="round" />
                            <motion.path d="M50,150 C300,150 300,400 550,400 C800,400 800,150 1050,150" fill="none" stroke="url(#snakeGradient)" strokeWidth="70" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2.5, ease: "easeInOut" }} viewport={{ once: true }} filter="url(#shadow)" className="opacity-100" />
                            <path d="M50,150 C300,150 300,400 550,400 C800,400 800,150 1050,150" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="10,10" strokeLinecap="round" className="z-10" />
                        </svg>

                        {/* Node 1: 2024 */}
                        <div className="absolute top-[100px] left-[5%] w-[300px] z-20">
                            <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, type: "spring" }} viewport={{ once: true }} className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-white border-8 border-purple-200 flex items-center justify-center shadow-xl mb-6 relative z-20">
                                    <span className="text-2xl font-bold text-gray-800 font-oswald">2024</span>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center w-full relative z-10">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
                                    <h3 className="text-lg font-bold text-purple-600 mb-2 font-oswald uppercase">The Idea</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed font-montserrat">Bridging gaps with innovative digital visions.</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Node 2: 2025 */}
                        <div className="absolute top-[350px] left-1/2 -translate-x-1/2 w-[300px] z-20">
                            <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 1.5, type: "spring" }} viewport={{ once: true }} className="flex flex-col-reverse items-center">
                                <div className="w-24 h-24 rounded-full bg-white border-8 border-purple-400 flex items-center justify-center shadow-xl mt-6 relative z-20">
                                    <span className="text-2xl font-bold text-gray-800 font-oswald">2025</span>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center w-full relative z-10">
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100"></div>
                                    <h3 className="text-lg font-bold text-purple-600 mb-2 font-oswald uppercase">Launch</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed font-montserrat">Turning vision into reality with global clients.</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Node 3: 2026 */}
                        <div className="absolute top-[100px] right-[5%] w-[300px] z-20">
                            <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 2.5, type: "spring" }} viewport={{ once: true }} className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-white border-8 border-purple-600 flex items-center justify-center shadow-xl mb-6 relative z-20">
                                    <span className="text-2xl font-bold text-gray-800 font-oswald">2026</span>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center w-full relative z-10">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
                                    <h3 className="text-lg font-bold text-purple-600 mb-2 font-oswald uppercase">Growth</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed font-montserrat">Scaling up with a solid corporate foundation.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* MOBILE: Vertical Stack */}
                    <div className="md:hidden relative border-l-2 border-purple-light/20 ml-4 space-y-12 pl-8">
                        {[
                            { year: "2024", title: "The Idea", desc: "Bridging gaps with innovative digital visions." },
                            { year: "2025", title: "Launch", desc: "Turning vision into reality with global clients." },
                            { year: "2026", title: "Growth", desc: "Scaling up with a solid corporate foundation." }
                        ].map((item, index) => (
                            <div key={index} className="relative">
                                <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-white border-4 border-purple-light"></div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <span className="text-2xl font-bold text-gray-900 font-oswald block mb-1">{item.year}</span>
                                    <h3 className="text-lg font-bold text-purple-600 mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Journey;
