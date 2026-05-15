import React, { useState, useEffect, useRef } from 'react';

// --- Types ---
interface Message {
  role: 'user' | 'assistant';
  content: string;
  thinking?: string; // Für die Reasoning-Logs von DeepSeek-R1
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatisches Scrollen nach unten
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ollamaHost = process.env.OLLAMA_HOST || 'http://localhost:11434';
      const ollamaModel = process.env.OLLAMA_MODEL || 'deepseek-r1:8b';
      const response = await fetch(`${ollamaHost}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: ollamaModel,
          messages: [...messages, userMessage],
          stream: false,
        }),
      });

      if (!response.ok) throw new Error('Ollama nicht erreichbar. Läuft der Dienst?');

      const data = await response.json();
      
      // DeepSeek-R1 schickt oft den Denkprozess in <think> Tags mit
      const fullContent = data.message.content;
      const thinkingMatch = fullContent.match(/<think>([\s\S]*?)<\/think>/);
      const cleanContent = fullContent.replace(/<think>[\s\S]*?<\/think>/, '').trim();

      const assistantMessage: Message = {
        role: 'assistant',
        content: cleanContent,
        thinking: thinkingMatch ? thinkingMatch[1] : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Fehler: Verbindung zum Leviathan fehlgeschlagen. Stelle sicher, dass Ollama lokal läuft." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-cyan-500 font-mono flex flex-col p-4 md:p-8">
      {/* Header */}
      <header className="border-b border-cyan-900 pb-4 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter uppercase italic">
            Leviathan <span className="text-white">v1.0</span>
          </h1>
          <p className="text-xs text-cyan-800 italic">RainbowHole Protocol - Peer-to-Peer Electronic Intelligence</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
          <span className="text-[10px] uppercase tracking-widest text-cyan-700">Node: Localhost</span>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-6 mb-6 px-2 border-l border-cyan-950">
        {messages.length === 0 && (
          <div className="text-cyan-900 opacity-50 italic text-sm py-20 text-center">
            &gt; Initialisiere dezentralen Geist... Warte auf Input.
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-4 border ${msg.role === 'user' ? 'border-cyan-800 bg-cyan-950/20' : 'border-cyan-900/50 bg-black/60'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-widest text-cyan-700">
                {msg.role === 'user' ? '> Operator' : '> Leviathan'}
              </span>
              <div className={`h-1 w-1 rounded-full ${msg.role === 'user' ? 'bg-cyan-500' : 'bg-green-500'}`} />
            </div>
            {msg.thinking && (
              <details className="mb-2 group">
                <summary className="text-[10px] text-cyan-700 cursor-pointer hover:text-cyan-500 uppercase tracking-widest">
                  [+] Reasoning Trace
                </summary>
                <pre className="mt-1 text-xs text-cyan-700/80 whitespace-pre-wrap font-mono border-l border-cyan-900 pl-3">
                  {msg.thinking}
                </pre>
              </details>
            )}
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-cyan-900 pt-4">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="[ Eingabe..." 
            className="flex-1 bg-black border border-cyan-800 px-4 py-3 text-sm text-cyan-500 placeholder-cyan-800 font-mono outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-cyan-900/30 border border-cyan-700 text-cyan-500 text-sm uppercase tracking-widest font-mono hover:bg-cyan-800/40 hover:border-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Senden
          </button>
        </form>
      </div>

      {/* Scroll Anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default App;
