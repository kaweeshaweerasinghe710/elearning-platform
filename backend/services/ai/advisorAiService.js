const getAIRecommendations = async (messages, availableCourses) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const systemPrompt = `
You are a friendly student personal assistant for an E-Learning platform. 
Your goal is to recommend the best courses to a student based on their request.

Available courses (JSON):
${JSON.stringify(availableCourses.map(c => ({ id: c._id, title: c.title, description: c.description })))}
Instructions:
1. If the student's request is vague or unclear, ask a clarifying question to understand what they want to learn.
2. If the student asks for a topic or skill, find the most suitable courses from the JSON list provided and return their IDs in the \`courseIds\` array (max 3).
3. In your \`message\`, you MUST provide a short, friendly explanation of WHY these specific courses match their request. Do not just list the course names in the message.
4. ALWAYS return ONLY a valid JSON object matching this structure exactly (no markdown formatting, just raw JSON):
{
    "message": "Your explanation of why these courses are suitable (or your clarifying question).\\nUse line breaks if needed.",
    "courseIds": ["id1", "id2"] // Leave this array empty if you are just asking a clarifying question.
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
                    temperature: 0.7
                })
            });

            if (response.ok) {
                const data = await response.json();
                let content = data.choices[0].message.content;
                content = content.replace(/```json/gi, '').replace(/```/g, '').trim();
                
                try {
                    const parsed = JSON.parse(content);
                    
                    const recommendedCourses = parsed.courseIds
                        .map(id => availableCourses.find(c => c._id.toString() === id))
                        .filter(Boolean);

                    return {
                        message: parsed.message,
                        courses: recommendedCourses
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
    const lowerPrompt = lastUserMessage.toLowerCase();
    const keywords = lowerPrompt.split(/\s+/).filter(w => w.length > 3 && !['want', 'this', 'that', 'what', 'should', 'would', 'could'].includes(w));
    
    let fallbackMatches = [];
    if (keywords.length > 0) {
        fallbackMatches = availableCourses.filter(course => {
            const title = (course.title || "").toLowerCase();
            const desc = (course.description || "").toLowerCase();
            return keywords.some(keyword => title.includes(keyword) || desc.includes(keyword));
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
