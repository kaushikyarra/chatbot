import React from 'react';

export default function ChatMessage({ message }) {
    const isUser = message.role === 'user';

    return (
        <div className={`chat-message ${isUser ? 'chat-message-user' : 'chat-message-ai'}`}>
            {!isUser && (
                <div className="message-avatar">
                    <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="28" height="28" rx="8" fill="url(#avatar-grad)" />
                        <defs>
                            <linearGradient id="avatar-grad" x1="0" y1="0" x2="28" y2="28">
                                <stop offset="0%" stopColor="#818cf8" />
                                <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                        </defs>
                        <circle cx="11" cy="13" r="1.5" fill="white" />
                        <circle cx="17" cy="13" r="1.5" fill="white" />
                        <path d="M10 17C10 17 12 19 14 19C16 19 18 17 18 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
            )}
            <div className={`message-bubble ${isUser ? 'bubble-user' : 'bubble-ai'}`}>
                <p className="message-text">{message.content}</p>
                <span className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
}
