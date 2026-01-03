import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../img/profilet_logo.png';
import mainLogo from '../img/logo.png';

const Navbar = ({ isScrolled, isNavCollapsed, setIsNavCollapsed }) => {
    const [activeSection, setActiveSection] = useState('home');

    // Detect active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'projects', 'contact', 'services'];
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMenuClick = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    const handleArrowClick = (e) => {
        e.stopPropagation();
        handleMenuClick();
    };

    const handleNavClick = (item, e) => {
        e.preventDefault();
        let targetId;

        if (item === 'Home') targetId = 'home';
        else if (item === 'Features') targetId = 'whyus'; // Features scrolls to WHY CHOOSE US section
        else targetId = item.toLowerCase();

        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className={`flex items-center justify-between gap-6 m-0 px-5 md:px-12 fixed top-0 left-0 right-0 w-full z-[1000] py-5 transition-all duration-300 ${isScrolled ? 'bg-[#f5f5f7]/98 backdrop-blur-[40px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-b border-black/10 py-3' : 'bg-transparent'}`}>
            {/* Logo with Text */}
            <div className="flex items-center gap-3 h-11 shrink-0">
                <div className="flex items-center gap-2">
                    <img src={mainLogo} alt="SystemMindz Logo" className="h-8 w-auto object-contain block" />
                    <span className="text-[22px] font-semibold text-[#111827] whitespace-nowrap leading-none flex items-center tracking-[0.5px] lowercase">
                        <span className="uppercase font-bold text-2xl tracking-wider">S</span>ystem<span className="uppercase font-bold text-2xl tracking-wider">M</span>indz
                    </span>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="hidden md:flex items-center justify-end gap-2 bg-white p-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] w-fit flex-nowrap whitespace-nowrap min-h-[60px] box-border relative">
                {/* Menu Items */}
                <div className="flex items-center gap-2 relative">
                    <AnimatePresence mode="popLayout">
                        {!isNavCollapsed && (
                            <>
                                {['Home', 'About', 'Projects', 'Contact', 'Services'].map((item, index) => {
                                    const itemId = item === 'Home' ? 'home' : item.toLowerCase();
                                    const isActive = activeSection === itemId;

                                    return (
                                        <a
                                            key={item}
                                            href={`#${itemId}`}
                                            onClick={(e) => handleNavClick(item, e)}
                                            className="no-underline"
                                        >
                                            <motion.div
                                                className={`border-none px-4 py-2 text-xs cursor-pointer transition-all duration-200 rounded-full whitespace-nowrap inline-block ${isActive
                                                    ? 'bg-purple-600 text-white shadow-[0_2px_8px_rgba(147,51,234,0.3)]'
                                                    : 'bg-transparent text-[#111827] hover:bg-black/5'
                                                    }`}
                                                initial={{ opacity: 0, y: -10, height: 0 }}
                                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                exit={{ opacity: 0, y: -10, height: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut', delay: index * 0.05 }}
                                            >
                                                {item}
                                            </motion.div>
                                        </a>
                                    );
                                })}
                            </>
                        )}
                    </AnimatePresence>
                </div>
                <button
                    className="bg-[#020617] text-white border-none p-2 px-3 rounded-full text-xs font-medium cursor-pointer flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200 hover:translate-y-[-1px] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] shrink-0 relative z-10"
                >
                    <span
                        className="inline-block cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Scroll to Features section
                            const element = document.getElementById('whyus');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }}
                    >
                        Features
                    </span>
                    <motion.span
                        className="flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleMenuClick();
                        }}
                        animate={{ rotate: isNavCollapsed ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <span className="w-[18px] h-[18px] rounded-full bg-white text-[#020617] flex items-center justify-center text-[11px] font-bold leading-none transition-all duration-200 hover:scale-110 hover:bg-[#f3f4f6]">→</span>
                    </motion.span>
                </button>
            </nav>
        </div>
    );
};

export default Navbar;
