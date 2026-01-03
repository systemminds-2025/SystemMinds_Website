
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypewriterText = ({ text, messageId }) => {
    const [displayedText, setDisplayedText] = useState('');
    const animatedMessagesRef = useRef(new Set());

    useEffect(() => {
        // Check if this message has already been animated
        if (animatedMessagesRef.current.has(messageId)) {
            setDisplayedText(text);
            return;
        }

        let index = 0;
        setDisplayedText('');
        const intervalId = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(index));
            index++;
            if (index === text.length) {
                clearInterval(intervalId);
                animatedMessagesRef.current.add(messageId);
            }
        }, 15);
        return () => clearInterval(intervalId);
    }, [text, messageId]);

    return <span>{displayedText}</span>;
};

const ChatDemoSection = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [likedMessageId, setLikedMessageId] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [isEmailCollected, setIsEmailCollected] = useState(false);
    const [showHearts, setShowHearts] = useState(false);
    const messagesInitialized = useRef(false);

    // Email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isOnlyEmoji = (str) => {
        if (!str) return false;
        const emojiRegex = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|\s)+$/;
        return emojiRegex.test(str);
    };

    // Auto-send greeting messages on page load
    useEffect(() => {
        // Only initialize once
        if (messagesInitialized.current) return;
        messagesInitialized.current = true;

        const getGreeting = () => {
            const hour = new Date().getHours();
            if (hour < 12) return 'Good morning';
            if (hour < 18) return 'Good afternoon';
            return 'Good evening';
        };

        const greeting = getGreeting();

        // First message - greeting
        setTimeout(() => {
            setMessages([{
                id: 1,
                text: `Hello! ${greeting}! 👋`,
                sender: 'bot',
                timestamp: new Date()
            }]);
        }, 500);

        // Second message - asking about project (appears after first message finishes typing)
        setTimeout(() => {
            setMessages(prev => {
                // Check if message already exists to prevent duplicates
                if (prev.some(msg => msg.id === 2)) return prev;
                return [...prev, {
                    id: 2,
                    text: 'Please tell me about your project. How can we help you today?',
                    sender: 'bot',
                    timestamp: new Date()
                }];
            });
        }, 3500); // Wait for first message to fully type out (500ms initial + ~400ms typing + extra buffer)
    }, []);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        const chatBody = document.querySelector('.chat-body');
        if (chatBody) {
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }, [messages]);


    const handleLikeClick = () => {
        const botMessages = messages.filter(msg => msg.sender === 'bot');
        if (botMessages.length > 0) {
            const latestBotMessage = botMessages[botMessages.length - 1];
            setLikedMessageId(latestBotMessage.id);
            setShowHearts(true);
            setTimeout(() => setShowHearts(false), 2000);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const messageText = inputValue.trim();
        const messageId = Date.now();

        // Check if we're collecting email and this is an email input
        if (!isEmailCollected && messageText.includes('@')) {
            // Validate email
            if (isValidEmail(messageText)) {
                setUserEmail(messageText);
                setIsEmailCollected(true);

                // Add user email message
                const emailMessage = {
                    id: messageId,
                    text: messageText,
                    sender: 'user',
                    timestamp: new Date(),
                    status: 'sending'
                };

                setMessages(prev => [...prev, emailMessage]);

                // Send email notification when user provides their email
                try {
                    const response = await fetch('/api/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userMessage: messageText, // The email address itself
                            subject: 'New Email Registration from SystemMindz Website',
                            fromName: 'SystemMindz Website Visitor',
                            fromEmail: messageText, // Send from user's email
                            isEmailRegistration: true, // Flag to indicate this is email registration
                        }),
                    });

                    const result = await response.json();
                    if (result.ok) {
                        // Update message status to "delivered"
                        setMessages(prev => prev.map(msg =>
                            msg.id === messageId ? { ...msg, status: 'delivered' } : msg
                        ));
                    } else {
                        // Update message status to "sent" even if email failed
                        setMessages(prev => prev.map(msg =>
                            msg.id === messageId ? { ...msg, status: 'sent' } : msg
                        ));
                    }
                } catch (error) {
                    // Update message status to "sent" on error
                    setMessages(prev => prev.map(msg =>
                        msg.id === messageId ? { ...msg, status: 'sent' } : msg
                    ));
                    console.error('Error sending email notification:', error);
                }

                // Bot confirmation
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: Date.now(),
                        text: `Thank you! Your email ${messageText} has been saved. You can now send your message.`,
                        sender: 'bot',
                        timestamp: new Date()
                    }]);
                }, 500);

                setInputValue('');
                return;
            } else {
                // Invalid email - show error and ask again
                const errorMessage = {
                    id: messageId,
                    text: messageText,
                    sender: 'user',
                    timestamp: new Date(),
                    status: 'delivered'
                };

                setMessages(prev => [...prev, errorMessage]);

                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: Date.now(),
                        text: 'Please enter a valid email address (e.g., yourname@example.com):',
                        sender: 'bot',
                        timestamp: new Date()
                    }]);
                }, 500);

                setInputValue('');
                return;
            }
        }

        // Regular message handling
        // Add user message with "sending" status
        const userMessage = {
            id: messageId,
            text: messageText,
            sender: 'user',
            timestamp: new Date(),
            status: 'sending' // sending, sent, delivered
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        // Auto-scroll to bottom
        setTimeout(() => {
            const chatBody = document.querySelector('.chat-body');
            if (chatBody) {
                chatBody.scrollTop = chatBody.scrollHeight;
            }
        }, 50);

        // If this is the first user message and email not collected, ask for email
        const userMessages = messages.filter(msg => msg.sender === 'user');
        if (userMessages.length === 0 && !isEmailCollected) {
            // Bot asks for email after user's first response
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    text: 'Great! Before we continue, could you please share your email address so we can follow up with you?',
                    sender: 'bot',
                    timestamp: new Date()
                }]);
            }, 800);

            // Update user message status to delivered
            setTimeout(() => {
                setMessages(prev => prev.map(msg =>
                    msg.id === messageId ? { ...msg, status: 'delivered' } : msg
                ));
            }, 300);
            return;
        }

        // Send email with user message
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userMessage: messageText,
                    subject: 'New Message from SystemMindz Website',
                    fromName: 'SystemMindz Website Visitor',
                    fromEmail: userEmail && isValidEmail(userEmail) ? userEmail : null,
                }),
            });

            const result = await response.json();
            if (result.ok) {
                // Update message status to "delivered" (double tick)
                setMessages(prev => prev.map(msg =>
                    msg.id === messageId ? { ...msg, status: 'delivered' } : msg
                ));
            } else {
                // Update message status to "sent" (single tick) even if email failed
                setMessages(prev => prev.map(msg =>
                    msg.id === messageId ? { ...msg, status: 'sent' } : msg
                ));
                console.error('Failed to send email:', result.error);
            }
        } catch (error) {
            // Update message status to "sent" on error
            setMessages(prev => prev.map(msg =>
                msg.id === messageId ? { ...msg, status: 'sent' } : msg
            ));
            console.error('Error sending email:', error);
        }
    };

    return (
        <section className="bg-white py-12 md:py-20 px-5 flex items-center justify-center min-h-[auto] md:min-h-screen border-none">
            <div className="max-w-[1920px] mx-auto grid grid-cols-12 gap-8 md:gap-[clamp(20px,5vw,60px)] items-center px-4 md:px-[6vw]">
                {/* Left Column - Text and Buttons */}
                <div className="col-span-12 lg:col-span-6 text-center lg:text-left">
                    <p className="text-xs sm:text-sm font-semibold text-purple-light uppercase tracking-widest mb-4 md:mb-6 font-montserrat">DIGITAL TRANSFORMATION SOLUTIONS</p>
                    <h1 className="text-[clamp(24px,5vw,48px)] font-bold text-black leading-[1.2] mb-6 md:mb-8 font-oswald">
                        Build <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-light after:to-purple-dark">Scalable</span> Solutions That Drive Growth
                    </h1>
                    <p className="text-sm md:text-base text-[#4b5563] leading-[1.6] mb-6 md:mb-8 font-montserrat font-normal max-w-[540px] mx-auto lg:mx-0">
                        From concept to deployment, we deliver enterprise-grade applications using cutting-edge technologies. Our full-stack expertise in React.js, Spring Boot, and Python enables us to create robust, future-ready platforms that scale with your business. We combine technical excellence with innovative thinking to transform your business challenges into powerful digital solutions.
                    </p>
                    <div className="flex flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8">
                        <button
                            onClick={() => {
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-black text-white border-none py-3 px-6 md:py-3.5 md:px-7 rounded-full text-sm md:text-base font-semibold cursor-pointer flex items-center gap-3 transition-all duration-300 shadow-[0_4px_6px_rgba(0,0,0,0.1)] font-montserrat hover:translate-y-[-2px] hover:shadow-[0_8px_15px_rgba(0,0,0,0.2)] group w-auto justify-center"
                        >
                            Get Started
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">→</span>
                            </span>
                        </button>
                    </div>
                </div>


                <div className="col-span-12 lg:col-span-6 mt-8 lg:mt-0">
                    <div className="flex justify-center items-center w-full relative">
                        <div className="bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col h-[480px] w-full max-w-[440px] border border-black/5 relative">
                            {/* Floating Hearts Animation */}
                            <AnimatePresence>
                                {showHearts && (
                                    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
                                        {Array.from({ length: 15 }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                                                animate={{
                                                    opacity: [0, 1, 0],
                                                    x: (Math.random() - 0.5) * 300,
                                                    y: -Math.random() * 300 - 50,
                                                    scale: [0.5, 1.2, 0.8],
                                                    rotate: (Math.random() - 0.5) * 60
                                                }}
                                                transition={{
                                                    duration: 1.5 + Math.random(),
                                                    ease: "easeOut",
                                                    delay: Math.random() * 0.2
                                                }}
                                                className="absolute bottom-20 left-1/2 text-2xl transform -translate-x-1/2"
                                            >
                                                ❤️
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>
                            <div className="py-3 px-5 bg-white border-b border-black/5 flex items-center justify-between shrink-0">
                                <span className="text-sm font-bold text-[#111827] tracking-[-0.01em]">Chat</span>
                                {likedMessageId && (
                                    <div className="bg-[#f3f4f6] rounded-full px-3 py-1.5 flex items-center gap-1.5">
                                        <span className="text-sm">❤️</span>
                                        <span className="text-xs font-medium text-[#111827]">Liked</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 scroll-smooth chat-body">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex items-end gap-2 mb-2 relative w-full ${message.sender === 'user' ? 'justify-end' : ''}`}
                                    >
                                        {message.sender === 'bot' && (
                                            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-black/5 bg-[#f0f9ff] text-[#0369a1]">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M3.41 22C3.41 18.13 7.26 15 12 15C16.74 15 20.59 18.13 20.59 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className={`py-2 px-3 rounded-[16px] text-xs leading-[1.5] transition-all duration-300 max-w-[85%] relative ${message.sender === 'user' ? (isOnlyEmoji(message.text) ? 'bg-[#ffe4e6] text-[28px] p-1 rounded-br-[4px]' : 'bg-purple-light text-white rounded-bl-[16px] rounded-br-[4px]') : 'bg-[#f3f4f6] text-[#111827] rounded-bl-[4px]'} ${likedMessageId === message.id && message.sender === 'bot' ? 'ring-2 ring-purple-light/20' : ''}`}>
                                            <div className="flex items-end gap-1.5">
                                                <span className="flex-1">
                                                    <TypewriterText text={message.text} messageId={message.id} />
                                                </span>
                                                {message.sender === 'user' && !isOnlyEmoji(message.text) && (
                                                    <span className="flex items-center shrink-0 ml-1 mb-[-2px]">
                                                        {message.status === 'sending' && (
                                                            <span className="text-[9px] text-white/60">...</span>
                                                        )}
                                                        {message.status === 'sent' && (
                                                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M3 8L6 11L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-white/60" />
                                                            </svg>
                                                        )}
                                                        {message.status === 'delivered' && (
                                                            <svg width="12" height="10" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M2 8L5 11L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-white/60" />
                                                                <path d="M6 8L9 11L16 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-white/60" />
                                                            </svg>
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            {likedMessageId === message.id && message.sender === 'bot' && (
                                                <div className="absolute -top-1 -right-1 bg-white shadow-xl rounded-full w-4 h-4 flex items-center justify-center text-[10px] ring-2 ring-black/[0.03]">
                                                    ❤️
                                                </div>
                                            )}
                                        </div>
                                        {message.sender === 'user' && (
                                            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-black/5 bg-[#f0fdf4] text-[#166534]">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M3.41 22C3.41 18.13 7.26 15 12 15C16.74 15 20.59 18.13 20.59 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                <div
                                    className="p-3.5 rounded-[20px] text-sm leading-[1.6] transition-all duration-300 max-w-[75%] relative bg-white shadow-xl border border-black/5 flex items-center justify-center gap-2"
                                    onClick={handleLikeClick}
                                    style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                                >
                                    <span className="text-purple-light text-xs">❤️</span> Liked
                                </div>
                            </div>
                            <div className="p-4 bg-white border-t border-black/5 flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-xl px-2">
                                    <span className="cursor-pointer transition-transform hover:scale-110 block" onClick={() => setInputValue(prev => prev + '👍')}>👍</span>
                                    <span className="cursor-pointer transition-transform hover:scale-110 block" onClick={() => setInputValue(prev => prev + '❤️')}>❤️</span>
                                    <span className="cursor-pointer transition-transform hover:scale-110 block" onClick={() => setInputValue(prev => prev + '😂')}>😂</span>
                                    <span className="cursor-pointer transition-transform hover:scale-110 block" onClick={() => setInputValue(prev => prev + '😍')}>😍</span>
                                    <span className="cursor-pointer transition-transform hover:scale-110 block" onClick={() => setInputValue(prev => prev + '😮')}>😮</span>
                                </div>
                                <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-[#f3f4f6] rounded-[20px] px-4 py-3 border border-transparent transition-all duration-300 focus-within:bg-white focus-within:border-black/10 focus-within:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                                    <input
                                        type="text"
                                        placeholder="Type Your Text"
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-[#111827] placeholder:text-[#9ca3af] py-1"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />
                                    <button type="submit" className="border-none bg-[#020617] text-white cursor-pointer p-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-[#0f172a]">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ChatDemoSection;
