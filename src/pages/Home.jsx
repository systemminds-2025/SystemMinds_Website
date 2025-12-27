import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// Image import removed as per request
import logoImage from '../img/logo.png';
import imgInterview from '../img/about-interview.png';
import imgAssessment from '../img/about-assessment.png';
import ChatDemoSection from '../components/ChatDemoSection';
import ConnectSection from '../components/ConnectSection';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import ServicesCarouselSection from '../components/ServicesCarouselSection';
import '../index.css';

const Home = () => {
    // Chat Carousel State & Data
    const [currentChatIndex, setCurrentChatIndex] = useState(0);
    const [visibleChatMessages, setVisibleChatMessages] = useState([]);
    const [isChatTyping, setIsChatTyping] = useState(false);

    const mockChatData = [
        {
            user: "Sarah Jenkins",
            avatar: "https://i.pravatar.cc/150?u=30",
            messages: [
                { text: "Hey! Just checking the new dashboard 📊", isSender: false },
                { text: "It looks amazing! Great job team.", isSender: false },
                { text: "Thanks Sarah! Glad you like it.", isSender: true },
                { text: "Any specific feedback?", isSender: true },
                { text: "The loading speed is incredible now 🚀", isSender: false },
                { text: "We optimized the database queries.", isSender: true },
                { text: "It shows! Huge difference.", isSender: false },
                { text: "Question about the export feature...", isSender: false },
                { text: "Can we export to PDF yet?", isSender: false },
                { text: "Yes! Check the top right menu.", isSender: true },
                { text: "Found it! Perfect. Thanks! 🙏", isSender: false }
            ]
        },
        {
            user: "Mike Ross",
            avatar: "https://i.pravatar.cc/150?u=31",
            messages: [
                { text: "Project update meeting in 10?", isSender: false },
                { text: "Sure, let me grab a coffee ☕", isSender: true },
                { text: "Cool. I have the slides ready.", isSender: false },
                { text: "Did you add the Q3 stats?", isSender: true },
                { text: "Yes, just finished them.", isSender: false },
                { text: "Perfect. See you there!", isSender: true }
            ]
        },
        {
            user: "Jessica Lee",
            avatar: "https://i.pravatar.cc/150?u=32",
            messages: [
                { text: "Quick question on the API docs.", isSender: false },
                { text: "Go ahead, I'm listening.", isSender: true },
                { text: "Is the auth token required for GET?", isSender: false },
                { text: "Yes, for all v2 endpoints.", isSender: true },
                { text: "Got it. Changing my request.", isSender: false },
                { text: "Let me know if it works.", isSender: true },
                { text: "Works perfectly now! ✅", isSender: false }
            ]
        },
        {
            user: "David Kim",
            avatar: "https://i.pravatar.cc/150?u=33",
            messages: [
                { text: "Client loved the prototype! 🎉", isSender: false },
                { text: "That is fantastic news!", isSender: true },
                { text: "They want to move to dev phase.", isSender: false },
                { text: "When do they want to start?", isSender: true },
                { text: "Next Monday ideally.", isSender: false },
                { text: "We can make that happen.", isSender: true }
            ]
        },
        {
            user: "Emma Watson",
            avatar: "https://i.pravatar.cc/150?u=34",
            messages: [
                { text: "Running late for standup 😓", isSender: false },
                { text: "No worries, we can wait.", isSender: true },
                { text: "Traffic is crazy today.", isSender: false },
                { text: "Drive safe!", isSender: true },
                { text: "Be there in 5 mins.", isSender: false },
                { text: "See ya!", isSender: true }
            ]
        }
    ];

    // Chat Auto-Play Logic
    useEffect(() => {
        let messageTimeout;
        let transitionTimeout;

        const currentFullConversation = mockChatData[currentChatIndex].messages;

        if (visibleChatMessages.length < currentFullConversation.length) {
            // Typing simulation
            setIsChatTyping(true);
            messageTimeout = setTimeout(() => {
                setVisibleChatMessages(prev => [...prev, currentFullConversation[prev.length]]);
                setIsChatTyping(false);
            }, 1500); // 1.5s per message
        } else {
            // Conversation finished, wait then switch
            transitionTimeout = setTimeout(() => {
                setVisibleChatMessages([]); // Clear
                setCurrentChatIndex(prev => (prev + 1) % mockChatData.length); // Next user
            }, 3000); // 3s wait before next chat
        }

        return () => {
            clearTimeout(messageTimeout);
            clearTimeout(transitionTimeout);
        };
    }, [currentChatIndex, visibleChatMessages]);

    useEffect(() => {
        // Auto-scroll to bottom
        const chatContainer = document.getElementById('chat-scroll-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [visibleChatMessages]);

    // Question Carousel State & Data
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null); // { index: number, isCorrect: boolean } | null
    const [showConfetti, setShowConfetti] = useState(false);

    const mockQuestionData = [
        {
            id: 1,
            question: "What does 'AI' stand for?",
            options: ["Automated Internet", "Artificial Intelligence", "Advanced Input", "Apple Interface"],
            correctIndex: 1 // Artificial Intelligence
        },
        {
            id: 2,
            question: "Which language runs in a web browser?",
            options: ["Python", "Java", "C++", "JavaScript"],
            correctIndex: 3 // JavaScript
        },
        {
            id: 3,
            question: "What is the main purpose of a Cloud?",
            options: ["To rain water", "To store data online", "To cool the computer", "To block the sun"],
            correctIndex: 1 // To store data online
        },
        {
            id: 4,
            question: "What does 'UI' stand for in design?",
            options: ["User Internet", "Unique Interface", "User Interface", "Under Index"],
            correctIndex: 2 // User Interface
        },
        {
            id: 5,
            question: "Which one is a mobile operating system?",
            options: ["Windows", "MacOS", "Android", "Linux"],
            correctIndex: 2 // Android
        }
    ];

    // Question Auto-Play Logic
    useEffect(() => {
        if (selectedOption !== null) return; // Pause auto-rotation if user interacted

        const timer = setInterval(() => {
            setCurrentQuestionIndex(prev => (prev + 1) % mockQuestionData.length);
        }, 4000); // 4 seconds per question
        return () => clearInterval(timer);
    }, [selectedOption]);

    const handleOptionClick = (optionIndex) => {
        if (selectedOption !== null) return; // Prevent multiple clicks

        const currentQuestion = mockQuestionData[currentQuestionIndex];
        const isCorrect = optionIndex === currentQuestion.correctIndex;

        setSelectedOption({ index: optionIndex, isCorrect });

        if (isCorrect) {
            setShowConfetti(true);
            // Wait then next question
            setTimeout(() => {
                setShowConfetti(false);
                setSelectedOption(null);
                setCurrentQuestionIndex(prev => (prev + 1) % mockQuestionData.length);
            }, 3000);
        } else {
            // Incorrect - just show error state for a bit then reset or move on? 
            // User said: "if its wrong then u need to make it some differnt animated" -> e.g. shake.
            // We'll reset after 1.5s to let them try again or auto-move? Let's auto-move to keep flow.
            setTimeout(() => {
                setSelectedOption(null);
                setCurrentQuestionIndex(prev => (prev + 1) % mockQuestionData.length);
            }, 1500);
        }
    };






    return (
        <div className="min-h-screen flex flex-col font-montserrat">
            {/* HERO SECTION */}
            <div id="home">
                <HeroSection />
            </div>

            {/* ABOUT SECTION - DIGITAL TRANSFORMATION SOLUTIONS */}
            <div id="about">
                <ChatDemoSection />
            </div>

            {/* PROJECTS SECTION */}
            <div id="projects">
                <ProjectsSection />
            </div>

            {/* CONNECT WITH US SECTION */}
            <div id="contact">
                <ConnectSection />
            </div>

            {/* SERVICES SECTION */}
            <div id="services">
                <ServicesCarouselSection />
            </div>


            {/* BUSINESS DASHBOARD SECTION - WHY CHOOSE US */}
            <section id="whyus" className="bg-white py-[100px] px-5 border-t border-[#e5e7eb] overflow-hidden">
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

                            {/* Column 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="space-y-4 md:space-y-6 mt-12 md:mt-24" // Offset down
                            >
                                {/* Image Card */}
                                <div className="rounded-2xl overflow-hidden h-40 md:h-56 relative group">
                                    <img src={imgAssessment} alt="AI Technology" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>

                                {/* Stats Card - Total Sales */}
                                <div className="bg-[#1a1a1a] rounded-2xl p-5 md:p-6 flex flex-col justify-center items-start shadow-xl border border-white/5">
                                    <span className="text-purple-light font-oswald font-bold text-3xl md:text-4xl mb-1">25k+</span>
                                    <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Total Sales</span>
                                </div>
                            </motion.div>

                            {/* Column 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="space-y-4 md:space-y-6"
                            >
                                {/* Stats Card - Total Expenses */}
                                <div className="bg-[#1a1a1a] rounded-2xl p-5 md:p-6 flex flex-col justify-center items-end text-right shadow-xl border border-white/5">
                                    <span className="text-purple-light font-oswald font-bold text-3xl md:text-4xl mb-1">22k+</span>
                                    <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Total Expenses</span>
                                </div>

                                {/* Image Card */}
                                <div className="rounded-2xl overflow-hidden h-56 md:h-72 relative group">
                                    <img src={imgInterview} alt="Mentorship" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </section >


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
                        {/* Feature 1 */}
                        <div className="flex flex-col gap-6">
                            <div className="bg-[#f9fafb] rounded-[24px] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)] mb-0 flex flex-col items-stretch overflow-hidden border border-black/[0.03] h-[400px] min-h-0">
                                <div className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] overflow-hidden flex-1 flex flex-col shadow-sm relative h-full">
                                    <div className="bg-white border-b border-[#e5e7eb] px-4 py-3 flex items-center justify-between z-10 relative">
                                        <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">New Followers</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    </div>
                                    <div className="p-0 flex flex-col flex-1 h-full bg-white overflow-hidden relative">
                                        <motion.div
                                            className="flex flex-col"
                                            animate={{
                                                y: ["-50%", "0%"]
                                            }}
                                            transition={{
                                                y: {
                                                    repeat: Infinity,
                                                    repeatType: "loop",
                                                    duration: 40,
                                                    ease: "linear",
                                                },
                                            }}
                                        >
                                            {[
                                                { name: "alex_designs", img: "https://i.pravatar.cc/150?u=1" },
                                                { name: "sarah.creative", img: "https://i.pravatar.cc/150?u=2" },
                                                { name: "mike_codes", img: "https://i.pravatar.cc/150?u=3" },
                                                { name: "emma_studio", img: "https://i.pravatar.cc/150?u=4" },
                                                { name: "luke_dev", img: "https://i.pravatar.cc/150?u=5" },
                                                { name: "nana_art", img: "https://i.pravatar.cc/150?u=6" },
                                                { name: "david.tech", img: "https://i.pravatar.cc/150?u=7" },
                                                { name: "lisa_ux", img: "https://i.pravatar.cc/150?u=8" },
                                                { name: "james_web", img: "https://i.pravatar.cc/150?u=9" },
                                                { name: "sophia_ui", img: "https://i.pravatar.cc/150?u=10" },
                                                { name: "ryan_pm", img: "https://i.pravatar.cc/150?u=11" },
                                                { name: "kelly_marketing", img: "https://i.pravatar.cc/150?u=12" },
                                                { name: "kevin_photo", img: "https://i.pravatar.cc/150?u=13" },
                                                { name: "jess_writer", img: "https://i.pravatar.cc/150?u=14" },
                                                { name: "tom_travel", img: "https://i.pravatar.cc/150?u=15" },
                                                { name: "anna_fashion", img: "https://i.pravatar.cc/150?u=16" },
                                                { name: "chris_music", img: "https://i.pravatar.cc/150?u=17" },
                                                { name: "megan_food", img: "https://i.pravatar.cc/150?u=18" },
                                                { name: "steve_gym", img: "https://i.pravatar.cc/150?u=19" },
                                                { name: "laura_blog", img: "https://i.pravatar.cc/150?u=20" },
                                                // Duplicate for loop
                                                { name: "alex_designs", img: "https://i.pravatar.cc/150?u=1" },
                                                { name: "sarah.creative", img: "https://i.pravatar.cc/150?u=2" },
                                                { name: "mike_codes", img: "https://i.pravatar.cc/150?u=3" },
                                                { name: "emma_studio", img: "https://i.pravatar.cc/150?u=4" },
                                                { name: "luke_dev", img: "https://i.pravatar.cc/150?u=5" },
                                                { name: "nana_art", img: "https://i.pravatar.cc/150?u=6" },
                                                { name: "david.tech", img: "https://i.pravatar.cc/150?u=7" },
                                                { name: "lisa_ux", img: "https://i.pravatar.cc/150?u=8" },
                                                { name: "james_web", img: "https://i.pravatar.cc/150?u=9" },
                                                { name: "sophia_ui", img: "https://i.pravatar.cc/150?u=10" },
                                                { name: "ryan_pm", img: "https://i.pravatar.cc/150?u=11" },
                                                { name: "kelly_marketing", img: "https://i.pravatar.cc/150?u=12" },
                                                { name: "kevin_photo", img: "https://i.pravatar.cc/150?u=13" },
                                                { name: "jess_writer", img: "https://i.pravatar.cc/150?u=14" },
                                                { name: "tom_travel", img: "https://i.pravatar.cc/150?u=15" },
                                                { name: "anna_fashion", img: "https://i.pravatar.cc/150?u=16" },
                                                { name: "chris_music", img: "https://i.pravatar.cc/150?u=17" },
                                                { name: "megan_food", img: "https://i.pravatar.cc/150?u=18" },
                                                { name: "steve_gym", img: "https://i.pravatar.cc/150?u=19" },
                                                { name: "laura_blog", img: "https://i.pravatar.cc/150?u=20" },
                                            ].map((user, idx) => (
                                                <div key={idx} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                    <img src={user.img} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                                        <p className="text-[10px] text-gray-500 truncate">Suggested for you</p>
                                                    </div>
                                                    <button className="bg-blue-500 text-white text-xs font-semibold px-4 py-1.5 rounded-[8px] hover:bg-blue-600 transition-colors">
                                                        Follow
                                                    </button>
                                                    <button className="text-gray-400 hover:text-gray-600 p-1">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                                                            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                                                            <circle cx="12" cy="19" r="1.5" fill="currentColor" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-[#111827] font-oswald mb-2">Greet your new followers with ease</h3>
                            <p className="text-sm text-[#6b7280] leading-[1.6] font-montserrat">
                                Make Every New Follower Feel Welcomed With Instant, Friendly Greetings.
                            </p>
                        </div>

                        {/* Feature 2: Messages Carousel */}
                        <div className="flex flex-col gap-6">
                            <div className="bg-[#f9fafb] rounded-[24px] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)] mb-0 flex flex-col items-stretch overflow-hidden border border-black/[0.03] h-[400px] min-h-0">
                                <div className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] overflow-hidden flex-1 flex flex-col shadow-sm relative h-full">
                                    <div className="bg-white border-b border-[#e5e7eb] px-4 py-4 flex items-center justify-between z-20 relative">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <img src={mockChatData[currentChatIndex].avatar} alt="" className="w-6 h-6 rounded-full object-cover border border-gray-100" />
                                                <span className="text-sm font-bold text-[#111827] truncate max-w-[150px]">{mockChatData[currentChatIndex].user}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="flex-1 bg-white relative overflow-hidden flex flex-col">
                                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" id="chat-scroll-container">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={currentChatIndex}
                                                    initial={{ x: 50, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    exit={{ x: -50, opacity: 0 }}
                                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                                    className="flex flex-col gap-3 min-h-full justify-end"
                                                >
                                                    {visibleChatMessages.map((msg, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            transition={{ duration: 0.3 }}
                                                            className={`flex w-full ${msg.isSender ? 'justify-end' : 'justify-start'}`}
                                                        >
                                                            <div className={`max-w-[85%] py-2.5 px-3.5 rounded-2xl text-[13px] leading-[1.4] shadow-sm ${msg.isSender ? 'bg-slate-950 text-white rounded-br-sm' : 'bg-gray-100 text-gray-900 rounded-bl-sm border border-gray-100'}`}>
                                                                {msg.text}
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                    {isChatTyping && (
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            className="flex w-full justify-start"
                                                        >
                                                            <div className="bg-gray-100 rounded-2xl rounded-bl-sm py-3 px-4 flex gap-1 items-center border border-gray-100">
                                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>

                                        <div className="p-3 border-t border-[#f3f4f6] bg-white z-20">
                                            <div className="flex gap-2">
                                                <input type="text" placeholder="Type Your Text" className="flex-1 border border-[#e5e7eb] rounded-lg px-3 py-2 text-[13px] bg-white text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-gray-400" disabled />
                                                <button className="w-9 h-9 rounded-lg bg-slate-950 text-white border-none cursor-pointer flex items-center justify-center hover:bg-slate-900 transition-colors">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-[#111827] font-oswald mb-2">Deliver automatic welcome messages</h3>
                            <p className="text-sm text-[#6b7280] leading-[1.6] font-montserrat">
                                Send Personalised Welcome Messages That Make Every New Follower Feel Valued.
                            </p>
                        </div>
                        {/* Feature 3: Questions Carousel */}
                        <div className="flex flex-col gap-6">
                            <div className="bg-[#f9fafb] rounded-[24px] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)] mb-0 flex flex-col items-stretch overflow-hidden border border-black/[0.03] h-[400px] min-h-0">
                                <div className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] overflow-hidden flex-1 flex flex-col shadow-sm relative h-full">
                                    <div className="flex gap-1.5 mb-2 px-6 pt-6">
                                        {mockQuestionData.map((_, idx) => (
                                            <div key={idx} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${idx === currentQuestionIndex ? 'bg-slate-900' : 'bg-gray-200'}`}></div>
                                        ))}
                                    </div>

                                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={currentQuestionIndex + "-content"}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.4 }}
                                                className="w-full flex flex-col items-center pointer-events-auto"
                                            >
                                                <div className="bg-gray-100 text-black font-bold px-3 py-1 rounded text-[10px] tracking-widest uppercase mb-3 inline-block">
                                                    Question 0{currentQuestionIndex + 1}
                                                </div>
                                                <h4 className="text-lg font-bold text-slate-900 mb-4 leading-tight max-w-[90%] min-h-[54px] flex items-center justify-center">
                                                    {mockQuestionData[currentQuestionIndex].question}
                                                </h4>

                                                <div className="w-full flex flex-col gap-2 max-w-[90%] relative">
                                                    {mockQuestionData[currentQuestionIndex].options.map((option, optIdx) => {
                                                        const isSelected = selectedOption?.index === optIdx;
                                                        const isCorrectAnswer = optIdx === mockQuestionData[currentQuestionIndex].correctIndex;

                                                        // Visual State Logic
                                                        let containerClass = "bg-gray-50 border-gray-200 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200";
                                                        let circleClass = "border-gray-200 group-hover:border-blue-500";

                                                        if (selectedOption) {
                                                            if (isSelected) {
                                                                if (selectedOption.isCorrect) {
                                                                    containerClass = "bg-green-50 border-green-200 text-green-700";
                                                                    circleClass = "border-green-500 bg-green-500";
                                                                } else {
                                                                    containerClass = "bg-red-50 border-red-200 text-red-700";
                                                                    circleClass = "border-red-500 bg-red-500";
                                                                }
                                                            } else if (isCorrectAnswer && !selectedOption.isCorrect) {
                                                                // Show correct answer if user got it wrong? Maybe specific request? 
                                                                // User didn't ask to reveal correct if wrong, just "if its wrong then u need to make it some differnt animated".
                                                                // I will keep it simple for now, only animate the wrong one.
                                                            }
                                                        }

                                                        return (
                                                            <motion.div
                                                                key={optIdx}
                                                                className={`flex items-center gap-3 w-full group cursor-pointer p-2 rounded-lg border transition-all ${containerClass} ${selectedOption?.index === optIdx && !selectedOption.isCorrect ? 'shake-animation' : ''}`}
                                                                onClick={() => handleOptionClick(optIdx)}
                                                                animate={selectedOption?.index === optIdx && !selectedOption.isCorrect ? { x: [-10, 10, -10, 10, 0] } : {}}
                                                                transition={{ duration: 0.4 }}
                                                            >
                                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${circleClass}`}>
                                                                    {isSelected && selectedOption.isCorrect && <div className="w-2 h-2 bg-white rounded-full" />}
                                                                    {isSelected && !selectedOption.isCorrect && <div className="w-2 h-2 bg-white rounded-full" />}
                                                                </div>
                                                                <div className="text-xs font-medium text-left truncate flex-1">
                                                                    {option}
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}


                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-[#111827] font-oswald mb-2">Automate your FAQs with fast, Intelligent</h3>
                            <p className="text-sm text-[#6b7280] leading-[1.6] font-montserrat">
                                Give Your Customers Instant Clarity With AI-Powered FAQ Automation.
                            </p>
                        </div>
                    </div>
                </div>
            </section >

            {/* CTA BANNER SECTION */}
            < section className="bg-[#4b5563] py-20 px-5" >
                <div className="max-w-[1920px] mx-auto px-[6vw] text-center">
                    <h2 className="text-[42px] font-bold leading-[1.2] text-white mb-4 tracking-[-0.02em] font-oswald">Grow your followers with smart automation</h2>
                    <p className="text-[15px] leading-[1.6] text-gray-200 mb-8 max-w-[600px] mx-auto font-montserrat">
                        Grow Your Followers Effortlessly With Smart, Automated Tools That Work For You.
                    </p>
                    <button className="bg-slate-950 text-white border-none py-3.5 px-6 rounded-full text-sm font-medium cursor-pointer inline-flex items-center gap-2.5 shadow-lg transition-all duration-200 hover:-translate-y-px hover:shadow-xl font-montserrat group">
                        Start Free Trial
                        <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                            <span className="text-xs">→</span>
                        </span>
                    </button>
                </div>
            </section >


            {/* Global Confetti Overlay */}
            < AnimatePresence >
                {showConfetti && (
                    <div key={currentQuestionIndex} className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
                        {[...Array(50)].map((_, i) => {
                            const randomLeft = Math.random() * 100;
                            const randomDelay = Math.random() * 0.5;
                            const isPaper = Math.random() > 0.3; // 70% paper, 30% emojis
                            const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
                            const randomColor = colors[Math.floor(Math.random() * colors.length)];

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ y: -50, x: 0, opacity: 1, rotate: 0 }}
                                    animate={{
                                        y: 1200,
                                        x: (Math.random() - 0.5) * 200, // Drifting
                                        rotate: 720,
                                        opacity: 0
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2.5 + Math.random(), ease: "easeOut", delay: randomDelay }}
                                    className="absolute"
                                    style={{
                                        left: `${randomLeft}%`,
                                        top: '-50px'
                                    }}
                                >
                                    {isPaper ? (
                                        <div
                                            style={{ backgroundColor: randomColor }}
                                            className="w-3 h-3 md:w-4 md:h-4 rounded-[2px]"
                                        />
                                    ) : (
                                        <span className="text-xl md:text-3xl">
                                            {['🎉', '✨', '🔥', '💯'][Math.floor(Math.random() * 4)]}
                                        </span>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                )
                }
            </AnimatePresence >
        </div >
    );
}

export default Home;
