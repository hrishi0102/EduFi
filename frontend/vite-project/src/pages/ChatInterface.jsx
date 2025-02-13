import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Bot, User } from "lucide-react";

const ChatMessage = ({ message, isUser }) => (
  <div
    className={`flex items-start ${
      isUser ? "justify-end" : "justify-start"
    } mb-4`}
  >
    {!isUser && (
      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-2">
        <Bot className="w-4 h-4 text-emerald-400" />
      </div>
    )}
    <div
      className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
        isUser
          ? "bg-emerald-500 text-slate-900 rounded-br-sm"
          : "bg-slate-800/80 text-slate-200 rounded-bl-sm border border-slate-700/50"
      }`}
    >
      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message}</p>
    </div>
    {isUser && (
      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center ml-2">
        <User className="w-4 h-4 text-emerald-400" />
      </div>
    )}
  </div>
);

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your AI Loan Advisor. I can help you with:\n• Understanding loan requirements\n• Application process\n• Documentation needed\n• Repayment schedules\n\nWhat would you like to know?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/ai/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error. Please try again.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-8">
      <div className="max-w-4xl mx-auto p-8 relative">
        <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />

        <div className="relative mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
            AI Loan Advisor
          </h1>
          <p className="text-slate-400 mt-2">
            Your personal guide through the education loan process
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-xl overflow-hidden">
          <div className="flex flex-col h-[600px]">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg.text} isUser={msg.isUser} />
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700/50">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-slate-700/50 bg-slate-800/30"
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about education loans..."
                  className="flex-1 p-3 bg-slate-900/50 border border-slate-700 rounded-lg 
                           text-slate-200 placeholder-slate-500
                           focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                           transition-all duration-300"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="p-3 bg-emerald-500 text-slate-900 rounded-lg
                           hover:bg-emerald-400 focus:outline-none focus:ring-2 
                           focus:ring-emerald-500 focus:ring-offset-2 
                           focus:ring-offset-slate-800 disabled:bg-emerald-500/50
                           transition-all duration-300 hover:shadow-lg
                           hover:shadow-emerald-500/20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
