import React from 'react';

export function ChatHeader({ clinicName, logoUrl, onClose, brandColour, showClose = true }) {
  return (
    <div
      className="p-[18px] border-b flex items-center justify-between"
      style={{ borderColor: '#e7e2d8', background: 'rgba(255,255,255,0.86)' }}
    >
      <div className="flex items-center gap-[11px]">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-[13px] overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #102a3f, #c8a25b)' }}
        >
          AA
        </div>
        <div>
          <div className="font-black text-[15px] text-[#162d42] leading-[1.2]">{clinicName || "Ask Dr Arokia's Assistant"}</div>
          <div className="flex items-center gap-[5px] mt-[3px]">
            <span className="w-2 h-2 rounded-full bg-[#20945f] inline-block"></span>
            <span className="text-[12px] text-[#20945f] font-bold">Online now</span>
          </div>
        </div>
      </div>
      <div className="text-right text-[11px] text-[#9aa6b5] leading-[1.25]">
        Educational only<br />Not crisis support
      </div>
    </div>
  );
}
