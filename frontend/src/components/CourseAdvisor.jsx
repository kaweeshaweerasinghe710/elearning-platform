import { useState, useRef, useEffect } from 'react';
import { Loader2, Send } from 'lucide-react';
import { getAIRecommendations } from '../services/aiRecommendationService';

const CourseAdvisor = ({ onEnroll }) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Tell me what you want to learn and I'll find the perfect courses for you!" }
    ]);
    const endRef = useRef(null);

    useEffect(() => {
        if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        const userMsg = { id: Date.now(), sender: 'user', text: input };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const apiMessages = newMessages
                .filter(m => m.sender === 'user' || m.sender === 'ai')
                .map(m => ({
                    role: m.sender === 'user' ? 'user' : 'assistant',
                    content: m.text
                }));

            const data = await getAIRecommendations(apiMessages);
            const aiMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: data.message,
                courses: data.courses || []
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "Sorry, I couldn't connect to my brain. Try again later!" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden sticky top-6 flex flex-col h-[600px]">
            <div className="bg-blue-400 p-4 text-white">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg"> Course Advisor</h3>
                </div>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
                {messages.map(m => (
                    <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`p-3 max-w-[90%] text-sm whitespace-pre-wrap ${m.sender === 'user' ? 'bg-blue-500 text-white rounded-2xl rounded-br-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-sm shadow-sm'}`}>
                            {m.text}
                        </div>
                        {m.courses && m.courses.length > 0 && (
                            <div className="mt-2 space-y-2 w-full">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Recommendations</h4>
                                {m.courses.map(course => (
                                    <div key={course._id} className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:border-blue-300 transition-colors">
                                        <h5 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">{course.title}</h5>
                                        <p className="text-xs text-slate-500 line-clamp-2 mb-3">{course.description}</p>
                                        <button 
                                            onClick={() => onEnroll(course._id)}
                                            className="w-full py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded transition-colors"
                                        >
                                            Enroll Now
                                        </button>
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

            <form onSubmit={handleSearch} className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
                <input 
                    type="text" 
                    value={input} 
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask for recommendations..." 
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-400 focus:bg-white"
                />
                <button type="submit" disabled={loading || !input.trim()} className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 disabled:opacity-50 cursor-pointer transition-colors shadow-sm focus:outline-none">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
            </form>
        </div>
    );
};

export default CourseAdvisor;
