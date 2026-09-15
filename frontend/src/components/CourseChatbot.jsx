import { useState, useRef, useEffect } from 'react';
import { Send, BookOpen, X } from 'lucide-react';
import { getAIRecommendations } from '../services/aiRecommendationService';

const CourseChatbot = ({ courses, onEnroll }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Hi! I'm your AI advisor. What would you like to learn today?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const endRef = useRef(null);

    useEffect(() => {
        if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const recommendedData = await getAIRecommendations(userMsg.text);
            const recommended = recommendedData.courses || [];
            const aiMsg = { 
                id: Date.now() + 1, 
                sender: 'ai', 
                text: recommendedData.message || (recommended.length > 0 ? "Here are some courses that match your request:" : "I couldn't find exact matches. Try rephrasing!"),
                courses: recommended 
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { id: Date.now()+1, sender: 'ai', text: 'Sorry, I encountered an error linking to my brain.' }]);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center hover:-translate-y-1 hover:shadow-2xl transition-all cursor-pointer z-50"
            >
                <BookOpen size={28} />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-[350px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-50 h-[500px]">
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <BookOpen size={20} />
                    <span className="font-bold text-sm">AI Course Advisor</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-blue-100 hover:text-white cursor-pointer transition-colors"><X size={18}/></button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
                {messages.map(m => (
                    <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`p-3 max-w-[85%] text-sm ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-2xl rounded-br-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-sm shadow-sm'}`}>
                            {m.text}
                        </div>
                        {m.courses && m.courses.length > 0 && (
                            <div className="mt-2 space-y-2 w-[90%]">
                                {m.courses.map(c => (
                                    <div key={c._id} className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-sm text-xs cursor-pointer hover:border-blue-400 hover:shadow-md transition-all" onClick={() => window.scrollTo(0, 0)}>
                                        <span className="font-bold text-slate-800 block truncate mb-1">{c.title}</span>
                                        <span className="text-slate-500 block truncate">{c.description}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {loading && (
                    <div className="flex items-start">
                        <div className="p-3 bg-white border border-slate-200 text-slate-400 rounded-2xl rounded-bl-sm shadow-sm text-xs italic">
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={endRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
                <input 
                    type="text" 
                    value={input} 
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask about a topic..." 
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-400 focus:bg-white"
                />
                <button type="submit" disabled={loading} className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 cursor-pointer transition-colors shadow-sm focus:outline-none">
                    <Send size={16} />
                </button>
            </form>
        </div>
    );
};

export default CourseChatbot;
