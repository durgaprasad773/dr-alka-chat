import React from 'react';
import { parseMarkdown } from '../utils/helpers';
import { Button } from "@/components/ui/button";

export function Message({ message, onReaction, onFollowUp, onTopic, isLatestBotMessage, brandColour, logoUrl, clinicName }) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex flex-col mb-[10px] ${isUser ? 'items-end' : 'items-start'}`}>
      {!isUser && (
        <div className="flex items-center gap-1.5 mb-1">
          <div
            className="w-[18px] h-[18px] rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-white font-black text-[8px]"
            style={{ background: 'linear-gradient(135deg, #102a3f, #c8a25b)' }}
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="avatar"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.innerText = 'AA'; }}
              />
            ) : 'AA'}
          </div>
          <span className="text-[10px] text-[#9aa6b5] font-bold">{clinicName || "Ask Dr Alka"}</span>
        </div>
      )}

      <div
        className={`px-[14px] py-[11px] max-w-[88%] break-words shadow-sm nexus-message-bubble ${
          isUser
            ? 'text-white'
            : 'text-[#24384c] border'
        }`}
        style={
          isUser
            ? {
                background: 'linear-gradient(135deg, #102a3f, #245f67)',
                borderRadius: '16px 4px 16px 16px',
                boxShadow: '0 2px 10px rgba(16,42,63,0.2)',
              }
            : {
                background: '#fff',
                borderColor: '#e7e2d8',
                borderRadius: '4px 16px 16px 16px',
                boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
              }
        }
      >
        <div
          className="text-[15px] leading-[1.62]"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }}
        />

        {/* Action Buttons from API response */}
        {!isUser && message.hasActionButton && message.actionButtons && message.actionButtons.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.actionButtons.map((btnObj, idx) => {
              const label = Object.keys(btnObj)[0];
              const url = btnObj[label];
              return (
                <button
                  key={idx}
                  className="rounded-full border-2 px-4 py-1.5 text-xs font-black transition-colors"
                  style={{ borderColor: '#c8a25b', color: '#c8a25b', background: '#fff' }}
                  onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Reaction buttons */}
      {message.sender === 'bot' && message.message_id && !message.isError && isLatestBotMessage && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onReaction(message.message_id, message.session_id, true)}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition text-xs ${
              message.userReaction === true
                ? 'scale-105'
                : 'border hover:scale-105'
            }`}
            style={
              message.userReaction === true
                ? { background: '#eef5f0', color: '#20945f', border: '2px solid #20945f' }
                : { background: '#fff', borderColor: '#e7e2d8' }
            }
            title="Like this response"
          >
            👍
          </button>
          <button
            onClick={() => onReaction(message.message_id, message.session_id, false)}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition text-xs ${
              message.userReaction === false ? 'scale-105' : 'border hover:scale-105'
            }`}
            style={
              message.userReaction === false
                ? { background: '#faedf0', color: '#9d4254', border: '2px solid #9d4254' }
                : { background: '#fff', borderColor: '#e7e2d8' }
            }
            title="Dislike this response"
          >
            👎
          </button>
        </div>
      )}
    </div>
  );
}
