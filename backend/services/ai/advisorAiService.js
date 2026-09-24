const getAIRecommendations = async (messages, availableCourses) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const courseCatalog = JSON.stringify(availableCourses.map(c => ({ 
        id: c._id ? c._id.toString() : c.id, 
        title: c.title, 
        description: c.description 
    })));

    const systemPrompt = `
You are an intelligent educational advisor for an E-Learning platform.
Your goal is to analyze the student's learning request and recommend the most suitable courses straight from our catalog based on meaning and concepts (semantic matching), NOT just exact keywords.
For example, if a student asks for "computer science", you should recommend courses related to software, programming, algorithms, AI, etc., even if the word "computer science" is not in the title. THINK about what the student actually wants to learn.

Here is the available course catalog:
${courseCatalog}

Instructions:
1. If the student's request is vague, ask a clarifying question.
2. Otherwise, use your reasoning to select up to 4 of the best matching courses from the catalog that conceptually fit their needs.
3. Provide a friendly, encouraging message explaining why you selected these courses.
4. ALWAYS return your response as a strictly valid JSON object exactly matching this structure (no markdown formatting, no comments):
{
    "message": "Your friendly explanation or clarifying question.",
    "recommendedCourseIds": ["course_id_1", "course_id_2"]
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
                    if (parsed.recommendedCourseIds && Array.isArray(parsed.recommendedCourseIds) && parsed.recommendedCourseIds.length > 0) {
                        recommendedCourses = availableCourses.filter(course => {
                            const courseId = course._id ? course._id.toString() : course.id;
                            return parsed.recommendedCourseIds.includes(courseId);
                        });
                    }

                    return {
                        message: parsed.message,
                        courses: recommendedCourses.slice(0, 4)
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
            ? "Here are some courses that match to your request:"
            : "I couldn't find any courses matching those exact keywords.",
        courses: fallbackMatches.slice(0, 3)
    };
};

module.exports = { getAIRecommendations };
