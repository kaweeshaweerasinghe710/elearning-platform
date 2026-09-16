const getAIRecommendations = async (messages, availableCourses) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const systemPrompt = `
You are a friendly student personal assistant for an E-Learning platform. 
Your goal is to recommend the best courses to a student based on their request.

Available courses (JSON):
${JSON.stringify(availableCourses.map(c => ({ id: c._id, title: c.title, description: c.description })))}
Instructions:
1. If the student's request is vague or unclear, ask a clarifying question to understand what they want to learn.
2. If the student's request is clear and specific, recommend up to 3 matching courses and provide a short, friendly explanation.
3. Use line breaks (\\n) to clearly separate your points in the message.
4. ALWAYS return ONLY a valid JSON object matching this structure exactly (no markdown formatting, just raw JSON):
{
    "message": "Your clear message with \\n line breaks here. (Either a clarifying question or the recommendation explanation).",
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
                const content = data.choices[0].message.content;
                const parsed = JSON.parse(content);
                
                const recommendedCourses = parsed.courseIds
                    .map(id => availableCourses.find(c => c._id.toString() === id))
                    .filter(Boolean);

                return {
                    message: parsed.message,
                    courses: recommendedCourses
                };
            } else {
                console.error("OpenAI API error:", await response.text());
            }
        } catch (error) {
            console.error("AI API Error:", error);
        }
    }


    const lastUserMessage = messages.slice().reverse().find(m => m.role === 'user')?.content || "";
    const lowerPrompt = lastUserMessage.toLowerCase();
    let fallbackMatches = availableCourses.filter(course => 
        (course.title && course.title.toLowerCase().includes(lowerPrompt)) || 
        (course.description && course.description.toLowerCase().includes(lowerPrompt))
    );

    if (fallbackMatches.length === 0 && availableCourses.length > 0) {
        fallbackMatches = availableCourses.slice(0, 2);
    }

    return {
        message: fallbackMatches.length > 0 
            ? "Here are the best courses I found for you based on your request:"
            : "I couldn't find exact matches for that topic, but here are some suggestions:",
        courses: fallbackMatches.slice(0, 3)
    };
};

const getAIChatResponse = async (userPrompt) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const systemPrompt = `
You are a helpful and friendly student personal assistant for an E-Learning platform. 
Your goal is to answer the student's general questions, give study advice, and help them navigate their learning journey.
Reply with clear, helpful text. Use line breaks (\\n) for readability. Do not return JSON.
`;

    if (apiKey) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userPrompt }
                    ],
                    temperature: 0.7
                })
            });

            if (response.ok) {
                const data = await response.json();
                return { message: data.choices[0].message.content };
            } else {
                console.error("OpenAI API error:", await response.text());
            }
        } catch (error) {
            console.error("AI API Error:", error);
        }
    }
    return {
        message: "I am your AI study assistant! However, my OpenAI API key is not configured, so I can only offer limited help right now."
    };
};

module.exports = {
    getAIRecommendations,
    getAIChatResponse
};
