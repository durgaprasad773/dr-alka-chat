import React from 'react';
import { motion } from 'motion/react';

const DEFAULT_QUESTIONS = [
  "I'd like a private psychiatry consultation. Where do I start?",
  "Can Dr Arokia help with trauma or relationship-based distress?",
  "I'm a professional dealing with burnout. Can she help?",
  "What conditions does Dr Arokia commonly assess?"
];

export function StarterQuestions({ questions, onSelectQuestion, isLoading }) {
  // Use API questions if available, else use Dr Arokia defaults
  let questionsList = null;

  if (questions && (questions.q1 || questions.q2 || questions.q3)) {
    questionsList = [
      { q: questions.q1, a: questions.a1, url: questions.Url1, buttonLabel: questions.ButtonLabel1 },
      { q: questions.q2, a: questions.a2, url: questions.Url2, buttonLabel: questions.ButtonLabel2 },
      { q: questions.q3, a: questions.a3, url: questions.Url3, buttonLabel: questions.ButtonLabel3 }
    ].filter(item => item.q);
  } else {
    questionsList = DEFAULT_QUESTIONS.map(q => ({ q, a: null, url: null, buttonLabel: null }));
  }

  if (!questionsList || questionsList.length === 0) return null;

  return (
    <div className="flex flex-col items-end gap-[10px] mb-4">
      <span
        className="text-[12px] font-bold mr-[2px]"
        style={{ color: '#718095' }}
      >
        Choose a topic to get started:
      </span>
      {questionsList.map((item, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectQuestion(item.q, item.a, item.url, item.buttonLabel)}
          disabled={isLoading}
          className="border rounded-[16px] px-[15px] py-[13px] font-black text-[14px] text-center shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            width: '88%',
            borderColor: '#e7e2d8',
            background: '#fff',
            color: '#25384a',
            boxShadow: '0 10px 28px rgba(16,42,63,0.08)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#245f67';
            e.currentTarget.style.color = '#245f67';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e7e2d8';
            e.currentTarget.style.color = '#25384a';
          }}
        >
          {item.q}
        </motion.button>
      ))}
    </div>
  );
}
