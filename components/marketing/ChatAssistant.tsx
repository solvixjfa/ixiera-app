'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

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
      
      // LOGIKA SAMBUTAN AMAN: Cek apakah riwayat chat ada. Kalau kosong, masukkan sambutan awal.
      if (data?.messages && data.messages.length > 0) {
        setMessages(data.messages);
      } else {
        setMessages([
          { 
            role: 'assistant', 
            content: 'Halo! Saya asisten AI dari ixiera.id. Ada yang bisa saya bantu terkait layanan pembuatan website, automasi, atau AI assistant hari ini?' 
          }
        ]);
      }
    };
    init();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

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
      <button onClick={() => setIsOpen(true)} className={`fixed bottom-6 right-6 z-[9999] rounded-full bg-black p-4 text-white ${isOpen ? 'hidden' : 'block'}`}>
        <MessageCircle />
      </button>

      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-[9999] w-[350px] h-[500px] flex flex-col shadow-2xl border-2 border-black">
          <div className="p-4 bg-black text-white flex justify-between items-center">
            <span className="font-bold">IXIERA AI</span>
            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2 rounded-lg text-sm ${m.role === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-black border'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t flex gap-2 bg-white">
            <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Tanya sesuatu..." />
            <Button onClick={handleSendMessage} disabled={isLoading} className="bg-black text-white"><Send size={16}/></Button>
          </div>
        </Card>
      )}
    </>
  );
}