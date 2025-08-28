import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, User, Bot, X, Sparkles, HelpCircle } from 'lucide-react';

const PatientChatbot = ({ patientFriendly, diagnosis }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: `Hello! I'm your Patient Advocate AI. I can help explain your results for ${diagnosis}. What would you like to know?` }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulated response logic
        setTimeout(() => {
            let response = "That's a great question. Based on your results, we recommend following your doctor's advice and monitoring your symptoms closely.";

            if (input.toLowerCase().includes('what') || input.toLowerCase().includes('diagnosis')) {
                response = `Your diagnosis is ${diagnosis}. In simple terms: ${patientFriendly}`;
            } else if (input.toLowerCase().includes('next') || input.toLowerCase().includes('do')) {
                response = "The next steps involve starting your prescribed treatment and scheduling a follow-up appointment in 2 weeks.";
            } else if (input.toLowerCase().includes('risk')) {
                response = "We've calculated your long-term risks based on your current health data. You can see these in the 'Health Risk Outlook' section of your dashboard.";
            }

            setMessages(prev => [...prev, { role: 'bot', content: response }]);
        }, 1000);
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-900/40 hover:bg-blue-500 transition-all group"
            >
                <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-[#0f172a] flex items-center justify-center text-[10px] font-bold">1</span>
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-24 right-8 z-50 w-full max-w-sm glass-card rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-slate-800 bg-blue-600/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/20">
                                    <Sparkles className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">Patient Advocate AI</h3>
                                    <div className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] text-slate-500 font-medium">Online & Ready</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-900/30"
                        >
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-700' : 'bg-blue-600/20'
                                            }`}>
                                            {msg.role === 'user' ? <User className="w-4 h-4 text-slate-300" /> : <Bot className="w-4 h-4 text-blue-400" />}
                                        </div>
                                        <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user'
                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Suggestions */}
                        <div className="p-2 border-t border-slate-800 bg-slate-900/50 flex gap-2 overflow-x-auto no-scrollbar">
                            {['Explain my diagnosis', 'What are next steps?', 'Show my risks'].map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(s)}
                                    className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-slate-400 whitespace-nowrap hover:border-blue-500/50 hover:text-blue-400 transition-all"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-slate-800 bg-slate-900/80">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask a question..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="mt-3 flex items-center justify-center gap-1.5">
                                <HelpCircle className="w-3 h-3 text-slate-600" />
                                <p className="text-[9px] text-slate-600 font-medium uppercase tracking-wider">AI-generated health information</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PatientChatbot;
