import { useState, useRef, useEffect } from 'react';
import { getAIRecommendations } from '../services/aiRecommendationService';

export const useCourseAdvisor = () => {
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

    return { input, setInput, loading, messages, endRef, handleSearch };
};
