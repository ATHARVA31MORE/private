import { GoogleGenerativeAI } from '@google/generative-ai';
import { questionTexts } from '../data/questions';

/**
 * Sends the girl's answers to Gemini and determines the ending path.
 * @param {string[]} answers - Answers from the questionnaire
 * @returns {Promise<"positive"|"alternative">}
 */
export async function analyzeAnswers(answers) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // If no key configured, use a smart rule-based fallback
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return ruleBasedAnalysis(answers);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const qnaBlock = questionTexts.map((q, i) => `Q${i + 1}: "${q}"\nA${i + 1}: "${answers[i] || 'No answer'}"`).join('\n\n');

    const prompt = `
You are analyzing a girl's answers to a romantic questionnaire. A boy named Atharva is planning to secretly confess his feelings to his best friend Priyanka through this interactive experience.

Based on her answers below, determine whether she seems emotionally open, positive, or receptive to the idea of romantic feelings developing from a close friendship — and whether she would likely respond warmly to a heartfelt romantic proposal.

${qnaBlock}

Analyze holistically. Consider:
- Does she value emotional connection and loyalty?
- Is she open to friendship turning into romance?
- Did she say she'd give her best friend a chance?
- Are her answers warm, thoughtful, and open-hearted?

Return ONLY a valid JSON object (no markdown, no explanation):
{"result": "positive", "reason": "one sentence why"}
OR
{"result": "alternative", "reason": "one sentence why"}

"positive" = she seems warm and open-hearted, the proposal has a good chance.
"alternative" = she seems hesitant, closed-off, or gave negative signals.
`;

    const response = await model.generateContent(prompt);
    const text = response.response.text().trim();

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      console.log('AI Analysis:', parsed);
      if (parsed.result === 'positive' || parsed.result === 'alternative') {
        return parsed.result;
      }
    }
    // If parsing fails, default to positive (the story must go on!)
    return 'positive';
  } catch (err) {
    console.warn('Gemini API error, using rule-based fallback:', err);
    return ruleBasedAnalysis(answers);
  }
}

/**
 * Rule-based fallback analysis when no API key is set.
 * Scores the answers and decides the path.
 */
function ruleBasedAnalysis(answers) {
  let score = 0;

  // Q2: Confess to best friend?
  if (answers[1]) {
    const a2 = answers[1].toLowerCase();
    if (a2.includes('yes') || a2.includes('always')) score += 3;
    else if (a2.includes('no') || a2.includes('risky')) score -= 2;
  }

  // Q3: Best friend loves you?
  if (answers[2]) {
    const a3 = answers[2].toLowerCase();
    if (a3.includes('chance')) score += 3;
    else if (a3.includes('friend')) score -= 2;
    else if (a3.includes('depends')) score += 1;
  }

  // Q4: What matters?
  if (answers[3]) {
    const a4 = answers[3].toLowerCase();
    if (a4.includes('loyalty')) score += 2;
    else if (a4.includes('money')) score -= 1;
  }

  // Q5: Love from friendship?
  if (answers[4]) {
    const a5 = answers[4].toLowerCase();
    if (a5.includes('yes') || a5.includes('absolutely')) score += 3;
    else if (a5.includes('no')) score -= 3;
  }

  // Q6: Friend caring deeper?
  if (answers[5]) {
    const a6 = answers[5].toLowerCase();
    if (a6.includes('flattered') || a6.includes('curious')) score += 2;
    else if (a6.includes('uncomfortable') || a6.includes('pull back')) score -= 2;
    else if (a6.includes('time')) score += 1;
  }

  // Q7: Know true feelings?
  if (answers[6]) {
    const a7 = answers[6].toLowerCase();
    if (a7.includes('yes') || a7.includes('honesty')) score += 2;
    else if (a7.includes('no') || a7.includes('rather not')) score -= 2;
  }

  // Q9: Friendship become more?
  if (answers[8]) {
    const a9 = answers[8].toLowerCase();
    if (a9.includes('more than once')) score += 2;
    else if (a9.includes('once or twice') || a9.includes('maybe')) score += 1;
    else if (a9.includes('never')) score -= 1;
  }

  // Q10: Notice the right person?
  if (answers[9]) {
    const a10 = answers[9].toLowerCase();
    if (a10.includes('feel it')) score += 2;
    else if (a10.includes('miss the signs')) score += 1;
    else if (a10.includes('told me')) score += 1;
  }

  console.log('Rule-based score:', score);
  return score >= 3 ? 'positive' : 'alternative';
}
