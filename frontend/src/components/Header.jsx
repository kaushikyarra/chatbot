import React from 'react';

export default function Header() {
    return (
        <header className="header">
            <div className="header-inner">
                <div className="header-brand">
                    <div className="header-logo">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28">
                                    <stop offset="0%" stopColor="#818cf8" />
                                    <stop offset="100%" stopColor="#6366f1" />
                                </linearGradient>
                            </defs>
                            <rect width="28" height="28" rx="8" fill="url(#logo-grad)" />
                            <path d="M8 11C8 11 10 8 14 8C18 8 20 11 20 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            <circle cx="11" cy="14" r="1.5" fill="white" />
                            <circle cx="17" cy="14" r="1.5" fill="white" />
                            <path d="M10 18C10 18 12 20 14 20C16 20 18 18 18 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="header-text">
                        <h1 className="header-title">Nova AI</h1>
                        <span className="header-subtitle">Intelligent Assistant</span>
                    </div>
                </div>
                <div className="header-status">
                    <span className="status-dot"></span>
                    <span className="status-text">Online</span>
                </div>
            </div>
        </header>
    );
}
