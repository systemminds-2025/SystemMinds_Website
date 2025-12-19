import React from 'react';
import smartbotImage from './img/PhotoshopExtension_Image.png';
import './styles.css';

function App() {
  const handleMenuClick = () => {
    console.log('Menu clicked');
    // Add your menu functionality here
  };

  const handleArrowClick = (e) => {
    e.stopPropagation(); // Prevent triggering the button click
    console.log('Arrow clicked');
    // Add your arrow-specific functionality here
  };

  return (
    <div className="page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-container">
          {/* Navigation Bar */}
          <nav className="nav-bar">
            <button className="nav-link">Product</button>
            <button className="nav-link">Solutions</button>
            <button className="nav-link">Agencies</button>
            <button className="nav-link">Pricing</button>
            <button className="nav-link">Resources</button>
            <button className="btn-contact" onClick={handleMenuClick}>
              Menu
              <span className="menu-arrow-icon" onClick={handleArrowClick}>
                <span className="menu-arrow-circle">→</span>
              </span>
            </button>
          </nav>

          {/* Hero Content with SmartBot Character and Logo */}
          <div className="hero-main">
            <div className="smartbot-character">
              <img src={smartbotImage} alt="SmartBot Character" className="bot-image" />
            </div>
            <div className="smartbot-logo">
              SYSTEM MINDS<sup className="trademark">®</sup>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CONTENT SECTION */}
      <section className="content-section">
        <div className="content-container">
          {/* Left Column - Text and Buttons */}
          <div className="content-left">
            <h1 className="content-title">Get the Most From Every Conversation</h1>
            <p className="content-description">
              Sell more, engage better, and grow your audience with powerful automations for Instagram, WhatsApp, TikTok, and Messenger.
            </p>
            <div className="content-actions">
              <button className="btn-primary">
                Get Started
                <span className="btn-arrow-icon">
                  <span className="arrow-circle">→</span>
                </span>
              </button>
              <a href="#" className="link-demo">Get Free Demo</a>
            </div>
          </div>

          
          <div className="content-right-wrapper">
            <div className="content-right">
              <div className="chat-card">
                <div className="chat-header">
                  <span className="chat-title">Chat</span>
                  <div className="chat-header-line"></div>
                </div>
                <div className="chat-body">
                  <div className="chat-message">
                    <div className="avatar avatar-blue">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M3.41 22C3.41 18.13 7.26 15 12 15C16.74 15 20.59 18.13 20.59 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="message-bubble">
                      <div className="placeholder-line"></div>
                      <div className="placeholder-line short"></div>
                    </div>
                  </div>
                  <div className="chat-message chat-message-right">
                    <div className="message-bubble message-bubble-right">
                      <div className="placeholder-line"></div>
                      <div className="placeholder-line short"></div>
                    </div>
                    <div className="avatar avatar-green">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M3.41 22C3.41 18.13 7.26 15 12 15C16.74 15 20.59 18.13 20.59 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="chat-message">
                    <div className="avatar avatar-grey">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M3.41 22C3.41 18.13 7.26 15 12 15C16.74 15 20.59 18.13 20.59 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="message-bubble">
                      <div className="placeholder-line"></div>
                      <div className="placeholder-line short"></div>
                    </div>
                  </div>
                </div>
                <div className="emoji-reaction-left">
                  <div className="emoji-reaction-bar">
                    <span>👍</span>
                    <span>❤️</span>
                    <span>😂</span>
                    <span>😍</span>
                    <span>😮</span>
                  </div>
                </div>
                <div className="liked-overlap">
                  <div className="message-bubble liked-bubble">
                    <span className="heart-icon">❤️</span> Liked
                  </div>
                </div>
                <div className="chat-input-container">
                  <input type="text" placeholder="Type Your Text" className="chat-input" />
                  <button className="send-button">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRANSFORM SECTION */}
      <section className="transform-section">
        <div className="transform-container">
          <div className="transform-header">
            <h2 className="transform-title">Transform Good Chats Into Great Ones</h2>
            <p className="transform-subtitle">
              Turn Ordinary Chats Into Truly Great Conversations By Adding Clarity, Context, And Smart Guidance That Helps You Express Ideas Better.
            </p>
          </div>

          <div className="feature-cards">
            {/* Card 01 */}
            <div className="feature-card">
              <span className="card-number">01/</span>
              <h3 className="card-title">Convert Comments Fast</h3>
              <p className="card-description">
                Transform simple comments into meaningful conversations that drive results.
              </p>
            </div>

            {/* Card 02 - Highlighted */}
            <div className="feature-card-wrapper">
              <div className="feature-card-layer layer-3"></div>
              <div className="feature-card-layer layer-2"></div>
              <div className="feature-card feature-card-active">
                <span className="card-number">02/</span>
                <h3 className="card-title">Instant Follower Connect</h3>
                <p className="card-description">
                  Instantly connect with your audience through smart, automated replies.
                </p>
              </div>
            </div>

            {/* Card 03 */}
            <div className="feature-card">
              <span className="card-number">03/</span>
              <h3 className="card-title">Grow Your Digital Empire</h3>
              <p className="card-description">
                Take your empire to the next level by scaling your impact, increasing visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STAY CONNECTED SECTION */}
      <section className="connected-section">
        <div className="connected-container">
          {/* Left Column - Text and CTA */}
          <div className="connected-col connected-left">
            <h2 className="connected-title">
              Stay connected<br />
              across every place<br />
              your audience<br />
              exists.
            </h2>
            <p className="connected-description">
              Reach Your Audience Wherever They Are On Every Platform, Every Channel, And Every Moment They're Ready To Connect.
            </p>
            <button className="btn-trial">
              Start Free Trial
              <span className="btn-trial-arrow">
                <span className="trial-arrow-circle">→</span>
              </span>
            </button>
          </div>

          {/* Middle Column - Instagram Card */}
          <div className="connected-col platform-card platform-card-instagram">
            <h3 className="platform-name">Instagram</h3>
            <p className="platform-description">
              Grow Your Presence On Instagram With Powerful Tools That Help You Engage.
            </p>
            <div className="platform-icon platform-icon-instagram">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="#000000" strokeWidth="2"/>
                <circle cx="12" cy="12" r="4" stroke="#000000" strokeWidth="2"/>
                <circle cx="18" cy="6" r="1.5" fill="#000000"/>
              </svg>
            </div>
          </div>

          {/* Right Column - TikTok Card */}
          <div className="connected-col platform-card platform-card-tiktok">
            <h3 className="platform-name">Tiktok</h3>
            <p className="platform-description">
              Convert Fast-Moving Viral Moments Into Thoughtful, High-Value Conversations.
            </p>
            <div className="platform-icon platform-icon-tiktok">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.11V9.4a6.25 6.25 0 0 0-.79-.05A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 6.35 6.35 6.34 6.34 0 0 0 6.35-6.35V9.15a8.16 8.16 0 0 0 4.75 1.52V7.22a4.83 4.83 0 0 1-1-.53z" fill="#000000"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ROBOT CENTER SECTION */}
      <section className="robot-section">
        <div className="robot-container">
          {/* Social Media Icons */}
          <div className="social-icon social-icon-instagram">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f09433" />
                  <stop offset="50%" stopColor="#e6683c" />
                  <stop offset="100%" stopColor="#dc2743" />
                </linearGradient>
              </defs>
              <rect width="24" height="24" rx="5" fill="url(#instagramGradient)"/>
              <rect x="6" y="6" width="12" height="12" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="none"/>
              <circle cx="17" cy="7" r="1" fill="white"/>
            </svg>
          </div>

          <div className="social-icon social-icon-whatsapp">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#25D366"/>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="white"/>
            </svg>
          </div>

          <div className="social-icon social-icon-tiktok">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="5" fill="#000000"/>
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.11V9.4a6.25 6.25 0 0 0-.79-.05A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 6.35 6.35 6.34 6.34 0 0 0 6.35-6.35V9.15a8.16 8.16 0 0 0 4.75 1.52V7.22a4.83 4.83 0 0 1-1-.53z" fill="#ffffff"/>
            </svg>
          </div>

          <div className="social-icon social-icon-messenger">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="messengerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#87CEEB" />
                  <stop offset="100%" stopColor="#006AFF" />
                </linearGradient>
              </defs>
              <path d="M12 2C6.48 2 2 5.58 2 10c0 2.14 1.08 4.05 2.78 5.41L4 20l4.9-2.61C10.17 17.85 11.05 18 12 18c5.52 0 10-3.58 10-8s-4.48-8-10-8z" fill="url(#messengerGradient)"/>
              <path d="M8 13l3-4h2l-3 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M11 9h2" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M8 13h6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* UI Cards */}
          <div className="ui-card ui-card-cloud">
            <div className="ui-card-icon ui-icon-cloud">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z" fill="currentColor"/>
                <path d="M13 10l-3 3h3v-3z" fill="white"/>
                <path d="M13 10v3h3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="ui-card-text">Cloud Server</span>
          </div>

          <div className="ui-card ui-card-collab">
            <div className="ui-card-icon ui-icon-collab">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M12 12l-2-1v2l2 1 2-1v-2l-2 1z" fill="white"/>
              </svg>
            </div>
            <span className="ui-card-text">Collaboration</span>
          </div>

          <div className="ui-card ui-card-tracking">
            <div className="ui-card-icon ui-icon-tracking">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 4l1.5 1.5M20 12l-1.5 1.5M12 20l-1.5-1.5M4 12l1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <span className="ui-card-text">Tracking</span>
          </div>

          <div className="ui-card ui-card-operation">
            <div className="ui-card-icon ui-icon-operation">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="8" y="8" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <span className="ui-card-text">Operation</span>
          </div>

          {/* Robot Character */}
          <div className="robot-character">
            <img src={smartbotImage} alt="Robot Character" className="robot-image" />
          </div>
        </div>
      </section>

      {/* BUSINESS DASHBOARD SECTION */}
      <section className="dashboard-section">
        <div className="dashboard-container">
          {/* Left Column - Text and CTA */}
          <div className="dashboard-left">
            <h2 className="dashboard-title">
              Make BUsiness Decision That help you grow
            </h2>
            <p className="dashboard-description">
              Manage All Your Social Channels, Ensure Customer Supremacy Engagement, Track Your Performance And More—All From A Single Platform
            </p>
            <button className="btn-dashboard">
              Get Started
              <span className="btn-dashboard-arrow">→</span>
            </button>
          </div>

          {/* Right Column - Dashboard Graphic */}
          <div className="dashboard-right">
            <div className="metrics-box">
              <div className="dashboard-metrics">
                <div className="metric-item">
                  <div className="metric-icon-bg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" fill="#111827"/>
                      <path d="M9 8H15V10H9V8ZM9 12H15V14H9V12ZM9 16H13V18H9V16Z" fill="#111827"/>
                    </svg>
                  </div>
                  <div className="metric-content">
                    <div className="metric-value">25000 USD</div>
                    <div className="metric-label">Total Sales</div>
                  </div>
                </div>
                <div className="metric-divider"></div>
                <div className="metric-item">
                  <div className="metric-icon-bg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="#111827" strokeWidth="1.5" fill="none"/>
                      <path d="M12 2L12 12L20 12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                      <path d="M12 12L12 22L4 22" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                    </svg>
                  </div>
                  <div className="metric-content">
                    <div className="metric-value">22000 USD</div>
                    <div className="metric-label">Total Expenses</div>
                  </div>
                </div>
              </div>

              {/* Revenue Chart Box */}
              <div className="chart-box">
                <div className="revenue-header">
                  <span className="revenue-title">Revenue</span>
                  <span className="revenue-percent">(+13%)</span>
                  <span className="revenue-indicator">
                    <span className="indicator-dot"></span>
                    This Year
                  </span>
                </div>
                <div className="chart-container">
                  <div className="chart-bars">
                    <div className="chart-bar" style={{height: '50%'}}></div>
                    <div className="chart-bar" style={{height: '60%'}}></div>
                    <div className="chart-bar" style={{height: '45%'}}></div>
                    <div className="chart-bar chart-bar-highlight" style={{height: '100%'}}>
                      <div className="bar-highlight-dot"></div>
                    </div>
                    <div className="chart-bar" style={{height: '55%'}}></div>
                    <div className="chart-bar" style={{height: '65%'}}></div>
                  </div>
                  <div className="chart-line">
                    <div className="line-text">2025 Avg</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAUNCH JOURNEY SECTION */}
      <section className="journey-section">
        <div className="journey-container">
          <div className="journey-header">
            <h2 className="journey-title">Launch your journey in three quick and simple steps</h2>
            <p className="journey-subtitle">
              Begin Your Journey In Three Easy Steps That Guide You From Setup To Full Usage In Minutes, Giving You A Fast, Intuitive Start Without The Typical..
            </p>
          </div>

          <div className="journey-cards">
            {/* Card 1 */}
            <div className="journey-card">
              <div className="journey-icon journey-icon-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2" fill="none"/>
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 8h4M18 6v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="journey-card-title">Create Your Free Account</h3>
              <p className="journey-card-description">
                Sign Up For Free And Unlock Instant Access..
              </p>
            </div>

            {/* Card 2 */}
            <div className="journey-card">
              <div className="journey-icon journey-icon-beige">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="2" fill="white"/>
                  <circle cx="6" cy="6" r="2" fill="white"/>
                  <circle cx="18" cy="6" r="2" fill="white"/>
                  <circle cx="6" cy="18" r="2" fill="white"/>
                  <circle cx="18" cy="18" r="2" fill="white"/>
                  <path d="M12 10L6 6M12 10L18 6M12 14L6 18M12 14L18 18M10 12L6 6M14 12L18 6M10 12L6 18M14 12L18 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="journey-card-title">Sync all your channels effortlessly</h3>
              <p className="journey-card-description">
                Link Every Channel You Use To Create A Smooth.
              </p>
            </div>

            {/* Card 3 */}
            <div className="journey-card">
              <div className="journey-icon journey-icon-green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="3" fill="white"/>
                  <path d="M12 2L12 6M12 18L12 22M2 12L6 12M18 12L22 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="journey-card-title">Launch your experience in minutes with a fast</h3>
              <p className="journey-card-description">
                Get Everything Ready And Go Live In Minutes.
              </p>
            </div>

            {/* Card 4 */}
            <div className="journey-card">
              <div className="journey-icon journey-icon-purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 10c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <path d="M8 14c0 2.21 1.79 4 4 4s4-1.79 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2" fill="none"/>
                  <path d="M12 8L14 10L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
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
      <section className="automation-section">
        <div className="automation-container">
          <div className="automation-header">
            <h2 className="automation-title">From Hello to High Conversions</h2>
            <p className="automation-subtitle">
              Launch Fast With Ready Automations Or Build Your Own Flows.
            </p>
          </div>

          <div className="automation-features">
            {/* Feature 1 */}
            <div className="automation-feature">
              <div className="feature-mockup-wrapper">
                <div className="feature-mockup today-mockup">
                  <div className="mockup-header">
                    <span className="mockup-title">Today</span>
                  </div>
                  <div className="mockup-content today-list-content">
                    <div className="today-list-item">
                      <div className="today-avatar-placeholder"></div>
                      <div className="today-text-placeholder"></div>
                      <button className="today-follow-btn">Follow Back</button>
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
                      <div className="today-text-placeholder-group">
                        <div className="today-text-placeholder"></div>
                        <div className="today-text-placeholder short"></div>
                      </div>
                      <div className="today-icon-placeholder"></div>
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
                      <div className="today-icon-placeholder"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="feature-title">Greet your new followers with ease</h3>
              <p className="feature-description">
                Make Every New Follower Feel Welcomed With Instant, Friendly Greetings.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="automation-feature">
              <div className="feature-mockup-wrapper">
                <div className="feature-mockup">
                  <div className="mockup-header">
                    <span className="mockup-title">Messages</span>
                  </div>
                  <div className="mockup-content chat-content">
                    <div className="chat-message user-message">
                      <div className="message-bubble">Hello!</div>
                    </div>
                    <div className="chat-message bot-message">
                      <div className="message-bubble">Hi! Welcome! 😊</div>
                    </div>
                    <div className="chat-input-area">
                      <input type="text" placeholder="Type Your Text" className="mockup-input" />
                      <button className="mockup-send-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="feature-title">Deliver automatic welcome messages</h3>
              <p className="feature-description">
                Send Personalised Welcome Messages That Make Every New Follower Feel Valued.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="automation-feature">
              <div className="feature-mockup-wrapper">
                <div className="feature-mockup question-mockup">
                  <div className="question-progress">
                    <div className="progress-dash active"></div>
                    <div className="progress-dash"></div>
                    <div className="progress-dash"></div>
                    <div className="progress-dash"></div>
                    <div className="progress-dash"></div>
                  </div>
                  <div className="question-header">
                    <span className="question-number">Question 01</span>
                  </div>
                  <div className="mockup-content question-content">
                    <div className="question-bubble">
                      <p className="question-text">How would you like to make change happen?</p>
                    </div>
                    <p className="question-instruction">Select Only One</p>
                    <div className="question-options">
                      <div className="question-option">
                        <div className="option-radio"></div>
                        <div className="option-placeholder long"></div>
                      </div>
                      <div className="question-option">
                        <div className="option-radio"></div>
                        <div className="option-placeholder medium-long"></div>
                      </div>
                      <div className="question-option">
                        <div className="option-radio"></div>
                        <div className="option-placeholder long"></div>
                      </div>
                      <div className="question-option">
                        <div className="option-radio"></div>
                        <div className="option-placeholder short"></div>
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
      <section className="cta-banner-section">
        <div className="cta-banner-container">
          <h2 className="cta-banner-title">Grow your followers with smart automation</h2>
          <p className="cta-banner-subtitle">
            Grow Your Followers Effortlessly With Smart, Automated Tools That Work For You.
          </p>
          <button className="btn-cta-banner">
            Start Free Trial
            <span className="btn-cta-arrow">
              <span className="cta-arrow-circle">→</span>
            </span>
          </button>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="footer-section">
        <div className="footer-container">
          {/* Top Section */}
          <div className="footer-top">
            {/* Left Side - Company & Products */}
            <div className="footer-left">
              <div className="footer-column">
                <h4 className="footer-column-title">Company</h4>
                <ul className="footer-links">
                  <li><a href="#">About</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Press</a></li>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">System Status</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-column-title">Products</h4>
                <ul className="footer-links">
                  <li><a href="#">Live Chat</a></li>
                  <li><a href="#">Jiogram</a></li>
                  <li><a href="#">Datasetico</a></li>
                  <li><a href="#">Underline</a></li>
                  <li><a href="#">Keyword</a></li>
                </ul>
              </div>
            </div>

            {/* Right Side - Newsletter */}
            <div className="footer-right">
              <div className="newsletter-section">
                <h4 className="footer-column-title">Newsletter</h4>
                <div className="newsletter-input-group">
                  <input type="email" placeholder="Enter Your Email" className="newsletter-input" />
                  <button className="newsletter-submit">Submit</button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="footer-social">
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 5.58 2 10c0 2.14 1.08 4.05 2.78 5.41L4 20l4.9-2.61C10.17 17.85 11.05 18 12 18c5.52 0 10-3.58 10-8s-4.48-8-10-8z" fill="currentColor"/>
                <path d="M9.5 9h5v1.5h-5V9zm0 2.5h5V13h-5v-1.5z" fill="white"/>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M9 7h3.5c2 0 3.5 1.5 3.5 3.5S14.5 14 12.5 14H9V7zm0 0v10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
              </svg>
            </a>
          </div>

          {/* Main Logo */}
          <div className="footer-logo-section">
            <h1 className="footer-logo">
              SYSTEM MIN<span className="footer-logo-d">D</span>
              <div className="footer-robot">
                <img src={smartbotImage} alt="SmartBot Character" className="footer-robot-image" />
              </div>
              <span className="footer-logo-s">S</span><sup className="footer-trademark">®</sup>
            </h1>
          </div>

          {/* Bottom Footer */}
          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <a href="#" className="footer-bottom-link">Term & Condition</a>
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
            </div>
            <div className="footer-bottom-right">
              <p className="footer-copyright">© 2025, Smartbot. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
