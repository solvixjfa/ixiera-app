'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ReactMarkdown from 'react-markdown'; // <-- Import penerjemah AI

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      let id = localStorage.getItem('chat_session_id');
      if (!id) {
        id = `sess-${Date.now()}`;
        localStorage.setItem('chat_session_id', id);
      }
      setSessionId(id);

      const { data } = await supabase.from('ai_conversations').select('messages').eq('session_id', id).maybeSingle();
      
      if (data?.messages && data.messages.length > 0) {
        setMessages(data.messages);
      } else {
        setMessages([
          { 
            role: 'assistant', 
            content: 'Halo Kak! 👋 Aku asisten AI dari Ixiera. Ada yang bisa aku bantu untuk kebutuhan website, automasi, atau AI untuk bisnis Kakak?' 
          }
        ]);
      }
    };
    init();
  }, [supabase]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const newMsgs = [...messages, { role: 'user', content: input }];
    setMessages(newMsgs);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs, sessionId }),
      });

      const data = await res.json();
      if (data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING BUTTON (Support Dark Mode) */}
      <button 
        onClick={() => setIsOpen(true)} 
        className={`fixed bottom-6 right-6 z-[9990] flex h-16 w-16 items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black shadow-2xl transition-transform hover:scale-105 active:scale-95 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle size={28} />
      </button>

      {/* FULL SCREEN CHAT OVERLAY (Support Dark Mode) */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex flex-col bg-white dark:bg-zinc-950 animate-in fade-in zoom-in-95 duration-200">
          
          {/* HEADER ELEGANT */}
          <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 dark:border-zinc-800 bg-black dark:bg-zinc-900 px-6 py-4 text-white shadow-sm">
            <div>
              <h2 className="text-xl font-bold tracking-[0.2em] uppercase">Ixiera AI</h2>
              <p className="text-xs tracking-wider text-gray-400">Tech & Automation Assistant</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-2 text-gray-300 transition-colors hover:bg-gray-800 dark:hover:bg-zinc-700">
              <X size={28} />
            </button>
          </div>

          {/* AREA CHAT */}
          <div className="flex-1 overflow-y-auto bg-[#fafafa] dark:bg-zinc-950 p-4 sm:p-8">
            <div className="mx-auto max-w-3xl space-y-6 pb-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 text-[15px] leading-relaxed shadow-sm ${
                      m.role === 'user' 
                        ? 'bg-black text-white dark:bg-zinc-100 dark:text-black rounded-br-none' 
                        : 'bg-white text-black dark:bg-zinc-900 dark:text-gray-100 border border-gray-200 dark:border-zinc-800 rounded-bl-none'
                    }`}
                  >
                   {/* INI KUNCI RAPIHNYA: Bungkus pakai div biar TypeScript gak ngamuk */}
                    <div className="text-sm sm:text-[15px] [&>p]:mb-2 [&>p:last-child]:mb-0 [&>strong]:font-bold [&>ol]:list-decimal [&>ol]:ml-5 [&>ul]:list-disc [&>ul]:ml-5 [&>li]:mb-1">
                      <ReactMarkdown>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* ANIMASI LOADING (3 Titik) */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 rounded-2xl rounded-bl-none border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4 shadow-sm">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500 delay-75"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500 delay-150"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* AREA INPUT (Fix Text Putih Hilang) */}
          <div className="flex-shrink-0 border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 sm:p-6 pb-safe">
            <div className="mx-auto flex max-w-3xl items-center gap-3">
              <Input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} 
                placeholder="Tanya soal layanan, harga, atau AI..." 
                className="flex-1 rounded-full border-gray-300 dark:border-zinc-700 bg-transparent text-gray-900 dark:text-white px-6 py-6 text-base shadow-sm focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white placeholder:text-gray-400"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading} 
                className="h-14 w-14 shrink-0 rounded-full bg-black text-white dark:bg-zinc-100 dark:text-black transition-transform hover:bg-gray-800 dark:hover:bg-zinc-300 active:scale-95"
              >
                <Send size={20}/>
              </Button>
            </div>
          </div>

        </div>
      )}
    </>
  );
}