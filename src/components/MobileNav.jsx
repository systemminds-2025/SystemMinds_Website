
import React from 'react';

const MobileNav = ({ activeMobileNav, setActiveMobileNav }) => {
    return (
        <nav className="fixed lg:hidden bottom-0 left-0 right-0 bg-[#020617] px-6 py-3 flex justify-between items-end z-50 rounded-t-[24px] shadow-[0_-4px_24px_rgba(0,0,0,0.25)] min-h-[70px] pb-5">
            <button
                className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeMobileNav === 'Home' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                onClick={() => setActiveMobileNav('Home')}
            >
                <div className={`w-6 h-6 flex items-center justify-center ${activeMobileNav === 'Home' ? 'bg-white/10 rounded-lg p-1' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                </div>
            </button>
            <button
                className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeMobileNav === 'About' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                onClick={() => setActiveMobileNav('About')}
            >
                <div className={`w-6 h-6 flex items-center justify-center ${activeMobileNav === 'About' ? 'bg-white/10 rounded-lg p-1' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
            </button>
            <div className="relative -top-8">
                <button
                    className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(147,51,234,0.4)] transition-all hover:scale-110 hover:shadow-[0_8px_24px_rgba(147,51,234,0.5)] border-4 border-[#020617]"
                    onClick={() => setActiveMobileNav('Home')}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            <button
                className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeMobileNav === 'Services' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                onClick={() => setActiveMobileNav('Services')}
            >
                <div className={`w-6 h-6 flex items-center justify-center ${activeMobileNav === 'Services' ? 'bg-white/10 rounded-lg p-1' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <path d="M12 12V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 7.5L12 12L4 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 12L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </button>
            <button
                className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeMobileNav === 'Profile' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                onClick={() => setActiveMobileNav('Profile')}
            >
                <div className={`w-6 h-6 flex items-center justify-center ${activeMobileNav === 'Profile' ? 'bg-white/10 rounded-lg p-1' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </button>
        </nav>
    );
};

export default MobileNav;
