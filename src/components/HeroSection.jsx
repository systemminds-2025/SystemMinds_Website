
import React from 'react';
import { motion } from 'framer-motion';
import smartbotImage from '../img/PhotoshopExtension_Image.png';

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-b from-[#f5f5f7] to-[#e5e7eb] flex items-center justify-center py-10 px-5 min-h-screen">
            <div className="max-w-[1920px] w-full px-[6vw] py-10 pb-20 relative mx-auto">

                {/* Hero Content with Company Description */}
                <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-center gap-6 md:gap-20 relative min-h-[280px] md:min-h-[380px] pt-3 md:pt-5">
                    <motion.div
                        className="relative shrink-0 z-[2] w-full md:w-auto flex justify-center md:block"
                        initial={{ opacity: 0, x: -100, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.2
                        }}
                        whileHover={{
                            scale: 1.05,
                            rotate: [0, -5, 5, -5, 0],
                            transition: { duration: 0.5 }
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img src={smartbotImage} alt="SmartBot Character" className="w-[140px] sm:w-[200px] md:w-[280px] h-auto object-contain transition-[width] duration-300" />
                    </motion.div>
                    <motion.div
                        className="max-w-[800px] flex-1 mt-0 md:mt-5 w-full md:px-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.3
                        }}
                    >
                        <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-purple-light uppercase tracking-wider md:tracking-widest mb-3 md:mb-6 font-montserrat text-left">TRANSFORM YOUR IDEAS INTO REALITY</p>
                        <h1 className="text-[28px] sm:text-[32px] md:text-[clamp(32px,5vw,48px)] font-bold text-black leading-[1.2] mb-4 md:mb-8 font-oswald text-left">
                            Professional <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-light after:to-purple-dark">Services</span> & Innovative Products
                        </h1>
                        <p className="text-[13px] sm:text-sm md:text-sm text-[#6b7280] leading-[1.6] mb-3 md:mb-5 font-sans font-normal text-left">
                            SystemMinds is a full-stack digital studio delivering robust products, future-ready platforms, and tailor-made enterprise solutions. We blend strategy, UI engineering, and cloud-native development to accelerate growth for ambitious brands. Our comprehensive approach ensures seamless integration of cutting-edge technologies with business objectives.
                        </p>
                        <p className="text-[13px] sm:text-sm md:text-sm text-[#6b7280] leading-[1.6] mb-4 md:mb-5 font-sans font-normal">
                            With expertise spanning React.js, Spring Boot, Python, and modern cloud technologies, we transform complex business challenges into elegant, scalable digital solutions. Our team combines technical excellence with creative problem-solving to deliver products that not only meet today's needs but are built to evolve with your business. From initial consultation to post-launch support, we provide end-to-end services that drive measurable results and sustainable growth.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
