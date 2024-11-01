const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'Chat API is running' });
});

app.post('/api/chat/message', async (req, res) => {
    try {
        const { message } = req.body;
        
        // DeepSeek API调用
        const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
            messages: [{ role: 'user', content: message }],
            model: 'deepseek-chat',
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});