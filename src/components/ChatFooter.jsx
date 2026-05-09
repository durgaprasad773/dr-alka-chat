import React from 'react';

export function ChatFooter() {
  return (
    <div
      className="text-center text-[10.5px] px-[10px] pb-[14px] pt-[10px]"
      style={{ color: '#9aa6b5', background: '#f8faf9' }}
    >
      Educational information only · Not a substitute for professional advice, diagnosis, treatment, medication advice or crisis support · Powered by{' '}
      <a
        href="https://www.neurascalex.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline hover:underline font-bold"
        style={{ color: '#245f67' }}
      >
        NeuraScaleX
      </a>
    </div>
  );
}
