import React, { useState, useRef } from 'react';

export default function ChatInput({ onSend, disabled }) {
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input.trim());
            setInput('');
            // Reset textarea height
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleInput = (e) => {
        setInput(e.target.value);
        // Auto-resize textarea
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        }
    };

    return (
        <form className="chat-input-form" onSubmit={handleSubmit}>
            <div className="chat-input-container">
                <textarea
                    ref={textareaRef}
                    className="chat-input"
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Nova anything..."
                    disabled={disabled}
                    rows={1}
                    autoFocus
                />
                <button
                    type="submit"
                    className="chat-send-btn"
                    disabled={disabled || !input.trim()}
                    aria-label="Send message"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3 10L17 3L10 17L9 11L3 10Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
            <p className="chat-input-hint">
                Press <kbd>Enter</kbd> to send · <kbd>Shift + Enter</kbd> for new line
            </p>
        </form>
    );
}
