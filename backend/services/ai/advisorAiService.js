const getAIRecommendations = async (messages, availableCourses) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const systemPrompt = `
You are an intelligent educational advisor for an E-Learning platform. 
Your goal is to analyze the student's learning request, provide a helpful response, and identify the key topics or skills they are looking for.

Instructions:
1. If the student's request is vague or unclear, ask a clarifying question to understand what they want to learn.
2. Otherwise, identify the core topics, skills, or concepts the student is asking about.
3. Extract 1 to 4 highly relevant keywords from their request that can be used to search our course catalog.
4. Provide a friendly, encouraging message explaining why learning these topics is beneficial.
5. ALWAYS return your response as a strictly valid JSON object exactly matching this structure (no markdown formatting, no comments, just raw JSON):
{
    "message": "Your friendly explanation or clarifying question.",
    "keywords": ["keyword1", "keyword2"] // array of extracted keywords, or empty if asking a clarifying question
}
`;

    if (apiKey) {
        try {
            const apiMessages = [
                { role: 'system', content: systemPrompt },
                ...messages.map(m => ({ role: m.role, content: m.content }))
            ];

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: apiMessages,
                    temperature: 0.3
                })
            });

            if (response.ok) {
                const data = await response.json();
                let content = data.choices[0].message.content;
                content = content.replace(/```json/gi, '').replace(/```/g, '').trim();
                
                try {
                    const parsed = JSON.parse(content);
                    
                    let recommendedCourses = [];
                    if (parsed.keywords && Array.isArray(parsed.keywords) && parsed.keywords.length > 0) {
                        const lowerKeywords = parsed.keywords.map(k => k.toLowerCase());
      
                        recommendedCourses = availableCourses.filter(course => {
                            const title = (course.title || "").toLowerCase();
                            const desc = (course.description || "").toLowerCase();
                            
    
                            return lowerKeywords.some(keyword => title.includes(keyword) || desc.includes(keyword));
                        });
                        
                     
                        recommendedCourses.sort((a, b) => {
                            const titleA = (a.title || "").toLowerCase();
                            const titleB = (b.title || "").toLowerCase();
                            const descA = (a.description || "").toLowerCase();
                            const descB = (b.description || "").toLowerCase();
                            
                            const scoreA = lowerKeywords.reduce((acc, kw) => acc + (titleA.includes(kw) ? 3 : 0) + (descA.includes(kw) ? 1 : 0), 0);
                            const scoreB = lowerKeywords.reduce((acc, kw) => acc + (titleB.includes(kw) ? 3 : 0) + (descB.includes(kw) ? 1 : 0), 0);
                            
                            return scoreB - scoreA;
                        });
                    }

                    return {
                        message: parsed.message,
                        courses: recommendedCourses.slice(0, 4) // Show top 4 recommended courses
                    };
                } catch (parseError) {
                    console.error("Failed to parse AI JSON response:", content);
                }
            } else {
                console.error("OpenAI API error:", await response.text());
            }
        } catch (error) {
            console.error("AI API Error:", error);
        }
    }


    const lastUserMessage = messages.slice().reverse().find(m => m.role === 'user')?.content || "";
    const lowerPrompt = lastUserMessage.toLowerCase().replace(/[^\w\s]/g, ""); 
   
    const stopWords = ['want', 'this', 'that', 'what', 'should', 'would', 'could', 'learn', 'learning', 'course', 'courses', 'about', 'some', 'please', 'teach', 'give', 'show', 'best', 'good', 'need', 'help', 'find', 'from', 'with', 'have', 'make', 'know', 'tell'];
    
    const keywords = lowerPrompt.split(/\s+/).filter(w => w.length > 2 && !stopWords.includes(w));
    
    let fallbackMatches = [];
    if (keywords.length > 0) {
        fallbackMatches = availableCourses.filter(course => {
            const title = (course.title || "").toLowerCase();
            const desc = (course.description || "").toLowerCase();
        
            return keywords.some(keyword => title.includes(keyword) || desc.includes(keyword));
        });
        
        fallbackMatches.sort((a, b) => {
            const titleA = (a.title || "").toLowerCase();
            const titleB = (b.title || "").toLowerCase();
            const descA = (a.description || "").toLowerCase();
            const descB = (b.description || "").toLowerCase();
            
            const scoreA = keywords.reduce((score, kw) => score + (titleA.includes(kw) ? 3 : 0) + (descA.includes(kw) ? 1 : 0), 0);
            const scoreB = keywords.reduce((score, kw) => score + (titleB.includes(kw) ? 3 : 0) + (descB.includes(kw) ? 1 : 0), 0);
            
            return scoreB - scoreA;
        });
    }

    return {
        message: fallbackMatches.length > 0 
            ? "Here are some courses that match the keywords in your request:"
            : "I couldn't find any courses matching those exact keywords.",
        courses: fallbackMatches.slice(0, 3)
    };
};

module.exports = { getAIRecommendations };
