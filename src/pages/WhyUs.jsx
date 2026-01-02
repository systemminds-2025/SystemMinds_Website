import React from 'react';

const WhyUs = () => {
    return (
        <div className="pt-20">
            {/* WHY CHOOSE US SECTION - Business Dashboard */}
            <section className="bg-white py-[100px] px-5 border-t border-[#e5e7eb] overflow-hidden">
                <div className="max-w-[1920px] mx-auto px-[6vw] grid grid-cols-1 lg:grid-cols-2 gap-[clamp(20px,5vw,60px)] items-center">
                    {/* Left Column - Text and CTA */}
                    <div className="col-span-1 lg:col-span-1 py-10 lg:pr-14">
                        <div className="mb-6">
                            <p className="text-xs font-semibold text-purple-light uppercase tracking-widest mb-2 font-montserrat">WHY CHOOSE US</p>
                            <h2 className="text-[clamp(28px,5vw,42px)] font-bold text-[#111827] leading-[1.2] mb-4 tracking-tight font-oswald">
                                We Drive Real Results That Accelerate Your <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-light after:to-purple-dark">Business Growth</span>
                            </h2>
                        </div>
                        <p className="text-[15px] leading-[1.6] text-[#6b7280] mb-8 font-montserrat">
                            We bring your dream project from scratch to live with robustness and success. As expert full-stack developers, we craft high-performance applications using optimized code and strictly follow Agile methodology. We handle the entire lifecycle, ensuring your vision is executed perfectly from concept to deployment.
                        </p>
                        <button className="bg-gradient-to-b from-gray-800 to-gray-900 text-white border-none py-3.5 pl-6 pr-5 rounded-full text-base font-semibold cursor-pointer shadow-lg flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl group font-montserrat">
                            Get Started
                            <span className="bg-white/20 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>
                    </div>

                    {/* Right Column - Image Grid */}
                    <div className="col-span-1 lg:col-span-1 relative">
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            {/* Placeholder for images - you can add actual images here */}
                            <div className="bg-gray-200 h-64 rounded-lg"></div>
                            <div className="bg-gray-200 h-64 rounded-lg mt-8"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyUs;
