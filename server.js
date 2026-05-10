const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

app.post("/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        const completion = await client.chat.completions.create({
            model: "openai/gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: userMessage
                }
            ]
        });

        const reply = completion.choices[0].message.content;

        res.json({
            reply
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            reply: "Error occurred"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});