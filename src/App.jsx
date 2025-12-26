import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import smartbotImage from './img/PhotoshopExtension_Image.png';
import logoImage from './img/logo.png';
import imgInterview from './img/about-interview.png';
import imgAssessment from './img/about-assessment.png';
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

  // Social Cards State
  const [activeSocialIndex, setActiveSocialIndex] = useState(0);
  const [isHoveringSocial, setIsHoveringSocial] = useState(false);
  const [isMobileSocial, setIsMobileSocial] = useState(false);

  // Social Media Cards Data
  const socialCards = [
    {
      title: "SystemMinds",
      description: "Follow our LinkedIn Company Page for latest innovations and industry updates.",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      link: "https://www.linkedin.com/company/systemminds",
      color: "#0077b5",
      buttonText: "Connect",
      gradient: "linear-gradient(145deg, #111827 0%, #1f2937 100%)"
    },
    {
      title: "SystemMinds",
      description: "Join our WhatsApp Community for latest news, updates and team engagement.",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      link: "https://chat.whatsapp.com/CJy8YPpWarEGzi9uAfbnoT",
      color: "#25d366",
      buttonText: "Join Chat",
      gradient: "linear-gradient(145deg, #111827 0%, #1f2937 100%)"
    },
    {
      title: "systemminds.tech",
      description: "Follow us on Instagram. We bring your vision to life with creativity and innovation.",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      link: "https://www.instagram.com/systemminds.tech/",
      color: "#d62976",
      buttonText: "Follow",
      gradient: "linear-gradient(145deg, #111827 0%, #1f2937 100%)"
    },
    {
      title: "SystemMinds",
      description: "Join our Telegram Channel for instant updates and direct communication.",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      link: "https://t.me/+g8kOiqBYvXE3NzJl",
      color: "#0088cc",
      buttonText: "Join Channel",
      gradient: "linear-gradient(145deg, #111827 0%, #1f2937 100%)"
    }
  ];

  useEffect(() => {
    const checkMobileSocial = () => {
      setIsMobileSocial(window.innerWidth < 768);
    };
    checkMobileSocial();
    window.addEventListener('resize', checkMobileSocial);
    return () => window.removeEventListener('resize', checkMobileSocial);
  }, []);

  // Auto-swap functionality for Social Cards
  useEffect(() => {
    if (isHoveringSocial) return;
    const interval = setInterval(() => {
      setActiveSocialIndex((prev) => (prev + 1) % socialCards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHoveringSocial, socialCards.length]);

  const getSocialPosition = (index) => {
    let position = index - activeSocialIndex;
    const halfLength = Math.floor(socialCards.length / 2);
    if (position > halfLength) position -= socialCards.length;
    if (position < -halfLength) position += socialCards.length;
    return position;
  };
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

  const serviceTags = [
    { label: "API Implementation", position: { top: '20%', left: '20%' }, delay: 0 },
    { label: "UI/UX Design", position: { top: '25%', right: '20%' }, delay: 0.5 },
    { label: "Web Application", position: { top: '50%', left: '10%' }, delay: 1 },
    { label: "Mobile Apps", position: { top: '50%', right: '10%' }, delay: 1.5 },
    { label: "Database", position: { bottom: '25%', left: '25%' }, delay: 2 },
    { label: "Cloud Deployment", position: { bottom: '20%', right: '25%' }, delay: 0.8 },
    { label: "AI Integration", position: { top: '10%', left: '45%' }, delay: 1.2 },
    { label: "DevOps", position: { bottom: '10%', left: '45%' }, delay: 1.8 },
    { label: "Security", position: { top: '35%', left: '5%' }, delay: 2.2 },
    { label: "Scalable Arch", position: { top: '35%', right: '5%' }, delay: 2.5 },
  ];

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
      <section className="bg-gradient-to-b from-[#f5f5f7] to-[#e5e7eb] flex items-center justify-center py-10 px-5 min-h-screen">
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

      {/* CONNECT WITH US SECTION */}
      <section
        className="relative py-24 md:py-32 bg-white overflow-hidden flex flex-col items-center justify-center min-h-screen"
        id="contact"
      >
        <div className="max-w-[1920px] mx-auto px-[6vw] relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text */}
            <div className="text-left z-20">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs sm:text-sm font-semibold text-purple-light uppercase tracking-widest mb-4 md:mb-6 font-montserrat block"
              >
                CONNECT WITH US
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[clamp(28px,5vw,42px)] font-bold text-[#111827] leading-[1.2] mb-6 md:mb-8 font-oswald"
              >
                Stay connected across every place your audience exists.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm md:text-base text-[#4b5563] leading-[1.6] mb-6 md:mb-8 font-montserrat font-normal max-w-xl"
              >
                Reach out and connect with us on social media. Follow us to stay updated with our latest innovations, projects, and insights. We'd love to hear from you!
              </motion.p>
            </div>

            {/* Right Column - Social Cards Fan Area */}
            <div className="relative flex flex-col items-center justify-center">
              <div
                className="relative w-full h-[360px] md:h-[450px] flex justify-center items-start perspective-1000"
                onMouseEnter={() => setIsHoveringSocial(true)}
                onMouseLeave={() => setIsHoveringSocial(false)}
              >
                {socialCards.map((card, index) => {
                  const position = getSocialPosition(index);
                  const isActive = index === activeSocialIndex;

                  // Fan layout calculations
                  const spread = isMobileSocial ? 35 : 180;
                  const spreadY = isMobileSocial ? 25 : 50;
                  const yOffset = Math.abs(position) * spreadY;
                  const xOffset = position * spread;
                  const scale = 1 - Math.abs(position) * 0.15;
                  const zIndex = 50 - Math.abs(position);
                  const rotate = position * (isMobileSocial ? 5 : 10);
                  const isVisible = Math.abs(position) <= 1; // Only show active and 1 neighbor on each side (total 3)
                  const opacity = isVisible ? 1 : 0;
                  const brightness = isActive ? 100 : 95;

                  return (
                    <motion.div
                      key={index}
                      animate={{
                        x: xOffset,
                        y: yOffset,
                        scale,
                        zIndex,
                        rotate,
                        opacity,
                        filter: `brightness(${brightness}%)`,
                        boxShadow: isActive ? "0 20px 40px rgba(0,0,0,0.1)" : "none",
                        borderColor: isActive ? "#e5e7eb" : "transparent"
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut"
                      }}
                      className="absolute top-0 w-full max-w-[240px] md:max-w-[280px] h-[320px] md:h-[400px] rounded-3xl overflow-hidden origin-bottom bg-white border"
                      style={{
                        left: isMobileSocial ? 'calc(50% - 120px)' : 'calc(50% - 140px)',
                      }}
                    >
                      {/* Content Container */}
                      <div className={`absolute inset-0 z-30 p-5 md:p-6 flex flex-col justify-end transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'}`}>
                        {/* Icon */}
                        <div className="w-12 h-12 md:w-14 md:h-14 mb-3 md:mb-4" style={{ color: card.color }}>
                          {card.icon}
                        </div>

                        {/* Title and Description */}
                        <div>
                          <h3 className="text-[#111827] font-display font-bold text-xl md:text-2xl leading-tight mb-2">
                            {card.title}
                          </h3>
                          <p className="text-[#6b7280] text-[10px] md:text-xs leading-relaxed line-clamp-3 font-montserrat font-medium">
                            {card.description}
                          </p>
                        </div>

                        {/* Action Button */}
                        <a
                          href={card.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 text-white font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 shadow-md"
                          style={{ backgroundColor: card.color }}
                        >
                          {card.buttonText}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </a>

                        {/* Decorative Element */}
                        <div className="w-1/3 h-1 mt-3 md:mt-4 rounded-full opacity-20" style={{ backgroundColor: card.color }} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress Indicators */}
              <div className="flex gap-3 mt-4 md:mt-6 z-20">
                {socialCards.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveSocialIndex(idx)}
                    className={`rounded-full cursor-pointer transition-all duration-500 ${idx === activeSocialIndex ? 'bg-purple-light w-3 h-3 scale-125' : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY CAROUSEL SECTION */}
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

      {/* BUSINESS DASHBOARD SECTION */}
      < section className="bg-white py-[100px] px-5 border-t border-[#e5e7eb] overflow-hidden" >
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

      {/* COMPANY JOURNEY SECTION (Official & Professional) */}
      <section className="bg-white py-[100px] px-5 border-t border-[#e5e7eb] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center max-w-[800px] mx-auto mb-20">
            <p className="text-xs font-semibold text-purple-light uppercase tracking-widest mb-2 font-montserrat">OUR STORY</p>
            <h2 className="text-[clamp(28px,5vw,42px)] font-bold leading-[1.2] text-[#111827] mb-6 tracking-tight font-oswald">
              From a startup vision to a trusted technology partner—<span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-light after:to-purple-dark">here's how SystemMinds came to be</span>
            </h2>
          </div>

          {/* DESKTOP: Snake Infographic Roadmap */}
          <div className="hidden md:block relative h-[600px] w-full max-w-[1100px] mx-auto mt-10">
            {/* SVG Snake Path */}
            <svg className="absolute top-0 left-0 w-full h-full p-10 overflow-visible" viewBox="0 0 1000 500" preserveAspectRatio="none">
              <defs>
                <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#374151" /> {/* Dark Gray */}
                  <stop offset="50%" stopColor="#1f2937" /> {/* Darker Gray */}
                  <stop offset="100%" stopColor="#000000" /> {/* Black */}
                </linearGradient>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.1" />
                </filter>
              </defs>

              {/* 1. Main Snake Body (Border/Shadow) */}
              <path
                d="M50,150 C300,150 300,400 550,400 C800,400 800,150 1050,150"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="102"
                strokeLinecap="round"
              />

              {/* 2. Inner Snake Body (White Road) */}
              <path
                d="M50,150 C300,150 300,400 550,400 C800,400 800,150 1050,150"
                fill="none"
                stroke="#ffffff"
                strokeWidth="90"
                strokeLinecap="round"
              />

              {/* 3. Animated Fill (Black Progress) */}
              <motion.path
                d="M50,150 C300,150 300,400 550,400 C800,400 800,150 1050,150"
                fill="none"
                stroke="url(#snakeGradient)"
                strokeWidth="70"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                viewport={{ once: true }}
                filter="url(#shadow)"
                className="opacity-100"
              />

              {/* 4. Dashed Center Line */}
              {/* Visible on White (gray dashes) AND Black (white dashes)? Hard to do one path. */}
              {/* Let's make it white translucent - shows on Black fill (finished road), hidden on White (empty road) -> clean build effect */}
              <path
                d="M50,150 C300,150 300,400 550,400 C800,400 800,150 1050,150"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                strokeDasharray="10,10"
                strokeLinecap="round"
                className="z-10"
              />
            </svg>

            {/* NODES & CONTENT (Positioned along the Snake Path) */}

            {/* Node 1: 2024 (Start - On Top Curve) */}
            {/* Path starts at Y=150. Node centered at 150. Text below. */}
            <div className="absolute top-[100px] left-[5%] w-[300px] z-20">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                {/* Node Circle */}
                <div className="w-24 h-24 rounded-full bg-white border-8 border-purple-200 flex items-center justify-center shadow-xl mb-6 relative z-20">
                  <span className="text-2xl font-bold text-gray-800 font-oswald">2024</span>
                </div>

                {/* Text Card (Below) */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center w-full relative z-10">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
                  <h3 className="text-lg font-bold text-purple-600 mb-2 font-oswald uppercase">The Idea</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-montserrat">Bridging gaps with innovative digital visions.</p>
                </div>
              </motion.div>
            </div>

            {/* Node 2: 2025 (Middle - On Bottom Curve) */}
            {/* Path dips to Y=400. Node centered at 400. Text above. */}
            <div className="absolute top-[350px] left-1/2 -translate-x-1/2 w-[300px] z-20">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
                viewport={{ once: true }}
                className="flex flex-col-reverse items-center"
              >
                {/* Node Circle */}
                <div className="w-24 h-24 rounded-full bg-white border-8 border-purple-400 flex items-center justify-center shadow-xl mt-6 relative z-20">
                  <span className="text-2xl font-bold text-gray-800 font-oswald">2025</span>
                </div>

                {/* Text Card (Above) */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center w-full relative z-10">
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100"></div>
                  <h3 className="text-lg font-bold text-purple-600 mb-2 font-oswald uppercase">Launch</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-montserrat">Turning vision into reality with global clients.</p>
                </div>
              </motion.div>
            </div>

            {/* Node 3: 2026 (End - On Top Curve) */}
            {/* Path rises back to Y=150. Node centered at 150. Text below. */}
            <div className="absolute top-[100px] right-[5%] w-[300px] z-20">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.5, type: "spring" }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                {/* Node Circle */}
                <div className="w-24 h-24 rounded-full bg-white border-8 border-purple-600 flex items-center justify-center shadow-xl mb-6 relative z-20">
                  <span className="text-2xl font-bold text-gray-800 font-oswald">2026</span>
                </div>

                {/* Text Card (Below) */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center w-full relative z-10">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
                  <h3 className="text-lg font-bold text-purple-600 mb-2 font-oswald uppercase">Growth</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-montserrat">Scaling up with a solid corporate foundation.</p>
                </div>
              </motion.div>
            </div>

          </div>

          {/* MOBILE: Vertical Stack (Responsive Fallback) */}
          <div className="md:hidden relative border-l-2 border-purple-light/20 ml-4 space-y-12 pl-8">
            {[
              { year: "2024", title: "The Idea", desc: "Bridging gaps with innovative digital visions." },
              { year: "2025", title: "Launch", desc: "Turning vision into reality with global clients." },
              { year: "2026", title: "Growth", desc: "Scaling up with a solid corporate foundation." }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-white border-4 border-purple-light"></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <span className="text-2xl font-bold text-gray-900 font-oswald block mb-1">{item.year}</span>
                  <h3 className="text-lg font-bold text-purple-600 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

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

      {/* FOOTER SECTION */}
      < footer className="bg-[#2c2c2c] py-[80px] px-5 pb-10 text-white overflow-hidden relative" >
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
      </footer >

      {/* Mobile Bottom Navigation Bar */}
      < nav className="fixed lg:hidden bottom-0 left-0 right-0 bg-[#020617] px-6 py-3 flex justify-between items-end z-50 rounded-t-[24px] shadow-[0_-4px_24px_rgba(0,0,0,0.25)] min-h-[70px] pb-5" >
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
      </nav >

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

export default App;
