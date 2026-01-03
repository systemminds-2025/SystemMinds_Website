import React from 'react';
import { motion } from 'framer-motion';
import profiletLogo from '../img/profilet_logo.png';

const ProjectsSection = () => {
    // Image arrays for each card
    const card1Images = [
        { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', label: 'Real-time messaging platform' },
        { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', label: 'Enterprise dashboard' },
        { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', label: 'Team collaboration tools' }
    ];

    const card2Images = [
        { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', label: 'AI chatbot interface' },
        { bg: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', label: 'Machine learning models' },
        { bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', label: 'Natural language processing' }
    ];

    const card3Images = [
        { bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', label: 'Video conferencing system' },
        { bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', label: 'Live streaming platform' },
        { bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', label: 'Collaboration workspace' }
    ];

    return (
        <section className="bg-[#f5f5f7] py-20 overflow-hidden">
            <div className="max-w-[1920px] mx-auto px-[6vw]">
                <div className="text-center mb-16 max-w-[800px] mx-auto">
                    <p className="text-sm font-semibold text-purple-light uppercase tracking-widest mb-6 font-montserrat">PROJECTS WE'VE DELIVERED</p>
                    <h1 className="text-[clamp(28px,5vw,42px)] font-bold text-[#111827] leading-[1.2] mb-5 tracking-tight font-oswald">
                        Transforming Businesses Through <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-light after:to-purple-dark">Innovative</span> Solutions
                    </h1>

                </div>

                <div className="grid grid-cols-12 gap-6 w-full mx-auto items-stretch">
                    {/* Card 01 - Enterprise Chat Solutions */}
                    <motion.div
                        className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-2xl p-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 w-full min-h-[300px] border border-transparent overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:border-purple-light/20"
                        initial={{ opacity: 0, x: -50, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        whileHover={{
                            y: -8,
                            transition: { duration: 0.3 }
                        }}
                    >
                        <h3 className="text-xl font-bold text-[#111827] mb-4 font-oswald tracking-tight leading-[1.3]">KareerGrowth</h3>
                        <div className="w-full h-auto mb-6 bg-[#f9fafb] rounded-xl overflow-hidden relative">
                            <motion.div
                                className="project-image-track flex"
                                animate={{
                                    x: ["0%", "-50%"]
                                }}
                                transition={{
                                    x: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 20,
                                        ease: "linear",
                                    },
                                }}
                            >
                                {[...card1Images, ...card1Images, ...card1Images, ...card1Images].map((img, idx) => (
                                    <div key={idx} className="w-[200px] p-2 shrink-0 flex flex-col items-center gap-2">
                                        <div className="w-full aspect-video rounded-lg shadow-md" style={{ background: img.bg }}></div>
                                        <p className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider text-center">{img.label}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-[#4b5563] leading-[1.6] m-0 font-montserrat">
                                A comprehensive career development platform that helps professionals grow their careers through personalized guidance, skill assessments, and career path recommendations.
                            </p>
                            <a href="https://systemmindz-rb.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-purple-light no-underline transition-all duration-200 font-montserrat hover:translate-x-1">View Project →</a>
                        </div>
                    </motion.div>

                    {/* Card 02 - AI-Powered Conversation Systems */}
                    <motion.div
                        className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-2xl p-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 w-full min-h-[300px] border border-transparent overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:border-purple-light/20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        whileHover={{
                            y: -8,
                            transition: { duration: 0.3 }
                        }}
                    >
                        <h3 className="text-xl font-bold text-[#111827] mb-4 font-oswald tracking-tight leading-[1.3]">ValidProfile</h3>
                        <div className="w-full h-auto mb-6 bg-[#f9fafb] rounded-xl overflow-hidden relative">
                            <motion.div
                                className="project-image-track flex"
                                animate={{
                                    x: ["0%", "-50%"]
                                }}
                                transition={{
                                    x: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 20,
                                        ease: "linear",
                                    },
                                }}
                            >
                                {[...card2Images, ...card2Images, ...card2Images, ...card2Images].map((img, idx) => (
                                    <div key={idx} className="w-[200px] p-2 shrink-0 flex flex-col items-center gap-2">
                                        <div className="w-full aspect-video rounded-lg shadow-md" style={{ background: img.bg }}></div>
                                        <p className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider text-center">{img.label}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-[#4b5563] leading-[1.6] m-0 font-montserrat">
                                An AI-powered profile validation system that verifies professional credentials, skills, and experience using advanced machine learning algorithms.
                            </p>
                            <a href="https://systemmindz-rb.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-purple-light no-underline transition-all duration-200 font-montserrat hover:translate-x-1">View Project →</a>
                        </div>
                    </motion.div>

                    {/* Card 03 - Real-Time Communication Platforms */}
                    <motion.div
                        className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-2xl p-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 w-full min-h-[300px] border border-transparent overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:border-purple-light/20"
                        initial={{ opacity: 0, x: 50, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                        whileHover={{
                            y: -8,
                            transition: { duration: 0.3 }
                        }}
                    >
                        <div className="flex items-center justify-start mb-4">
                            <img src={profiletLogo} alt="Profilet-Ai" className="h-10 w-auto object-contain" />
                        </div>
                        <div className="w-full h-auto mb-6 bg-[#f9fafb] rounded-xl overflow-hidden relative">
                            <motion.div
                                className="project-image-track flex"
                                animate={{
                                    x: ["0%", "-50%"]
                                }}
                                transition={{
                                    x: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 20,
                                        ease: "linear",
                                    },
                                }}
                            >
                                {[...card3Images, ...card3Images, ...card3Images, ...card3Images].map((img, idx) => (
                                    <div key={idx} className="w-[200px] p-2 shrink-0 flex flex-col items-center gap-2">
                                        <div className="w-full aspect-video rounded-lg shadow-md" style={{ background: img.bg }}></div>
                                        <p className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider text-center">{img.label}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-[#4b5563] leading-[1.6] m-0 font-montserrat">
                                An intelligent resume builder powered by AI that creates professional, ATS-friendly resumes tailored to job descriptions and industry standards.
                            </p>
                            <a href="https://systemmindz-rb.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-purple-light no-underline transition-all duration-200 font-montserrat hover:translate-x-1">View Project →</a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
