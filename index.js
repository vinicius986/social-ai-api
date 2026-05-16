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

        const { topic, tone = "motivacional", quantity = 3 } = req.body;

        const response = await client.chat.completions.create({

            model: 'gpt-4.1-mini',

            messages: [
                {
                    role: 'system',
                    content: 'Você é um especialista em marketing, Instagram e copywriting para redes sociais.'
                },
                {
                    role: 'user',
                    content: `
Crie ${quantity} legendas para Instagram sobre: ${topic}.

Tom desejado: ${tone}.

Regras:
- Escreva em português do Brasil.
- Cada legenda deve ser curta, criativa e pronta para postar.
- Inclua emojis quando fizer sentido.
- Inclua uma chamada para ação no final.
- Não escreva explicações.
- Retorne apenas em formato JSON válido.

Formato obrigatório:
{
  "captions": [
    "legenda 1",
    "legenda 2",
    "legenda 3"
  ]
}
`
                }
            ]

        });

        const content = response.choices[0].message.content;

        let parsed;

        try {
            parsed = JSON.parse(content);
        } catch {
            parsed = {
                captions: [content]
            };
        }

        res.json({
            success: true,
            topic,
            tone,
            quantity,
            captions: parsed.captions,
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
// YOUTUBE TITLE

app.post('/youtube/title', async (req, res) => {
    try {
        const { topic } = req.body;

        const response = await client.chat.completions.create({
            model: 'gpt-4.1-mini',
            messages: [
                {
                    role: 'user',
                    content: `Crie 10 títulos chamativos para YouTube sobre: ${topic}`
                }
            ]
        });

        res.json({
            success: true,
            titles: response.choices[0].message.content,
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

// YOUTUBE DESCRIPTION

app.post('/youtube/description', async (req, res) => {
    try {
        const { topic } = req.body;

        const response = await client.chat.completions.create({
            model: 'gpt-4.1-mini',
            messages: [
                {
                    role: 'user',
                    content: `Crie uma descrição otimizada para YouTube sobre: ${topic}`
                }
            ]
        });

        res.json({
            success: true,
            description: response.choices[0].message.content,
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

// COPY CTA

app.post('/copy/cta', async (req, res) => {
    try {
        const { product } = req.body;

        const response = await client.chat.completions.create({
            model: 'gpt-4.1-mini',
            messages: [
                {
                    role: 'user',
                    content: `Crie 10 chamadas para ação para vender: ${product}`
                }
            ]
        });

        res.json({
            success: true,
            ctas: response.choices[0].message.content,
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

// COPY SALES

app.post('/copy/sales', async (req, res) => {
    try {
        const { product } = req.body;

        const response = await client.chat.completions.create({
            model: 'gpt-4.1-mini',
            messages: [
                {
                    role: 'user',
                    content: `Crie uma copy curta e persuasiva para vender: ${product}`
                }
            ]
        });

        res.json({
            success: true,
            copy: response.choices[0].message.content,
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
// PRODUCT DESCRIPTION

app.post('/product/description', async (req, res) => {
    try {
        const { product, tone = "persuasivo" } = req.body;

        const response = await client.chat.completions.create({
            model: 'gpt-4.1-mini',
            messages: [
                {
                    role: 'user',
                    content: `Crie uma descrição de produto profissional para: ${product}. Tom: ${tone}. Escreva em português do Brasil.`
                }
            ]
        });

        res.json({
            success: true,
            product,
            tone,
            description: response.choices[0].message.content,
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

// EMAIL MARKETING

app.post('/email/marketing', async (req, res) => {
    try {
        const { product, audience = "clientes em potencial" } = req.body;

        const response = await client.chat.completions.create({
            model: 'gpt-4.1-mini',
            messages: [
                {
                    role: 'user',
                    content: `Crie um email marketing persuasivo para vender ${product} para ${audience}. Inclua assunto, corpo do email e CTA.`
                }
            ]
        });

        res.json({
            success: true,
            product,
            audience,
            email: response.choices[0].message.content,
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

// COPY HEADLINE

app.post('/copy/headline', async (req, res) => {
    try {
        const { product, quantity = 10 } = req.body;

        const response = await client.chat.completions.create({
            model: 'gpt-4.1-mini',
            messages: [
                {
                    role: 'user',
                    content: `Crie ${quantity} headlines chamativas e persuasivas para vender: ${product}.`
                }
            ]
        });

        res.json({
            success: true,
            product,
            headlines: response.choices[0].message.content,
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
// INICIAR SERVIDOR

app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`);

})
