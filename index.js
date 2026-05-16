require('dotenv').config();

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// API KEY

const API_KEY = process.env.API_KEY;

function auth(req, res, next) {

    const key = req.headers['x-api-key'];

    if (!key || key !== API_KEY) {

        return res.status(401).json({
            success: false,
            error: 'Invalid API Key'
        });

    }

    next();

}

// HOME

app.get('/', (req, res) => {

    res.json({
        success: true,
        message: 'Social AI API Online 🚀'
    });

});

// PROTEGER ROTAS

app.use(auth);

// GERAR LEGENDA

app.post('/instagram/caption', async (req, res) => {

    try {

        const { topic } = req.body;

        const response = await client.chat.completions.create({

            model: 'gpt-4.1-mini',

            messages: [
                {
                    role: 'system',
                    content: 'Você é especialista em Instagram.'
                },
                {
                    role: 'user',
                    content: `Crie uma legenda criativa sobre: ${topic}`
                }
            ]

        });

        res.json({

            success: true,
caption: response.choices[0].message.content,
powered_by: "Social AI API",
developer: "Vinicius España"
        });

    } catch (error) {

        res.status(500).json({

            success: false,
            error: error.message

        });

    }

});

// GERAR HASHTAGS

app.post('/instagram/hashtags', async (req, res) => {

    try {

        const { topic } = req.body;

        const response = await client.chat.completions.create({

            model: 'gpt-4.1-mini',

            messages: [
                {
                    role: 'user',
                    content: `Crie 20 hashtags para: ${topic}`
                }
            ]

        });

        res.json({

            success: true,
            hashtags: response.choices[0].message.content

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            error: error.message

        });

    }

});

// GERAR BIO

app.post('/instagram/bio', async (req, res) => {

    try {

        const { niche } = req.body;

        const response = await client.chat.completions.create({

            model: 'gpt-4.1-mini',

            messages: [
                {
                    role: 'user',
                    content: `Crie uma bio profissional de Instagram para: ${niche}`
                }
            ]

        });

        res.json({

            success: true,
            bio: response.choices[0].message.content

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            error: error.message

        });

    }

});

// TIKTOK HOOKS

app.post('/tiktok/hooks', async (req, res) => {

    try {

        const { topic } = req.body;

        const response = await client.chat.completions.create({

            model: 'gpt-4.1-mini',

            messages: [
                {
                    role: 'user',
                    content: `Crie 5 hooks virais de TikTok sobre: ${topic}`
                }
            ]

        });

        res.json({

            success: true,
            hooks: response.choices[0].message.content

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            error: error.message

        });

    }

});

// INICIAR SERVIDOR

app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`);

})
