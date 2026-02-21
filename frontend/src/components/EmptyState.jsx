import React from 'react';

const suggestions = [
    'What can you help me with?',
    'Tell me a fun fact',
    'Explain machine learning briefly',
    'How does AI work?',
];

export default function EmptyState({ onSuggestionClick }) {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="empty-grad" x1="0" y1="0" x2="80" y2="80">
                            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="empty-stroke" x1="0" y1="0" x2="80" y2="80">
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                    </defs>
                    <rect width="80" height="80" rx="24" fill="url(#empty-grad)" />
                    <rect x="1" y="1" width="78" height="78" rx="23" stroke="url(#empty-stroke)" strokeWidth="1" strokeOpacity="0.3" />
                    {/* Brain / neural icon */}
                    <circle cx="40" cy="34" r="12" stroke="url(#empty-stroke)" strokeWidth="1.8" fill="none" />
                    <circle cx="36" cy="32" r="2" fill="#818cf8" />
                    <circle cx="44" cy="32" r="2" fill="#818cf8" />
                    <path d="M35 38C35 38 37.5 41 40 41C42.5 41 45 38 45 38" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Chat lines */}
                    <rect x="24" y="52" rx="3" width="32" height="4" fill="#818cf8" fillOpacity="0.3" />
                    <rect x="28" y="60" rx="3" width="24" height="4" fill="#818cf8" fillOpacity="0.15" />
                </svg>
            </div>
            <h2 className="empty-state-title">Hello! I'm Nova</h2>
            <p className="empty-state-desc">
                Your AI-powered assistant. Ask me anything and I'll do my best to help.
            </p>
            <div className="suggestion-chips">
                {suggestions.map((text, i) => (
                    <button
                        key={i}
                        className="suggestion-chip"
                        onClick={() => onSuggestionClick(text)}
                    >
                        {text}
                    </button>
                ))}
            </div>
        </div>
    );
}
