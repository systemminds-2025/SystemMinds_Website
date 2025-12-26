import React from 'react';

const Features = () => {
    return (
        <div className="pt-20">
            {/* AUTOMATION FEATURES SECTION */}
            <section className="bg-white py-[100px] px-5 border-t border-[#e5e7eb]">
                <div className="max-w-[1920px] mx-auto px-[6vw]">
                    <div className="text-center max-w-[800px] mx-auto mb-16">
                        <p className="text-xs font-semibold text-purple-light uppercase tracking-widest mb-2 font-montserrat">AUTOMATION FEATURES</p>
                        <h2 className="text-[clamp(28px,5vw,42px)] font-bold leading-[1.2] text-[#111827] mb-4 tracking-tight font-oswald">From Hello to <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-light after:to-purple-dark">High Conversions</span></h2>
                        <p className="text-[16px] leading-[1.6] text-[#6b7280] font-montserrat">
                            Launch Fast With Ready Automations Or Build Your Own Flows.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Feature Cards Placeholder */}
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex flex-col gap-6">
                                <div className="bg-[#f9fafb] rounded-[24px] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)] mb-0 flex flex-col items-stretch overflow-hidden border border-black/[0.03] h-[400px] min-h-0">
                                    <div className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] overflow-hidden flex-1 flex flex-col shadow-sm relative h-full">
                                        <div className="bg-white border-b border-[#e5e7eb] px-4 py-3 flex items-center justify-between z-10 relative">
                                            <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">Feature {item}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        </div>
                                        <div className="p-6 flex flex-col flex-1 h-full bg-white overflow-hidden relative">
                                            <p className="text-sm text-gray-600">Automation feature content goes here...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Features;
