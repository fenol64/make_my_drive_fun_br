import 'dotenv/config';
import express, { Request, Response } from "express";
import { json } from 'body-parser';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { getRoutePrompt, getSystemPrompt } from './prompts';
const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.post('/get-route', async (req: Request, res: Response): Promise<void> => {

    const { start_address, end_address, date_of_going, date_of_returning, max_route_desviation } = req.body;

    if (!start_address || !end_address) {
        res.status(400).json({ error: 'Missing start_address or end_address' });
        return;
    }

    const ai_prompt = getRoutePrompt({
      start_address,
      end_address,
      date_of_going,
      date_of_returning,
      max_route_desviation,
    });

  const ai_response = await generateText({
    model: google('gemini-1.5-flash'),
    system: getSystemPrompt(),
    prompt: ai_prompt,
  })

  const formatted_response = ai_response.text.replace(/```json/g, '').replace(/```/g, '');

  res.json({
    ai_response: JSON.parse(formatted_response),
  });

});

app.get('/', (req: Request, res: Response): void => {
    res.json({
        message: 'Welcome to the AI Route Planner API',
        routes: {
            get_route: {
                method: 'POST',
                description: 'Get a route based on start and end addresses, dates, and max deviation',
                url: '/get-route',
                parameters: {
                    start_address: 'Starting address for the route',
                    end_address: 'Ending address for the route',
                    date_of_going: 'Date of departure',
                    date_of_returning: 'Date of return',
                    max_route_desviation: 'Maximum allowed deviation from the route',
                },
            },
        },

    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});