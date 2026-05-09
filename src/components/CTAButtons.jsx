import React from 'react';

export function CTAButtons({
  bookNowShow, bookNowText, bookNowUrl,
  sendEmailShow, sendEmailText,
  ctaTwoShow, ctaTwoText, ctaTwoUrl,
  ctaThreeShow, ctaThreeText, ctaThreeUrl,
  onBookNow, onSendEmail, onCTATwo, onCTAThree,
  brandColour
}) {
  const actions = [
    { show: bookNowShow, label: bookNowText, onClick: onBookNow, url: bookNowUrl },
    { show: ctaTwoShow, label: ctaTwoText, onClick: onCTATwo, url: ctaTwoUrl },
    { show: sendEmailShow, label: sendEmailText, onClick: onSendEmail, url: null },
    { show: ctaThreeShow, label: ctaThreeText, onClick: onCTAThree, url: ctaThreeUrl }
  ].filter(a => a.show && a.label);

  const displayActions = actions;

  return (
    <div
      className="flex gap-[10px] overflow-x-auto pt-[16px] pb-[2px] px-[2px]"
      style={{ scrollbarWidth: 'none' }}
    >
      {displayActions.map((action, idx) => (
        <a
          key={idx}
          className="flex-none text-center border-2 rounded-full px-[16px] py-[10px] text-[13px] font-black shadow-sm transition-all cursor-pointer"
          style={{
            minWidth: '146px',
            borderColor: '#c8a25b',
            color: '#c8a25b',
            background: '#fff',
            boxShadow: '0 6px 14px rgba(16,42,63,0.06)',
            textDecoration: 'none'
          }}
          href={action.url || '#'}
          target={action.url && action.url.startsWith('http') ? '_blank' : undefined}
          rel={action.url && action.url.startsWith('http') ? 'noopener noreferrer' : undefined}
          onClick={(e) => {
            if (action.onClick) {
              e.preventDefault();
              action.onClick();
            }
          }}
        >
          {action.label}
        </a>
      ))}
    </div>
  );
}
