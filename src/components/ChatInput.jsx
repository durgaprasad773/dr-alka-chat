import React, { useRef, useState } from 'react';

export function ChatInput({ disabled, onSendMessage, brandColour }) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleSend = () => {
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="grid gap-2 pt-[14px]" style={{ gridTemplateColumns: '1fr 45px' }}>
      <input
        ref={inputRef}
        placeholder="Type your question..."
        className="h-[44px] border rounded-[13px] flex items-center px-[14px] text-[13px] focus:outline-none transition-shadow"
        style={{
          borderColor: '#e7e2d8',
          background: '#fff',
          color: inputValue ? '#162d42' : '#a9b3be',
          boxShadow: 'none'
        }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        onFocus={(e) => {
          e.target.style.boxShadow = '0 0 0 3px rgba(36,95,103,0.15)';
          e.target.style.borderColor = '#245f67';
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = 'none';
          e.target.style.borderColor = '#e7e2d8';
        }}
      />
      <button
        className="h-[44px] border-0 rounded-[13px] text-[20px] cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: inputValue.trim() && !disabled ? 'linear-gradient(135deg, #102a3f, #245f67)' : '#e9eef0',
          color: inputValue.trim() && !disabled ? '#fff' : '#97a5ae'
        }}
        onClick={handleSend}
        disabled={!inputValue.trim() || disabled}
      >
        ›
      </button>
    </div>
  );
}
