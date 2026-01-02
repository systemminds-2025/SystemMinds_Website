
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ServicesCarouselSection = () => {
    // -- NEW SLIDER DATA --
    const slides = [
        {
            title: "Cloud Solutions",
            description: "Scalable, secure, and cost-effective cloud infrastructure tailored for your business. We help you migrate, optimize, and manage your cloud environment seamlessly.",
            tags: ["Cloud Migration", "AWS/Azure/GCP", "DevOps", "Serverless", "Security", "Scalability"],
            image: "https://cdn.prod.website-files.com/66ebfb6ec8f20d5eda50eb34/6862ad39cbcc40586e077ab6_banner%20cover%20tasknet.avif"
        },
        {
            title: "Web Development",
            description: "Custom web application development using cutting-edge technologies. We build robust, responsive, and high-performance web solutions that drive business growth.",
            tags: ["Full Stack", "React/Next.js", "Node.js", "PWA", "Enterprise Apps", "API Integration"],
            image: "https://cdn.prod.website-files.com/66ebfb6ec8f20d5eda50eb34/6891b497fb3a962d3fbd38df_widget%20cover.avif"
        },
        {
            title: "AI Integration",
            description: "Empower your business with intelligent AI solutions. From predictive analytics to custom LLM integration, we transform data into actionable insights.",
            tags: ["Machine Learning", "Generative AI", "NLP", "Chatbots", "Automation", "Data Analytics"],
            image: "https://cdn.prod.website-files.com/66ebfb6ec8f20d5eda50eb34/69009bc4d933d6a0ab87946c_57a9664b93ef6206641caf1c2e21bf30_cover.avif"
        },
        {
            title: "Website Design",
            description: "Stunning, high-performance corporate websites that capture your brand identity. We focus on user experience, SEO, and conversion optimization.",
            tags: ["UI/UX Design", "Responsive Design", "SEO", "CMS Development", "E-commerce", "Brand Identity"],
            image: "https://cdn.prod.website-files.com/66ebfb6ec8f20d5eda50eb34/6900789ca1fd1ba990e2e28f_333b01f97a984f25ee39ec53d1207c19_Planful%20case%20study%20cover.avif"
        },
        {
            title: "Mobile Apps",
            description: "Native and cross-platform mobile application development. We create engaging, intuitive mobile experiences for iOS and Android platforms.",
            tags: ["iOS Development", "Android Development", "React Native", "Flutter", "App Store Optimization", "Mobile UI/UX"],
            image: "https://cdn.prod.website-files.com/66ebfb6ec8f20d5eda50eb34/67611be9ff9158fd4a93cade_Case%20study%20cover%20-%20Luniate%20(2)%20(1).avif"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const autoScrollRef = useRef(null);

    useEffect(() => {
        if (!isPaused) {
            autoScrollRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 5000);
        }
        return () => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current);
            }
        };
    }, [isPaused, slides.length]);

    return (
        <section className="bg-[#e5e7eb] px-4 md:px-8 border-b border-gray-100 h-auto md:h-[95vh] min-h-[700px] flex flex-col justify-center py-12 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
                {/* Section Header - Compact */}
                <div className="text-center mb-6 md:mb-8 max-w-[800px] mx-auto z-[20] relative shrink-0">
                    <p className="text-xs font-semibold text-purple-light uppercase tracking-widest mb-2 font-montserrat">OUR SERVICES</p>
                    <h2 className="text-2xl md:text-4xl font-bold text-[#111827] leading-tight mb-2 tracking-tight font-oswald">
                        Comprehensive Services for <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-light after:to-purple-dark">Digital Growth</span>
                    </h2>
                    <p className="text-xs md:text-sm text-[#4b5563] leading-snug font-montserrat font-normal max-w-xl mx-auto hidden sm:block">
                        We provide end-to-end digital solutions tailored to your business needs.
                    </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100 flex-1 md:flex-none md:h-[450px] lg:h-[500px] flex flex-col"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Slides Container */}
                    <div
                        className="flex transition-transform duration-700 ease-in-out h-full"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div key={index} className="min-w-full h-full">
                                <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center p-4 md:p-8 lg:p-12 w-full h-full">
                                    {/* Left Side - Image */}
                                    <div className="flex items-center justify-center order-1 md:order-1 h-[40%] md:h-full">
                                        <div className="w-full h-full max-h-[250px] md:max-h-[380px] overflow-hidden rounded-xl shadow-md relative bg-gray-50 flex items-center justify-center">
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="w-full h-full object-cover rounded-xl transform hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    </div>

                                    {/* Right Side - Content */}
                                    <div className="flex flex-col justify-center space-y-3 md:space-y-6 order-2 md:order-2 h-full">
                                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-oswald tracking-tight leading-tight">
                                            {slide.title}
                                        </h2>

                                        <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm lg:text-base leading-relaxed font-montserrat font-medium line-clamp-3 md:line-clamp-none max-w-xl">
                                            {slide.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {slide.tags.slice(0, 4).map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-gray-700 text-xs font-medium hover:bg-gray-100 hover:border-gray-300 transition-colors cursor-default"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Learn More Button */}
                                        <div className="pt-2">
                                            <button className="px-5 py-2 md:px-8 md:py-3 bg-black hover:bg-gray-800 text-white rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2 group text-xs md:text-base">
                                                Learn more
                                                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows - Hidden on small mobile */}
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg p-2 md:p-3 rounded-full transition-all duration-300 z-10 border border-gray-100 text-gray-900 hover:scale-110 hidden sm:flex"
                    >
                        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                    </button>

                    <button
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg p-2 md:p-3 rounded-full transition-all duration-300 z-10 border border-gray-100 text-gray-900 hover:scale-110 hidden sm:flex"
                    >
                        <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                    </button>

                    {/* Dot Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`transition-all duration-300 rounded-full ${currentSlide === index
                                    ? 'w-6 h-2 md:w-10 md:h-3 bg-gray-900'
                                    : 'w-2 h-2 md:w-3 md:h-3 bg-gray-300 hover:bg-gray-500'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesCarouselSection;
