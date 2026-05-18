import axios from 'axios';
import Employee from '../models/Employee.js';

const fallbackRecommendation = (employees) => {
  const sorted = [...employees].sort((a, b) => b.performanceScore - a.performanceScore);
  return {
    summary: 'AI key is missing, so rule-based recommendations are shown.',
    rankings: sorted.map((e, i) => ({ rank: i + 1, name: e.name, score: e.performanceScore })),
    recommendations: sorted.map(e => ({
      employee: e.name,
      promotion: e.performanceScore >= 85 && e.experience >= 2 ? 'Recommended for promotion' : 'Not ready for promotion yet',
      training: e.performanceScore < 70 ? 'Needs performance improvement training' : 'Advanced skill enhancement suggested',
      feedback: e.performanceScore >= 85 ? 'High performer with strong growth potential.' : 'Needs focused improvement plan.'
    }))
  };
};

export const recommend = async (req, res, next) => {
  try {
    const employees = req.body.employees?.length ? req.body.employees : await Employee.find();
    if (!employees.length) return res.status(400).json({ message: 'No employee data available' });

    if (!process.env.OPENROUTER_API_KEY) {
      return res.json(fallbackRecommendation(employees));
    }

    const prompt = `Analyze these employees and return JSON with summary, rankings, promotionRecommendations, trainingSuggestions, feedback. Employees: ${JSON.stringify(employees)}`;

    const { data } = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an HR analytics assistant. Return only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const content = data.choices?.[0]?.message?.content;
    res.json(JSON.parse(content));
  } catch (error) {
    if (error.response) {
      console.error("OpenRouter API Error:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("AI Controller Error:", error.message);
    }
    next(error);
  }
};
