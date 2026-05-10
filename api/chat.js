const OpenAI = require("openai");

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

module.exports = async (req, res) => {

    if (req.method !== "POST") {
        return res.status(405).json({
            reply: "Method not allowed"
        });
    }

    try {

        const { message } = req.body;

        const completion = await client.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: message
                }
            ]
        });

        res.status(200).json({
            reply: completion.choices[0].message.content
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            reply: "Error occurred"
        });
    }
};