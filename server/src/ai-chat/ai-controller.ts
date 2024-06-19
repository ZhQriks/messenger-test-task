import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
});

class AiController {
    chatCompletion = async (req, res) => {
        const input = req.query.input || "Default input";
        if (input === 'TriggerError') {
            res.status(500).send('Error message or code');
            return; 
        }

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", "You are a friend to people without friends so please be polite and feel the user!"],
            ["human", input],
        ]);

        const outputParser = new StringOutputParser();
        const chain = prompt.pipe(model).pipe(outputParser);

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        try {
            const responseStream = await chain.stream({ input });
            for await (const item of responseStream) {
                res.write(`${item}`);
            }
            res.end();
        } catch (error) {
            console.error('Error streaming chat completion:', error);
            res.status(500).send('Error streaming chat completion');
        }
    }   
}

export default AiController;