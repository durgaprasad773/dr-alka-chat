import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center px-1 py-2">
      <span
        className="w-2 h-2 rounded-full animate-bounce"
        style={{ background: '#245f67', animationDelay: '0s' }}
      ></span>
      <span
        className="w-2 h-2 rounded-full animate-bounce"
        style={{ background: '#245f67', animationDelay: '0.2s' }}
      ></span>
      <span
        className="w-2 h-2 rounded-full animate-bounce"
        style={{ background: '#245f67', animationDelay: '0.4s' }}
      ></span>
    </div>
  );
}
