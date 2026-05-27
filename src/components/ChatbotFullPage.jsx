import React, { useState, useEffect, useRef } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { ChatFooter } from './ChatFooter';
import { Message } from './Message';
import { TypingIndicator } from './TypingIndicator';
import { StarterQuestions } from './StarterQuestions';
import { CTAButtons } from './CTAButtons';
import { EmailFormModal } from './EmailFormModal';
import {
  WIDGET_ID,
  fetchImprovedChatResponse,
  saveReaction,
  getClinicSettings,
  getStarterQuestions,
  getDoctorDetails,
  fetchUserIP,
  insertUserChatSession,
  trackButtonClick,
} from '../services/chatApi';
import { getHeaderMaxLength } from '../utils/helpers';

export function ChatbotFullPage({ config = {}, onSettingsLoaded }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showStarterQuestions, setShowStarterQuestions] = useState(true);
  const [chatbotId, setChatbotId] = useState(null);
  const [userIP, setUserIP] = useState('127.0.0.1');
  const [userChatSessionId, setUserChatSessionId] = useState(null);
  const [sessionTracked, setSessionTracked] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [bookNowClicksId, setBookNowClicksId] = useState(null);
  const [starterQuestions, setStarterQuestions] = useState(null);

  const [chatConfig, setChatConfig] = useState({
    apiBaseUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? ''
      : 'https://neurax-python-be-emhfejathhhpe6h3.uksouth-01.azurewebsites.net',
    indexName: 'default',
    welcomeMessage: null,
    clinicName: "Ask Dr Alka",
    logoUrl: '',
    privacyNoticeText: "Educational only. Not a substitute for professional advice, diagnosis, treatment, medication advice or crisis support.",
    bookNowText: '',
    bookNowShow: false,
    bookNowUrl: '',
    sendEmailText: '',
    sendEmailShow: false,
    ctaTwoText: '',
    ctaTwoShow: false,
    ctaTwoUrl: '',
    ctaThreeText: '',
    ctaThreeShow: false,
    ctaThreeUrl: '',
    brandColour: '#245f67',
    textColour: '#ffffff',
    ...config
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    initializeChatbot();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    getHeaderMaxLength();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const initializeChatbot = async () => {
    try {
      const id = WIDGET_ID;
      setChatbotId(id);

      const ip = await fetchUserIP();
      setUserIP(ip);

      try {
        const details = await getDoctorDetails(id);
        setDoctorDetails(details);
      } catch (e) {
        console.warn('Could not load doctor details:', e.message);
      }

      try {
        const settings = await getClinicSettings(id);
        setChatConfig(prev => ({
          ...prev,
          welcomeMessage: settings.IntroMessage || null,
          clinicName: settings.ClinicName || "Ask Dr Alka",
          logoUrl: settings.LogoUrl || '',
          privacyNoticeText: settings.PrivacyNoticeText || prev.privacyNoticeText,
          bookNowUrl: settings.BookNowUrl ?? '',
          bookNowText: settings.BookNowLabel ?? '',
          bookNowShow: settings.BookNowShow === 'True' || settings.BookNowShow === true,
          sendEmailText: settings.SendAnEmailLabel ?? '',
          sendEmailShow: settings.SendAnEmailShow === 'True' || settings.SendAnEmailShow === true,
          ctaTwoUrl: settings.CTATwoUrl ?? '',
          ctaTwoText: settings.CTATwoLabel ?? '',
          ctaTwoShow: settings.CTATwoShow === 'True' || settings.CTATwoShow === true,
          ctaThreeUrl: settings.CTAThreeUrl ?? '',
          ctaThreeText: settings.CTAThreeLabel ?? '',
          ctaThreeShow: settings.CTAThreeShow === 'True' || settings.CTAThreeShow === true,
          brandColour: settings.BrandColour || prev.brandColour,
          textColour: settings.TextColour || prev.textColour,
        }));

        if (onSettingsLoaded) {
          onSettingsLoaded({ logoUrl: settings.LogoUrl || '', clinicName: settings.ClinicName || '' });
        }

        if (settings.IntroMessage) {
          setMessages([{
            id: 1,
            text: settings.IntroMessage,
            sender: 'bot',
            timestamp: new Date()
          }]);
        }
      } catch (e) {
        console.warn('Could not load clinic settings:', e.message);
        // Set default welcome message
        setMessages([{
          id: 1,
          text: "Hi, I'm Ask Dr Alka. I can help you understand Dr Alka's approach to longevity, The Million Hour Club, biological age testing, 10 Years Younger, private consultations, speaking enquiries and the right next step.\n\nI can't provide diagnosis, treatment, medication advice, therapy or crisis support. I can help with safe signposting and explaining the best pathway for you.",
          sender: 'bot',
          timestamp: new Date()
        }]);
      }

      try {
        const questions = await getStarterQuestions(id);
        setStarterQuestions(questions);
      } catch (e) {
        console.warn('Could not load starter questions:', e.message);
      }
    } catch (error) {
      console.error('Failed to initialize chatbot:', error);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    }, 100);
  };

  const handleReaction = async (messageId, sessionId, reaction) => {
    try {
      const currentMessage = messages.find(msg => msg.message_id === messageId);
      if (!currentMessage) return;

      const newReaction = currentMessage.userReaction === reaction ? null : reaction;

      setMessages(prev =>
        prev.map(msg =>
          msg.message_id === messageId ? { ...msg, userReaction: newReaction } : msg
        )
      );

      await saveReaction(sessionId, messageId, newReaction, chatbotId, chatConfig.apiBaseUrl);
    } catch (error) {
      console.error('Error saving reaction:', error);
      setMessages(prev =>
        prev.map(msg =>
          msg.message_id === messageId ? { ...msg, userReaction: null } : msg
        )
      );
    }
  };

  const createSession = async () => {
    if (userChatSessionId) return userChatSessionId;
    try {
      const sessionId = await insertUserChatSession(userIP, chatbotId);
      setUserChatSessionId(sessionId);
      setSessionTracked(true);
      return sessionId;
    } catch (error) {
      console.error('Failed to create session:', error);
      return null;
    }
  };

  const handleSendMessage = async (message) => {
    if (!message.trim() || isLoading) return;

    setShowStarterQuestions(false);
    const sessionId = await createSession();

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetchImprovedChatResponse(
        message,
        sessionId,
        chatbotId,
        chatConfig.apiBaseUrl
      );

      const botMessage = {
        id: Date.now() + 1,
        text: response.response || response.message || 'Sorry, I could not process your request.',
        sender: 'bot',
        timestamp: new Date(),
        message_id: response.message_id,
        session_id: response.session_id || userChatSessionId,
        userReaction: null,
        followUpQuestion: response.follow_up_question,
        suggestedTopics: response.suggested_topics,
        hasActionButton: response.has_action_button,
        actionButtons: response.action_buttons || []
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarterQuestion = async (questionText, answerText = null, actionUrl = null, actionLabel = null) => {
    if (isLoading) return;

    setShowStarterQuestions(false);
    const sessionId = await createSession();

    const userMessage = {
      id: Date.now(),
      text: questionText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    if (answerText) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: answerText,
        sender: 'bot',
        timestamp: new Date(),
        userReaction: null,
        hasActionButton: !!(actionUrl && actionLabel),
        actionButtons: (actionUrl && actionLabel) ? [{ [actionLabel]: actionUrl }] : []
      }]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetchImprovedChatResponse(questionText, sessionId, chatbotId, chatConfig.apiBaseUrl);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: response.response || response.message || 'Sorry, I could not process your request.',
        sender: 'bot',
        timestamp: new Date(),
        message_id: response.message_id,
        session_id: response.session_id || userChatSessionId,
        userReaction: null,
        followUpQuestion: response.follow_up_question,
        suggestedTopics: response.suggested_topics
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookNow = async () => {
    if (userChatSessionId) {
      try {
        const clickId = await trackButtonClick(userChatSessionId, chatConfig.bookNowText, chatbotId);
        if (clickId) setBookNowClicksId(clickId);
      } catch (e) {}
    }
    if (chatConfig.bookNowUrl) {
      window.open(chatConfig.bookNowUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSendEmail = async () => {
    const sid = await createSession();
    if (sid && chatConfig.sendEmailText) {
      try {
        const clickId = await trackButtonClick(sid, chatConfig.sendEmailText, chatbotId);
        if (clickId) setBookNowClicksId(clickId.trim());
      } catch (e) {}
    }
    setShowEmailForm(true);
  };

  const handleCTATwo = async () => {
    if (userChatSessionId) {
      try {
        await trackButtonClick(userChatSessionId, chatConfig.ctaTwoText, chatbotId);
      } catch (e) {}
    }
    if (chatConfig.ctaTwoUrl) {
      window.open(chatConfig.ctaTwoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCTAThree = async () => {
    if (userChatSessionId) {
      try {
        await trackButtonClick(userChatSessionId, chatConfig.ctaThreeText, chatbotId);
      } catch (e) {}
    }
    if (chatConfig.ctaThreeUrl) {
      window.open(chatConfig.ctaThreeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const latestBotMessageId = [...messages].reverse().find(m => m.sender === 'bot')?.message_id;

  return (
    <>
      <div
        id="ask-assistant"
        className="border rounded-[30px] overflow-hidden mb-[26px]"
        style={{
          background: '#fff',
          borderColor: '#e7e2d8',
          boxShadow: '0 22px 50px rgba(16,42,63,0.12)',
          scrollMarginTop: '18px'
        }}
      >
        <ChatHeader
          clinicName={chatConfig.clinicName}
          logoUrl={chatConfig.logoUrl}
          brandColour={chatConfig.brandColour}
        />

        {/* Chat body */}
        <div
          className="px-[18px] pt-[18px] pb-[14px]"
          style={{ background: 'linear-gradient(180deg, #fff 0%, #f8faf9 100%)' }}
        >
          {/* Message area */}
          <div className="min-h-[120px] max-h-[380px] overflow-y-auto pr-1 mb-2">
            {messages.map((msg, idx) => (
              <Message
                key={msg.id}
                message={msg}
                onReaction={handleReaction}
                isLatestBotMessage={msg.message_id === latestBotMessageId}
                brandColour={chatConfig.brandColour}
                logoUrl={chatConfig.logoUrl}
                clinicName={chatConfig.clinicName}
              />
            ))}

            {isLoading && (
              <div
                className="inline-flex px-[14px] py-[11px] border rounded-[4px_16px_16px_16px] mb-[10px]"
                style={{ background: '#fff', borderColor: '#e7e2d8', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}
              >
                <TypingIndicator />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter questions */}
          {showStarterQuestions && messages.length <= 1 && !isLoading && (
            <StarterQuestions
              questions={starterQuestions}
              onSelectQuestion={handleStarterQuestion}
              isLoading={isLoading}
            />
          )}

          {/* CTA action row */}
          <CTAButtons
            bookNowShow={chatConfig.bookNowShow}
            bookNowText={chatConfig.bookNowText}
            bookNowUrl={chatConfig.bookNowUrl}
            sendEmailShow={chatConfig.sendEmailShow}
            sendEmailText={chatConfig.sendEmailText}
            ctaTwoShow={chatConfig.ctaTwoShow}
            ctaTwoText={chatConfig.ctaTwoText}
            ctaTwoUrl={chatConfig.ctaTwoUrl}
            ctaThreeShow={chatConfig.ctaThreeShow}
            ctaThreeText={chatConfig.ctaThreeText}
            ctaThreeUrl={chatConfig.ctaThreeUrl}
            onBookNow={handleBookNow}
            onSendEmail={handleSendEmail}
            onCTATwo={handleCTATwo}
            onCTAThree={handleCTAThree}
            brandColour={chatConfig.brandColour}
          />

          <ChatInput
            disabled={isLoading}
            onSendMessage={handleSendMessage}
            brandColour={chatConfig.brandColour}
          />
        </div>

        <ChatFooter />
      </div>

      <EmailFormModal
        isOpen={showEmailForm}
        onClose={() => setShowEmailForm(false)}
        chatbotId={chatbotId}
        brandColour={chatConfig.brandColour}
        bookNowClicksId={bookNowClicksId}
      />
    </>
  );
}
