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
                    temperature: 0.5
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

module.exports = { getAIChatResponse };
