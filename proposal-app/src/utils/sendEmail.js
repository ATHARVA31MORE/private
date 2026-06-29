import { questionTexts } from '../data/questions';

const PROPOSAL_QUESTION = 'Will you be mine? 💍';

async function submitEmail(payload) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

  if (!accessKey || accessKey === 'your_web3forms_key_here') {
    console.warn('📧 Email not configured. Set VITE_WEB3FORMS_KEY in .env.local');
    return;
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: accessKey, from_name: 'Proposal App 💝', ...payload }),
    });
    const data = await res.json();
    if (data.success) {
      console.log('✅ Email sent successfully');
    } else {
      console.error('❌ Email failed:', data);
    }
  } catch (err) {
    console.error('❌ Email send error:', err);
  }
}

/**
 * Sends questionnaire answers via Web3Forms.
 * Positive path: call only after she taps Yes or Let me think (pass proposalResponse).
 * Alternative path: call immediately when AI result is negative.
 *
 * Each Q&A is sent as its own Web3Forms field so they all appear in the email.
 */
export async function sendAnswersEmail(answers, guessName, aiResult, proposalResponse = null) {
  const aiLabel =
    aiResult === 'positive'
      ? 'POSITIVE — Full proposal screen was shown'
      : 'ALTERNATIVE — Soft confession screen was shown';

  let subject;
  let headline;

  if (proposalResponse === 'yes') {
    subject = '💍 SHE SAID YES!!! — Priyanka answered your proposal';
    headline = '🎉 SHE SAID YES! 🎉';
  } else if (proposalResponse === 'think') {
    subject = '🤍 Priyanka said "Let me think" — Proposal App';
    headline = '💭 She said "Let me think"';
  } else {
    subject = '🌙 Priyanka\'s Answers — Alternative path';
    headline = '🌙 Negative signals — soft confession screen shown';
  }

  const proposalAnswer = proposalResponse === 'yes'
    ? '❤️ YES!'
    : proposalResponse === 'think'
      ? '🤍 Let me think'
      : 'N/A — alternative path (no proposal shown)';

  // Web3Forms shows each top-level key as its own row in the email
  const fields = {
    subject,
    headline,
    she_guessed: guessName || '(no guess)',
    ai_result: aiLabel,
    proposal_question: PROPOSAL_QUESTION,
    proposal_answer: proposalAnswer,
  };

  questionTexts.forEach((q, i) => {
    fields[`question_${i + 1}`] = q;
    fields[`answer_${i + 1}`] = answers[i] || '(no answer)';
  });

  // Plain-text summary as backup
  const summary = questionTexts.map(
    (q, i) => `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i] || '(no answer)'}`
  ).join('\n\n');

  fields.full_summary = [
    headline,
    '',
    `She guessed: ${guessName || '(no guess)'}`,
    `Proposal: ${PROPOSAL_QUESTION}`,
    `Her answer: ${proposalAnswer}`,
    '',
    '--- All questionnaire answers ---',
    summary,
    '',
    `AI result: ${aiLabel}`,
  ].join('\n');

  await submitEmail(fields);
}
