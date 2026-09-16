const getAIRecommendations = async (userPrompt, availableCourses) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const systemPrompt = `
You are an expert student advisor for an E-Learning platform. 
Your goal is to recommend the best courses to a student based on their request.

Here are the available courses in our database (in JSON format):
${JSON.stringify(availableCourses.map(c => ({ id: c._id, title: c.title, description: c.description })))}

Instructions:
1. Analyze the student's request.
2. Select up to 3 courses that best match their needs.
3. Return ONLY a valid JSON object in the following format, with no markdown formatting or extra text:
{
    "message": "A short, friendly message explaining why you chose these courses.",
    "courseIds": ["id1", "id2"]
}
`;

    if (apiKey) {
        try {
            console.warn("AI Service: API Key found but fetch logic is commented out.");
        } catch (error) {
            console.error("AI API Error:", error);
            throw new Error("Failed to communicate with AI provider.");
        }
    }


    const lowerPrompt = userPrompt.toLowerCase();
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

module.exports = {
    getAIRecommendations
};
