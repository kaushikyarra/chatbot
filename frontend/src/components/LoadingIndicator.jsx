import React from 'react';

export default function LoadingIndicator() {
    return (
        <div className="chat-message chat-message-ai">
            <div className="message-avatar">
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="28" rx="8" fill="url(#loading-grad)" />
                    <defs>
                        <linearGradient id="loading-grad" x1="0" y1="0" x2="28" y2="28">
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                    </defs>
                    <circle cx="11" cy="13" r="1.5" fill="white" />
                    <circle cx="17" cy="13" r="1.5" fill="white" />
                    <path d="M10 17C10 17 12 19 14 19C16 19 18 17 18 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </div>
            <div className="bubble-ai loading-bubble">
                <div className="typing-indicator">
                    <span className="typing-dot" style={{ animationDelay: '0ms' }}></span>
                    <span className="typing-dot" style={{ animationDelay: '150ms' }}></span>
                    <span className="typing-dot" style={{ animationDelay: '300ms' }}></span>
                </div>
            </div>
        </div>
    );
}
