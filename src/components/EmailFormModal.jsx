import React, { useState } from 'react';
import { X } from 'lucide-react';
import { sendEmail } from '../services/chatApi';

export function EmailFormModal({ isOpen, onClose, chatbotId, brandColour }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setIsLoading(true);
    try {
      await sendEmail(formData.name, formData.email, formData.message, chatbotId);
      setShowSuccess(true);
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', message: '' });
        setShowSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to send email. Please try again.');
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(16,42,63,0.55)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[22px] shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-black text-[#162d42]">Send us an Email</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-[#f7f6f2] transition"
            >
              <X size={20} color="#9aa6b5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[13px] font-bold text-[#162d42] mb-2">Your Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-[10px] text-[14px] focus:outline-none"
                style={{ borderColor: '#e7e2d8' }}
                onFocus={(e) => e.target.style.borderColor = '#245f67'}
                onBlur={(e) => e.target.style.borderColor = '#e7e2d8'}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-[13px] font-bold text-[#162d42] mb-2">Your Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-[10px] text-[14px] focus:outline-none"
                style={{ borderColor: '#e7e2d8' }}
                onFocus={(e) => e.target.style.borderColor = '#245f67'}
                onBlur={(e) => e.target.style.borderColor = '#e7e2d8'}
                required
              />
            </div>

            <div className="mb-5">
              <label className="block text-[13px] font-bold text-[#162d42] mb-2">Message*</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please tell us how we can help you..."
                className="w-full px-3 py-2 border rounded-[10px] text-[14px] resize-none focus:outline-none min-h-24"
                style={{ borderColor: '#e7e2d8' }}
                onFocus={(e) => e.target.style.borderColor = '#245f67'}
                onBlur={(e) => e.target.style.borderColor = '#e7e2d8'}
                required
              />
            </div>

            {isLoading && (
              <div className="flex items-center gap-2 text-[13px] mb-4" style={{ color: '#718095' }}>
                <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: '#e7e2d8', borderTopColor: '#245f67' }}></div>
                <span>Sending email...</span>
              </div>
            )}

            {showSuccess && (
              <div className="text-[13px] mb-4 text-center text-green-600">
                ✅ Email sent successfully! We'll get back to you soon.
              </div>
            )}

            {error && (
              <div className="text-[13px] mb-4 text-center" style={{ color: '#9d4254' }}>
                ❌ {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border rounded-full text-[13px] font-bold transition"
                style={{ borderColor: '#e7e2d8', color: '#718095' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 rounded-full text-[13px] font-black text-white transition disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #102a3f, #245f67)' }}
              >
                {isLoading ? 'Sending...' : 'Send Email'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
