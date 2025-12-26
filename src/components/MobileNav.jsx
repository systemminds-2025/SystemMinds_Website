
import React, { useState, useEffect } from 'react';

const MobileNav = ({ activeMobileNav, setActiveMobileNav }) => {
    const [activeSection, setActiveSection] = useState('home');

    // Navigation items configuration
    const navItems = [
        { id: 'home', label: 'Home', icon: 'home' },
        { id: 'about', label: 'About', icon: 'info' },
        { id: 'projects', label: 'Projects', icon: 'grid' },
        { id: 'services', label: 'Services', icon: 'box' },
        { id: 'contact', label: 'Contact', icon: 'message' }
    ];

    // Detect active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'projects', 'services', 'contact'];
            const scrollPosition = window.scrollY + 100; // Offset for better detection

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    setActiveMobileNav(sections[i].charAt(0).toUpperCase() + sections[i].slice(1));
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [setActiveMobileNav]);

    // Handle navigation click
    const handleNavClick = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(sectionId);
            setActiveMobileNav(sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
        }
    };

    // Icon components
    const getIcon = (iconType, isActive) => {
        const iconProps = {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "w-full h-full"
        };

        switch (iconType) {
            case 'home':
                return (
                    <svg {...iconProps}>
                        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                );
            case 'info':
                return (
                    <svg {...iconProps}>
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                );
            case 'grid':
                return (
                    <svg {...iconProps}>
                        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                    </svg>
                );
            case 'box':
                return (
                    <svg {...iconProps}>
                        <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <path d="M12 12V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 7.5L12 12L4 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            case 'message':
                return (
                    <svg {...iconProps}>
                        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-[#020617] px-4 py-3 flex justify-around items-center z-50 rounded-t-[24px] shadow-[0_-4px_24px_rgba(0,0,0,0.25)] min-h-[70px] pb-5">
            {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                    <button
                        key={item.id}
                        className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-gray-500 hover:text-gray-300'
                            }`}
                        onClick={() => handleNavClick(item.id)}
                    >
                        <div className={`w-6 h-6 flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-purple-600 rounded-lg p-1 shadow-[0_0_12px_rgba(147,51,234,0.5)]' : ''
                            }`}>
                            {getIcon(item.icon, isActive)}
                        </div>
                        <span className={`text-[10px] font-medium transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70'
                            }`}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
};

export default MobileNav;
