'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface Msg {
  text: string;
  isUser: boolean;
  key: string;
}

export default function ChatWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ text: '', isUser: false, key: 'greeting' }]);
  const [inputValue, setInputValue] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: inputValue, isUser: true, key: '' }]);
    setInputValue('');

    // Fake bot response after 1s
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: '', isUser: false, key: 'bot_reply' }]);
    }, 1000);
  };

  const getMessageText = (msg: Msg) => {
    if (msg.key === 'greeting') return t('chat_greeting');
    if (msg.key === 'bot_reply') return t('chat_bot_reply');
    return msg.text;
  };

  return (
    <div className="fixed bottom-5 right-5 z-[90] ss-no-print">
      {/* launcher */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label={t('chat_support')}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 hover:bg-accent-600"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button>
      )}

      {/* window */}
      {isOpen && (
        <div className="ss-fade-up flex h-[420px] w-[330px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-ink-300 bg-white shadow-2xl">
          {/* header */}
          <div className="flex items-center justify-between bg-brand-500 px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <div>
                <p className="text-[13.5px] font-bold leading-tight">{t('chat_support')}</p>
                <p className="text-[11px] leading-tight text-white/65">SportStore</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 text-white/75 transition-colors hover:bg-white/15 hover:text-white"
              aria-label={t('cart_close')}
            >
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* messages */}
          <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto bg-ink-50 p-3.5">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow-sm ${
                    msg.isUser
                      ? 'rounded-br-md bg-accent-500 text-white'
                      : 'rounded-bl-md border border-ink-300 bg-white text-ink-900'
                  }`}
                >
                  {getMessageText(msg)}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* composer */}
          <form onSubmit={handleSend} className="flex gap-2 border-t border-ink-300 bg-white p-3">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('chat_placeholder')}
              className="min-w-0 flex-1 rounded-full border border-ink-300 px-4 py-2 text-[13px] text-ink-900 placeholder:text-ink-500"
            />
            <button
              type="submit"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-500 text-white transition-colors hover:bg-accent-600"
              aria-label="Send"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
