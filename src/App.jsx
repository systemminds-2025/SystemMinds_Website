import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import smartbotImage from './img/PhotoshopExtension_Image.png';
import logoImage from './img/logo.png';
import './index.css';

function App() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMobileNav, setActiveMobileNav] = useState('Home');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [likedMessageId, setLikedMessageId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isEmailCollected, setIsEmailCollected] = useState(false);
  const messagesInitialized = useRef(false);
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



  useEffect(() => {
    // Automatically open the menu smoothly on page load
    setIsNavCollapsed(false);

    // Handle scroll for header blur effect
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



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

  const handleMenuClick = () => {
    // Toggle nav bar collapse/expand
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleArrowClick = (e) => {
    e.stopPropagation(); // Prevent triggering the button click
    handleMenuClick();
  };

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Typewriter effect component
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
              subject: 'New Email Registration from SystemMinds Website',
              fromName: 'SystemMinds Website Visitor',
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

    // Send email with user message
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: messageText,
          subject: 'New Message from SystemMinds Website',
          fromName: 'SystemMinds Website Visitor',
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

  const [showHearts, setShowHearts] = useState(false);

  const isOnlyEmoji = (str) => {
    if (!str) return false;
    const emojiRegex = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|\s)+$/;
    return emojiRegex.test(str);
  };

  const handleLikeClick = () => {
    const botMessages = messages.filter(msg => msg.sender === 'bot');
    if (botMessages.length > 0) {
      const latestBotMessage = botMessages[botMessages.length - 1];
      setLikedMessageId(latestBotMessage.id);
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#f5f5f7] to-[#e5e7eb] flex items-center justify-center py-10 px-5 min-h-[auto]">
        <div className="max-w-[1920px] w-full px-[6vw] py-10 pb-20 relative mx-auto">
          {/* Navigation Container */}
          <div className={`flex items-center justify-between gap-6 m-0 px-5 md:px-12 fixed top-0 left-0 right-0 w-full z-[1000] py-5 transition-all duration-300 ${isScrolled ? 'bg-[#f5f5f7]/98 backdrop-blur-[40px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-b border-black/10 py-3' : 'bg-transparent'}`}>
            {/* Logo with Text */}
            <div className="flex items-center gap-2 h-11 shrink-0">
              <img src={logoImage} alt="Logo" className="h-10 w-auto object-contain block" />
              <span className="text-[22px] font-semibold text-[#111827] whitespace-nowrap leading-none flex items-center tracking-[0.5px] lowercase">
                <span className="uppercase font-bold text-2xl tracking-wider">S</span>ystem<span className="uppercase font-bold text-2xl tracking-wider">M</span>inds
              </span>
            </div>

            {/* Navigation Bar */}
            <nav className="hidden md:flex items-center justify-end gap-2 bg-white p-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] w-fit flex-nowrap whitespace-nowrap min-h-[60px] box-border relative">
              {/* Menu Items */}
              <div className="flex items-center gap-2 relative">
                <AnimatePresence mode="popLayout">
                  {!isNavCollapsed && (
                    <>
                      <motion.button
                        className="border-none bg-transparent px-4 py-2 text-xs text-[#111827] cursor-pointer transition-opacity duration-200 rounded-full whitespace-nowrap hover:bg-black/5"
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        Product
                      </motion.button>
                      <motion.button
                        className="border-none bg-transparent px-4 py-2 text-xs text-[#111827] cursor-pointer transition-opacity duration-200 rounded-full whitespace-nowrap hover:bg-black/5"
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.05 }}
                      >
                        Solutions
                      </motion.button>
                      <motion.button
                        className="border-none bg-transparent px-4 py-2 text-xs text-[#111827] cursor-pointer transition-opacity duration-200 rounded-full whitespace-nowrap hover:bg-black/5"
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
                      >
                        Agencies
                      </motion.button>
                      <motion.button
                        className="border-none bg-transparent px-4 py-2 text-xs text-[#111827] cursor-pointer transition-opacity duration-200 rounded-full whitespace-nowrap hover:bg-black/5"
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.15 }}
                      >
                        Pricing
                      </motion.button>
                      <motion.button
                        className="border-none bg-transparent px-4 py-2 text-xs text-[#111827] cursor-pointer transition-opacity duration-200 rounded-full whitespace-nowrap hover:bg-black/5"
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.2 }}
                      >
                        Resources
                      </motion.button>
                    </>
                  )}
                </AnimatePresence>
              </div>
              <button className="bg-[#020617] text-white border-none p-2 px-3 rounded-full text-xs font-medium cursor-pointer flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200 hover:translate-y-[-1px] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] shrink-0 relative z-10" onClick={handleMenuClick}>
                <span className="inline-block">Menu</span>
                <motion.span
                  className="flex items-center justify-center cursor-pointer"
                  onClick={handleArrowClick}
                  animate={{ rotate: isNavCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <span className="w-[18px] h-[18px] rounded-full bg-white text-[#020617] flex items-center justify-center text-[11px] font-bold leading-none transition-all duration-200 hover:scale-110 hover:bg-[#f3f4f6]">→</span>
                </motion.span>
              </button>
            </nav>
          </div>

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
              className="max-w-[800px] flex-1 mt-0 md:mt-5 w-full px-5 md:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.3
              }}
            >
              <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-purple-light uppercase tracking-wider md:tracking-widest mb-3 md:mb-6 font-montserrat text-center md:text-left">TRANSFORM YOUR IDEAS INTO REALITY</p>
              <h1 className="text-[28px] sm:text-[32px] md:text-[clamp(32px,5vw,48px)] font-bold text-black leading-[1.2] mb-4 md:mb-8 font-oswald text-center md:text-left">
                Professional <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-light after:to-purple-dark">Services</span> & Innovative Products
              </h1>
              <p className="text-[13px] sm:text-sm md:text-sm text-[#6b7280] leading-[1.6] mb-3 md:mb-5 font-montserrat font-normal text-center md:text-left">
                SystemMinds is a full-stack digital studio delivering robust products, future-ready platforms, and tailor-made enterprise solutions. We blend strategy, UI engineering, and cloud-native development to accelerate growth for ambitious brands. Our comprehensive approach ensures seamless integration of cutting-edge technologies with business objectives.
              </p>
              <p className="text-xs text-[#6b7280] leading-[1.5] mb-4 md:mb-5 font-montserrat font-normal hidden md:block">
                With expertise spanning React.js, Spring Boot, Python, and modern cloud technologies, we transform complex business challenges into elegant, scalable digital solutions. Our team combines technical excellence with creative problem-solving to deliver products that not only meet today's needs but are built to evolve with your business. From initial consultation to post-launch support, we provide end-to-end services that drive measurable results and sustainable growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOTTOM CONTENT SECTION */}
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
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8">
              <button className="bg-black text-white border-none py-3 px-6 md:py-3.5 md:px-7 rounded-xl text-sm md:text-base font-semibold cursor-pointer flex items-center gap-3 transition-all duration-300 shadow-[0_4px_6px_rgba(0,0,0,0.1)] font-montserrat hover:translate-y-[-2px] hover:shadow-[0_8px_15px_rgba(0,0,0,0.2)] group w-full sm:w-auto justify-center">
                Get Started
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">→</span>
                </span>
              </button>
              <a href="#" className="text-sm md:text-base font-semibold text-black no-underline transition-colors duration-200 hover:text-purple-light font-montserrat">Get Free Demo</a>
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
                <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 scroll-smooth">
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
                            {message.text}
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
                    style={{ cursor: 'pointer' }}
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

      {/* TRANSFORM SECTION */}
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
                <a href="#" className="inline-flex items-center text-sm font-semibold text-purple-light no-underline transition-all duration-200 font-montserrat hover:translate-x-1">View Project →</a>
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
                <a href="#" className="inline-flex items-center text-sm font-semibold text-purple-light no-underline transition-all duration-200 font-montserrat hover:translate-x-1">View Project →</a>
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
              <h3 className="text-xl font-bold text-[#111827] mb-4 font-oswald tracking-tight leading-[1.3]">AI Resume Generator</h3>
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
                <a href="#" className="inline-flex items-center text-sm font-semibold text-purple-light no-underline transition-all duration-200 font-montserrat hover:translate-x-1">View Project →</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STAY CONNECTED SECTION */}
      <section className="bg-white py-20 flex items-center justify-center min-h-[50vh] border-none">
        <div className="max-w-[1920px] mx-auto px-5 md:px-[6vw] grid grid-cols-12 gap-6 items-stretch w-full">
          {/* Content Box - Text and Social Icons (No visible box UI) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-start">
            <p className="text-sm font-semibold text-purple-light uppercase tracking-widest mb-6 font-montserrat">CONNECT WITH US</p>
            <h2 className="text-[clamp(32px,5vw,36px)] font-bold text-[#111827] leading-[1.2] mb-5 tracking-tight font-oswald">
              Stay connected across every place your audience exists.
            </h2>
            <p className="text-base text-[#4b5563] leading-[1.6] mb-8 font-montserrat font-normal max-w-[400px]">
              Reach out and connect with us on social media. Follow us to stay updated with our latest innovations, projects, and insights. We'd love to hear from you!
            </p>
            <div className="flex items-center gap-4 mb-10">
              <a href="https://www.instagram.com/systemminds.tech/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110" aria-label="Instagram">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#833AB4" />
                      <stop offset="50%" stopColor="#FD1D1D" />
                      <stop offset="100%" stopColor="#FCB045" />
                    </linearGradient>
                  </defs>
                  <rect width="24" height="24" rx="6" fill="url(#instagramGradient)" />
                  <rect x="5" y="5" width="14" height="14" rx="3" stroke="white" strokeWidth="1.5" fill="none" />
                  <circle cx="12" cy="12" r="3.5" stroke="white" strokeWidth="1.5" fill="none" />
                  <circle cx="17.5" cy="6.5" r="1" fill="white" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/systemminds/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110" aria-label="LinkedIn">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="4" fill="#0077B5" />
                  <path d="M8 9H5V19H8V9ZM6.5 7C7.32843 7 8 6.32843 8 5.5C8 4.67157 7.32843 4 6.5 4C5.67157 4 5 4.67157 5 5.5C5 6.32843 5.67157 7 6.5 7Z" fill="white" />
                  <path d="M10 9H13V10.5C13.5 9.5 14.5 9 15.5 9C17.5 9 19 10.5 19 13V19H16V13.5C16 12.5 15.5 12 14.5 12C13.5 12 13 12.5 13 13.5V19H10V9Z" fill="white" />
                </svg>
              </a>
              <a href="https://chat.whatsapp.com/CJy8YPpWarEGzi9uAfbnoT" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110" aria-label="WhatsApp">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" fill="#25D366" />
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="white" />
                </svg>
              </a>
              <a href="https://t.me/+g8kOiqBYvXE3NzJl" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110" aria-label="Telegram">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" fill="#0088CC" />
                  <path d="M17.47 7.28L5.74 12.07C5.16 12.29 5.17 12.64 5.64 12.76L8.28 13.5L15.64 9.06C15.95 8.87 16.23 8.97 16 9.19L9.74 15.14L9.52 17.28C9.76 17.28 9.87 17.18 10.02 17.04L11.48 15.65L14.74 18.01C15.21 18.26 15.5 18.13 15.63 17.57L17.95 8.15C18.13 7.45 17.75 7.16 17.47 7.28Z" fill="white" />
                </svg>
              </a>
            </div>
          </div>

          {/* Cards Box - All 4 Social Media Cards */}
          <div className="col-span-12 lg:col-span-8">
            {/* Desktop View - Static Cards */}
            <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 gap-6">
              <a href="https://www.linkedin.com/company/systemminds" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.03] transition-all duration-300 flex flex-col gap-5 h-full hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-purple-light/20" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] rounded-2xl bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5]">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="11" fill="#0077B5" />
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="text-base font-bold text-[#111827] tracking-tight font-oswald">SystemMinds</div>
                    <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">LinkedIn Company Page</span>
                  </div>
                </div>
                <p className="text-sm text-[#4b5563] leading-[1.6] m-0 font-sans py-2">
                  Connect with us on LinkedIn for latest innovations and industry updates.
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <button className="bg-[#0077b5] text-white hover:bg-[#00669c] shadow-[0_4px_12px_rgba(0,119,181,0.2)] border-none rounded-full px-5 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 font-montserrat flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
                      <path d="M19 13h-3v3h-2v-3H11v-2h3V8h2v3h3v2zM20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12z" fill="currentColor" />
                    </svg>
                    Connect
                  </button>
                  <button className="bg-[#f3f4f6] text-[#4b5563] hover:bg-[#e5e7eb] border-none rounded-full px-5 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 font-montserrat flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
                    </svg>
                    Follow
                  </button>
                </div>
              </a>
              <a href="https://chat.whatsapp.com/CJy8YPpWarEGzi9uAfbnoT" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.03] transition-all duration-300 flex flex-col gap-5 h-full hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-purple-light/20" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] rounded-2xl bg-[#25d366]/10 flex items-center justify-center text-[#25d366]">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="11" fill="#25D366" />
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="white" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="text-base font-bold text-[#111827] tracking-tight font-oswald">SystemMinds</div>
                    <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">WhatsApp Group Invite</span>
                  </div>
                </div>
                <p className="text-sm text-[#4b5563] leading-[1.6] m-0 font-sans py-2">
                  Join our WhatsApp community for latest news, updates and team engagement.
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <button className="bg-[#25d366] text-white hover:bg-[#20bd5a] shadow-[0_4px_12px_rgba(37,211,102,0.2)] border-none rounded-full px-5 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 font-montserrat flex items-center justify-center">Join Chat</button>
                </div>
              </a>
              <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.03] transition-all duration-300 flex flex-col gap-5 h-full hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-purple-light/20">
                <a href="https://www.instagram.com/systemminds.tech/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
                  <div className="flex items-center gap-4">
                    <img src={logoImage} alt="SystemMinds Logo" className="w-10 h-10 rounded-xl object-contain border border-black/5" />
                    <div className="flex flex-col gap-0.5">
                      <div className="text-base font-bold text-[#111827] tracking-tight font-oswald">systemminds.tech</div>
                      <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">SystemMinds IT Solutions</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#4b5563] leading-[1.6] m-0 font-sans py-2">
                    We bring your vision to life with creativity and innovation, helping your business grow.
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <button className="bg-[#f3f4f6] text-[#4b5563] hover:bg-[#e5e7eb] border-none rounded-full px-5 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 font-montserrat flex items-center justify-center">Follow</button>
                    <button className="bg-purple-light text-white hover:bg-purple-dark shadow-[0_4px_12px_rgba(139,92,246,0.2)] border-none rounded-full px-5 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 font-montserrat flex items-center justify-center">Message</button>
                  </div>
                </a>
              </div>
              <a href="https://t.me/+g8kOiqBYvXE3NzJl" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.03] transition-all duration-300 flex flex-col gap-5 h-full hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-purple-light/20" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] rounded-2xl bg-[#0088cc]/10 flex items-center justify-center text-[#0088cc]">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="11" fill="#0088cc" />
                      <path d="M17.47 7.28L5.74 12.07C5.16 12.29 5.17 12.64 5.64 12.76L8.28 13.5L15.64 9.06C15.95 8.87 16.23 8.97 16 9.19L9.74 15.14L9.52 17.28C9.76 17.28 9.87 17.18 10.02 17.04L11.48 15.65L14.74 18.01C15.21 18.26 15.5 18.13 15.63 17.57L17.95 8.15C18.13 7.45 17.75 7.16 17.47 7.28Z" fill="white" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="text-base font-bold text-[#111827] tracking-tight font-oswald">SystemMinds</div>
                    <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">Telegram Channel</span>
                  </div>
                </div>
                <p className="text-sm text-[#4b5563] leading-[1.6] m-0 font-sans py-2">
                  Join our Telegram channel for instant updates and direct communication.
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <button className="bg-[#25d366] text-white hover:bg-[#20bd5a] shadow-[0_4px_12px_rgba(37,211,102,0.2)] border-none rounded-full px-5 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 font-montserrat flex items-center justify-center">Join Channel</button>
                </div>
              </a>
            </div>

            {/* Mobile View - Vertical Stacked Cards */}
            <div className="lg:hidden mt-10 flex flex-col gap-6">
              {/* LinkedIn Card */}
              <a href="https://www.linkedin.com/company/systemminds" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.03] transition-all duration-300 flex flex-col gap-5 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-purple-light/20" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-2xl bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5]">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="11" fill="#0077B5" />
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="text-base font-bold text-[#111827] tracking-tight font-oswald">SystemMinds</div>
                    <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">LinkedIn Company Page</span>
                  </div>
                </div>
                <p className="text-sm text-[#4b5563] leading-[1.6] m-0 font-sans py-2">
                  Connect with us on LinkedIn to stay updated with our latest innovations, projects, and professional insights.
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <button className="bg-[#0077b5] text-white hover:bg-[#00669c] shadow-[0_4px_12px_rgba(0,119,181,0.2)] border-none rounded-full px-5 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 font-montserrat flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
                      <path d="M19 13h-3v3h-2v-3H11v-2h3V8h2v3h3v2zM20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12z" fill="currentColor" />
                    </svg>
                    Connect
                  </button>
                  <button className="bg-[#f3f4f6] text-[#4b5563] hover:bg-[#e5e7eb] border-none rounded-full px-5 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 font-montserrat flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
                    </svg>
                    Follow
                  </button>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a href="https://chat.whatsapp.com/CJy8YPpWarEGzi9uAfbnoT" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.03] transition-all duration-300 flex flex-col gap-5 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-purple-light/20" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-2xl bg-[#25d366]/10 flex items-center justify-center text-[#25d366]">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="11" fill="#25D366" />
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="white" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="text-base font-bold text-[#111827] tracking-tight font-oswald">SystemMinds</div>
                    <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">WhatsApp Group Invite</span>
                  </div>
                </div>
                <p className="text-sm text-[#4b5563] leading-[1.6] m-0 font-sans py-2">
                  Join our WhatsApp community to stay connected, get updates, and engage with our team.
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <button className="bg-[#25d366] text-white hover:bg-[#20bd5a] shadow-[0_4px_12px_rgba(37,211,102,0.2)] border-none rounded-full px-5 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 font-montserrat flex items-center justify-center">Join Chat</button>
                </div>
              </a>

              {/* Instagram Card */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.03] transition-all duration-300 flex flex-col gap-5 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-purple-light/20">
                <a href="https://www.instagram.com/systemminds.tech/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
                  <div className="flex items-center gap-4">
                    <img src={logoImage} alt="SystemMinds Logo" className="w-12 h-12 rounded-xl object-contain border border-black/5" />
                    <div className="flex flex-col gap-0.5">
                      <div className="text-base font-bold text-[#111827] tracking-tight font-oswald">systemminds.tech</div>
                      <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">SystemMinds IT Solutions</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#4b5563] leading-[1.6] m-0 font-sans py-2">
                    We turn your ideas into powerful digital solutions with creativity and innovation.
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <button className="bg-[#f3f4f6] text-[#4b5563] hover:bg-[#e5e7eb] border-none rounded-full px-5 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 font-montserrat flex items-center justify-center">Follow</button>
                    <button className="bg-purple-light text-white hover:bg-purple-dark shadow-[0_4px_12px_rgba(139,92,246,0.2)] border-none rounded-full px-5 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 font-montserrat flex items-center justify-center">Message</button>
                  </div>
                </a>
              </div>

              {/* Telegram Card */}
              <a href="https://t.me/+g8kOiqBYvXE3NzJl" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.03] transition-all duration-300 flex flex-col gap-5 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-purple-light/20" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-2xl bg-[#0088cc]/10 flex items-center justify-center text-[#0088cc]">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="11" fill="#0088cc" />
                      <path d="M17.47 7.28L5.74 12.07C5.16 12.29 5.17 12.64 5.64 12.76L8.28 13.5L15.64 9.06C15.95 8.87 16.23 8.97 16 9.19L9.74 15.14L9.52 17.28C9.76 17.28 9.87 17.18 10.02 17.04L11.48 15.65L14.74 18.01C15.21 18.26 15.5 18.13 15.63 17.57L17.95 8.15C18.13 7.45 17.75 7.16 17.47 7.28Z" fill="white" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="text-base font-bold text-[#111827] tracking-tight font-oswald">SystemMinds</div>
                    <span className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">Telegram Channel</span>
                  </div>
                </div>
                <p className="text-sm text-[#4b5563] leading-[1.6] m-0 font-sans py-2">
                  Join our Telegram channel for instant updates and direct communication.
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <button className="bg-[#25d366] text-white hover:bg-[#20bd5a] shadow-[0_4px_12px_rgba(37,211,102,0.2)] border-none rounded-full px-5 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 font-montserrat flex items-center justify-center">Join Channel</button>
                </div>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ROBOT CENTER SECTION */}
      <section className="bg-[#e5e7eb] py-[100px] px-5 min-h-[80vh] relative overflow-hidden flex items-center justify-center">
        <div className="max-w-[1920px] mx-auto px-[6vw] relative h-[600px] flex items-center justify-center w-full">
          {/* Social Media Icons */}
          <a href="https://www.instagram.com/systemminds.tech/" target="_blank" rel="noopener noreferrer" className="absolute z-[3] top-[30%] left-[25%] sm:left-[30%] md:left-[38%] w-7 h-7 sm:w-9 sm:h-9 lg:w-12 lg:h-12 bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-xl shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f09433" />
                  <stop offset="50%" stopColor="#e6683c" />
                  <stop offset="100%" stopColor="#dc2743" />
                </linearGradient>
              </defs>
              <rect width="24" height="24" rx="5" fill="url(#instagramGradient)" />
              <rect x="6" y="6" width="12" height="12" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
              <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="none" />
              <circle cx="17" cy="7" r="1" fill="white" />
            </svg>
          </a>

          <a href="https://chat.whatsapp.com/CJy8YPpWarEGzi9uAfbnoT" target="_blank" rel="noopener noreferrer" className="absolute z-[3] top-[58%] left-[25%] sm:left-[30%] md:left-[38%] -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#25D366" />
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="white" />
            </svg>
          </a>

          <a href="https://t.me/+g8kOiqBYvXE3NzJl" target="_blank" rel="noopener noreferrer" className="absolute z-[3] top-[58%] right-[25%] sm:right-[30%] md:right-[38%] -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#0088CC" />
              <path d="M17.47 7.28L5.74 12.07C5.16 12.29 5.17 12.64 5.64 12.76L8.28 13.5L15.64 9.06C15.95 8.87 16.23 8.97 16 9.19L9.74 15.14L9.52 17.28C9.76 17.28 9.87 17.18 10.02 17.04L11.48 15.65L14.74 18.01C15.21 18.26 15.5 18.13 15.63 17.57L17.95 8.15C18.13 7.45 17.75 7.16 17.47 7.28Z" fill="white" />
            </svg>
          </a>

          <a href="https://www.linkedin.com/company/systemminds/" target="_blank" rel="noopener noreferrer" className="absolute z-[3] top-[30%] right-[25%] sm:right-[30%] md:right-[38%] w-7 h-7 sm:w-9 sm:h-9 lg:w-12 lg:h-12 bg-[#0077b5] rounded-xl shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="5" fill="#0077B5" />
              <path d="M8 9H5V19H8V9ZM6.5 7C7.32843 7 8 6.32843 8 5.5C8 4.67157 7.32843 4 6.5 4C5.67157 4 5 4.67157 5 5.5C5 6.32843 5.67157 7 6.5 7Z" fill="white" />
              <path d="M10 9H13V10.5C13.5 9.5 14.5 9 15.5 9C17.5 9 19 10.5 19 13V19H16V13.5C16 12.5 15.5 12 14.5 12C13.5 12 13 12.5 13 13.5V19H10V9Z" fill="white" />
            </svg>
          </a>

          {/* UI Cards */}
          <motion.div
            className="absolute top-[10%] left-[15%] sm:left-[20%] md:left-[25%] bg-white p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl shadow-lg flex items-center gap-2 sm:gap-3 z-[1] -rotate-[5deg]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z" fill="currentColor" />
                <path d="M13 10l-3 3h3v-3z" fill="white" />
                <path d="M13 10v3h3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-700 font-montserrat">Cloud Server</span>
          </motion.div>

          <motion.div
            className="absolute bottom-[15%] left-[15%] sm:left-[20%] md:left-[25%] bg-white p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl shadow-lg flex items-center gap-2 sm:gap-3 z-[1] rotate-[5deg]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M12 12l-2-1v2l2 1 2-1v-2l-2 1z" fill="white" />
              </svg>
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-700 font-montserrat">Collaboration</span>
          </motion.div>

          <motion.div
            className="absolute top-[10%] right-[15%] sm:right-[20%] md:right-[25%] bg-white p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl shadow-lg flex items-center gap-2 sm:gap-3 z-[1] rotate-[5deg]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 4l1.5 1.5M20 12l-1.5 1.5M12 20l-1.5-1.5M4 12l1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-700 font-montserrat">Tracking</span>
          </motion.div>

          <motion.div
            className="absolute bottom-[15%] right-[15%] sm:right-[20%] md:right-[25%] bg-white p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl shadow-lg flex items-center gap-2 sm:gap-3 z-[1] -rotate-[5deg]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2.1 }}
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                <rect x="8" y="8" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="15" cy="9" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-700 font-montserrat">Operation</span>
          </motion.div>

          {/* Robot Character */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]">
            <motion.img
              src={smartbotImage}
              alt="Robot Character"
              className="w-[120px] sm:w-[150px] lg:w-[220px] h-auto object-contain block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </section>

      {/* BUSINESS DASHBOARD SECTION */}
      <section className="bg-white py-[100px] px-5 border-t border-[#e5e7eb] overflow-hidden">
        <div className="max-w-[1920px] mx-auto px-[6vw] grid grid-cols-1 lg:grid-cols-2 gap-[clamp(20px,5vw,60px)] items-center">
          {/* Left Column - Text and CTA */}
          <div className="col-span-1 lg:col-span-1 py-10 lg:pr-14">
            <h2 className="text-[clamp(28px,5vw,42px)] font-bold leading-[1.2] text-[#111827] mb-5 tracking-[-0.02em] font-oswald capitalize">
              Make BUsiness Decision That help you grow
            </h2>
            <p className="text-[15px] leading-[1.6] text-[#6b7280] mb-8 font-montserrat">
              Manage All Your Social Channels, Ensure Customer Supremacy Engagement, Track Your Performance And More—All From A Single Platform
            </p>
            <button className="bg-gradient-to-b from-gray-800 to-gray-900 text-white border-none py-3.5 pl-6 pr-5 rounded-full text-base font-semibold cursor-pointer shadow-lg flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl group font-montserrat">
              Get Started
              <span className="bg-white/20 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>

          {/* Right Column - Dashboard Graphic */}
          <div className="col-span-1 lg:col-span-1 relative">
            <div className="bg-[#f9fafb] rounded-[24px] p-6 lg:p-8 w-full max-w-[500px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] mx-auto lg:ml-auto">
              <div className="flex flex-col sm:flex-row gap-6 items-center mb-0">
                <div className="flex items-start gap-3 flex-1 w-full sm:w-auto">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.05)] text-[#111827]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" fill="#111827" />
                      <path d="M9 8H15V10H9V8ZM9 12H15V14H9V12ZM9 16H13V18H9V16Z" fill="#111827" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-lg font-bold text-[#111827] font-oswald tracking-tight">25000 USD</div>
                    <div className="text-xs text-[#6b7280] font-semibold uppercase tracking-wider font-montserrat">Total Sales</div>
                  </div>
                </div>
                <div className="hidden sm:block w-[1px] h-[50px] bg-[#e5e7eb] shrink-0"></div>
                <div className="flex items-start gap-3 flex-1 w-full sm:w-auto">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.05)] text-[#111827]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="#111827" strokeWidth="1.5" fill="none" />
                      <path d="M12 2L12 12L20 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                      <path d="M12 12L12 22L4 22" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-lg font-bold text-[#111827] font-oswald tracking-tight">22000 USD</div>
                    <div className="text-xs text-[#6b7280] font-semibold uppercase tracking-wider font-montserrat">Total Expenses</div>
                  </div>
                </div>
              </div>

              {/* Revenue Chart Box */}
              {/* Revenue Chart Box */}
              <div className="bg-white rounded-2xl p-6 mt-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/50">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-base font-bold text-[#111827] font-oswald">Revenue</span>
                  <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">(+13%)</span>
                  <span className="flex items-center gap-2 text-xs text-[#6b7280] font-medium font-montserrat">
                    <span className="w-2 h-2 rounded-full bg-[#111827]"></span>
                    This Year
                  </span>
                </div>
                <div className="relative h-[150px] w-full flex items-end justify-between px-2 pb-5 border-b border-[#f3f4f6]">
                  <div className="flex items-end justify-between w-full h-full gap-2 sm:gap-4">
                    <div className="w-full bg-[#f3f4f6] rounded-t-sm hover:bg-[#e5e7eb] transition-colors" style={{ height: '50%' }}></div>
                    <div className="w-full bg-[#f3f4f6] rounded-t-sm hover:bg-[#e5e7eb] transition-colors" style={{ height: '60%' }}></div>
                    <div className="w-full bg-[#f3f4f6] rounded-t-sm hover:bg-[#e5e7eb] transition-colors" style={{ height: '45%' }}></div>
                    <div className="w-full bg-[#111827] rounded-t-sm relative group cursor-pointer" style={{ height: '100%' }}>
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111827] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="w-full bg-[#f3f4f6] rounded-t-sm hover:bg-[#e5e7eb] transition-colors" style={{ height: '55%' }}></div>
                    <div className="w-full bg-[#f3f4f6] rounded-t-sm hover:bg-[#e5e7eb] transition-colors" style={{ height: '65%' }}></div>
                  </div>
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#e5e7eb] border-t border-dashed border-[#9ca3af]/50 -z-10 flex items-center">
                    <div className="bg-white pr-2 text-[10px] text-[#9ca3af] font-medium pl-1">2025 Avg</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAUNCH JOURNEY SECTION */}
      <section className="bg-white py-[100px] px-5 border-t border-[#e5e7eb]">
        <div className="max-w-[1920px] mx-auto px-[6vw]">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold leading-[1.2] text-[#111827] mb-6 tracking-tight font-oswald">Launch your journey in three quick and simple steps</h2>
            <p className="text-[16px] leading-[1.6] text-[#6b7280] font-montserrat">
              Begin Your Journey In Three Easy Steps That Guide You From Setup To Full Usage In Minutes, Giving You A Fast, Intuitive Start Without The Typical..
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1 */}
            <div className="bg-[#f9fafb] rounded-[24px] p-8 lg:p-10 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] border border-transparent hover:border-black/5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-[#bfdbfe] text-blue-700">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M16 8h4M18 6v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-3 font-oswald">Create Your Free Account</h3>
              <p className="text-base text-[#6b7280] leading-[1.6] font-montserrat">
                Sign Up For Free And Unlock Instant Access..
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#f9fafb] rounded-[24px] p-8 lg:p-10 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] border border-transparent hover:border-black/5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-[#fde68a] text-yellow-700">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="2" fill="white" />
                  <circle cx="6" cy="6" r="2" fill="white" />
                  <circle cx="18" cy="6" r="2" fill="white" />
                  <circle cx="6" cy="18" r="2" fill="white" />
                  <circle cx="18" cy="18" r="2" fill="white" />
                  <path d="M12 10L6 6M12 10L18 6M12 14L6 18M12 14L18 18M10 12L6 6M14 12L18 6M10 12L6 18M14 12L18 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-3 font-oswald">Sync all your channels effortlessly</h3>
              <p className="text-base text-[#6b7280] leading-[1.6] font-montserrat">
                Link Every Channel You Use To Create A Smooth.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#f9fafb] rounded-[24px] p-8 lg:p-10 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] border border-transparent hover:border-black/5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-[#bbf7d0] text-green-700">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
                  <circle cx="12" cy="12" r="3" fill="white" />
                  <path d="M12 2L12 6M12 18L12 22M2 12L6 12M18 12L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="journey-card-title">Launch your experience in minutes with a fast</h3>
              <p className="journey-card-description">
                Get Everything Ready And Go Live In Minutes.
              </p>
            </div>

            {/* Card 4 */}
            <div className="journey-card">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-[#e9d5ff] text-purple-700">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 10c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M8 14c0 2.21 1.79 4 4 4s4-1.79 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M12 8L14 10L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <h3 className="journey-card-title">Transform the Way You Converse</h3>
              <p className="journey-card-description">
                Your Greatest Conversations By Transforming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AUTOMATION FEATURES SECTION */}
      <section className="bg-white py-[100px] px-5 border-t border-[#e5e7eb]">
        <div className="max-w-[1920px] mx-auto px-[6vw]">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <h2 className="text-[clamp(28px,5vw,42px)] font-bold leading-[1.2] text-[#111827] mb-4 tracking-tight font-oswald">From Hello to High Conversions</h2>
            <p className="text-[16px] leading-[1.6] text-[#6b7280] font-montserrat">
              Launch Fast With Ready Automations Or Build Your Own Flows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#f9fafb] rounded-[24px] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)] mb-0 flex-1 flex flex-col items-stretch overflow-hidden border border-black/[0.03] min-h-[360px]">
                <div className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] overflow-hidden flex-1 flex flex-col shadow-sm relative h-full">
                  <div className="bg-white border-b border-[#e5e7eb] px-4 py-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">Today</span>
                  </div>
                  <div className="p-4 flex flex-col gap-3 h-full bg-white overflow-y-auto">
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
                      <div className="h-3 bg-gray-200 rounded flex-1"></div>
                      <button className="bg-gray-200 text-gray-900 border-none px-4 py-1.5 rounded-md text-xs font-medium cursor-pointer shrink-0 whitespace-nowrap">Follow Back</button>
                    </div>
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="h-3 bg-gray-200 rounded flex-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/5"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="h-3 bg-gray-200 rounded flex-1"></div>
                        <div className="today-text-placeholder short"></div>
                      </div>
                      <div className="w-6 h-6 bg-gray-200 rounded shrink-0"></div>
                    </div>
                    <div className="today-list-item">
                      <div className="today-avatar-placeholder"></div>
                      <div className="today-text-placeholder-group">
                        <div className="today-text-placeholder"></div>
                        <div className="today-text-placeholder short"></div>
                      </div>
                    </div>
                    <div className="today-list-item">
                      <div className="today-avatar-placeholder"></div>
                      <div className="today-text-placeholder"></div>
                      <div className="w-6 h-6 bg-gray-200 rounded shrink-0"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#111827] font-oswald mb-2">Greet your new followers with ease</h3>
              <p className="text-sm text-[#6b7280] leading-[1.6] font-montserrat">
                Make Every New Follower Feel Welcomed With Instant, Friendly Greetings.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#f9fafb] rounded-[24px] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)] mb-0 flex-1 flex flex-col items-stretch overflow-hidden border border-black/[0.03] min-h-[360px]">
                <div className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] overflow-hidden flex-1 flex flex-col shadow-sm relative h-full">
                  <div className="bg-white border-b border-[#e5e7eb] px-4 py-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">Messages</span>
                  </div>
                  <div className="p-4 flex flex-col gap-3 h-full bg-white justify-end">
                    <div className="flex mb-2 gap-2.5 items-start justify-end">
                      <div className="max-w-[70%] py-2.5 px-3.5 rounded-2xl text-[13px] leading-[1.4] bg-slate-950 text-white rounded-br-sm">Hello!</div>
                    </div>
                    <div className="flex mb-2 gap-2.5 items-start justify-start">
                      <div className="max-w-[70%] py-2.5 px-3.5 rounded-2xl text-[13px] leading-[1.4] bg-gray-100 text-gray-900 rounded-bl-sm">Hi! Welcome! 😊</div>
                    </div>
                    <div className="flex gap-2 mt-auto pt-3 border-t border-[#f3f4f6]">
                      <input type="text" placeholder="Type Your Text" className="flex-1 border border-[#e5e7eb] rounded-lg px-3 py-2 text-[13px] bg-white text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-gray-400" />
                      <button className="w-9 h-9 rounded-lg bg-slate-950 text-white border-none cursor-pointer flex items-center justify-center hover:bg-slate-900 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#111827] font-oswald mb-2">Deliver automatic welcome messages</h3>
              <p className="text-sm text-[#6b7280] leading-[1.6] font-montserrat">
                Send Personalised Welcome Messages That Make Every New Follower Feel Valued.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#f9fafb] rounded-[24px] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)] mb-0 flex-1 flex flex-col items-stretch overflow-hidden border border-black/[0.03] min-h-[360px]">
                <div className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] overflow-hidden flex-1 flex flex-col shadow-sm relative h-full">
                  <div className="flex gap-1 mb-4 px-6 pt-6">
                    <div className="h-1 flex-1 bg-gray-900 rounded-full"></div>
                    <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                    <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                    <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                    <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                  </div>
                  <div className="px-6 mb-4 text-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Question 01</span>
                  </div>
                  <div className="p-6 flex flex-col h-full bg-white justify-center items-center text-center">
                    <div className="bg-gray-50 px-4 py-3 rounded-xl mb-4 max-w-[80%]">
                      <p className="text-sm font-semibold text-gray-900 m-0">How would you like to make change happen?</p>
                    </div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-3">Select Only One</p>
                    <div className="flex flex-col gap-3 w-full max-w-[90%]">
                      <div className="flex items-center gap-3">
                        <div className="w-[18px] h-[18px] rounded-full bg-gray-200 border-2 border-gray-300 shrink-0"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-[18px] h-[18px] rounded-full bg-gray-200 border-2 border-gray-300 shrink-0"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-[18px] h-[18px] rounded-full bg-gray-200 border-2 border-gray-300 shrink-0"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-[18px] h-[18px] rounded-full bg-gray-200 border-2 border-gray-300 shrink-0"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="feature-title">Automate your FAQs with fast, Intelligent</h3>
              <p className="feature-description">
                Give Your Customers Instant Clarity With AI-Powered FAQ Automation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER SECTION */}
      <section className="bg-[#4b5563] py-20 px-5">
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
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-[#2c2c2c] py-[80px] px-5 pb-10 text-white overflow-hidden relative">
        <div className="max-w-[1920px] mx-auto px-[6vw]">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-10">
            {/* Left Side - Company & Products */}
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
              <div className="flex flex-col">
                <h4 className="text-base font-semibold text-white mb-5 font-oswald tracking-wide uppercase">Company</h4>
                <ul className="flex flex-col gap-3 font-montserrat p-0 m-0 list-none">
                  <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors no-underline">About</a></li>
                  <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors no-underline">Careers</a></li>
                  <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors no-underline">Press</a></li>
                  <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors no-underline">Contact Us</a></li>
                  <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors no-underline">System Status</a></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-base font-semibold text-white mb-5 font-oswald tracking-wide uppercase">Products</h4>
                <ul className="flex flex-col gap-3 font-montserrat p-0 m-0 list-none">
                  <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors no-underline">Live Chat</a></li>
                  <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors no-underline">Jiogram</a></li>
                  <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors no-underline">Datasetico</a></li>
                  <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors no-underline">Underline</a></li>
                  <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors no-underline">Keyword</a></li>
                </ul>
              </div>
            </div>

            {/* Right Side - Newsletter */}
            <div className="lg:items-start flex flex-col">
              <div className="w-full max-w-md">
                <h4 className="text-base font-semibold text-white mb-5 font-oswald tracking-wide uppercase">Newsletter</h4>
                <div className="flex gap-2">
                  <input type="email" placeholder="Enter Your Email" className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-white/40 flex-1 font-montserrat text-sm" />
                  <button className="bg-white text-[#2c2c2c] px-4 py-2 rounded-lg font-semibold cursor-pointer hover:bg-gray-100 transition-colors font-montserrat text-sm">Submit</button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 mb-10">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor" />
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 5.58 2 10c0 2.14 1.08 4.05 2.78 5.41L4 20l4.9-2.61C10.17 17.85 11.05 18 12 18c5.52 0 10-3.58 10-8s-4.48-8-10-8z" fill="currentColor" />
                <path d="M9.5 9h5v1.5h-5V9zm0 2.5h5V13h-5v-1.5z" fill="white" />
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M9 7h3.5c2 0 3.5 1.5 3.5 3.5S14.5 14 12.5 14H9V7zm0 0v10" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="18" cy="6" r="1.5" fill="currentColor" />
              </svg>
            </a>
          </div>

          {/* Main Logo */}
          <div className="relative py-10 md:py-20 overflow-hidden">
            <h1 className="text-[clamp(60px,12vw,180px)] font-bold font-oswald leading-none tracking-tighter text-white/5 select-none relative z-0 flex items-center justify-center lg:justify-start whitespace-nowrap">
              SYSTEM MIN<span className="text-white/10">D</span>
              <div className="relative w-[80px] md:w-[150px] mx-2 md:mx-4">
                <img src={smartbotImage} alt="SmartBot Character" className="w-full h-auto object-contain animate-float" />
              </div>
              <span className="text-white/10">S</span><sup className="text-2xl md:text-5xl mt-4 md:mt-10 ml-2">®</sup>
            </h1>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors no-underline font-montserrat">Term & Condition</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors no-underline font-montserrat">Privacy Policy</a>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 m-0 font-montserrat">© 2025, Smartbot. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
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
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </button>
        <button
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeMobileNav === 'Service' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          onClick={() => setActiveMobileNav('Service')}
        >
          <div className={`w-6 h-6 flex items-center justify-center ${activeMobileNav === 'Service' ? 'bg-white/10 rounded-lg p-1' : ''}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </button>
        <button
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeMobileNav === 'Work' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          onClick={() => setActiveMobileNav('Work')}
        >
          <div className={`w-6 h-6 flex items-center justify-center ${activeMobileNav === 'Work' ? 'bg-white/10 rounded-lg p-1' : ''}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </button>
        <button
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeMobileNav === 'Contact' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          onClick={() => setActiveMobileNav('Contact')}
        >
          <div className={`w-6 h-6 flex items-center justify-center ${activeMobileNav === 'Contact' ? 'bg-white/10 rounded-lg p-1' : ''}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </button>
      </nav>
    </div>
  );
}

export default App;
