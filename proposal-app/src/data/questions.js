export const questions = [
  {
    id: 1,
    text: "What qualities should the perfect partner have?",
    type: "text",
    placeholder: "Be honest... 💭",
  },
  {
    id: 2,
    text: "Should someone confess their feelings to their best friend?",
    type: "choice",
    options: [
      { label: "Yes, always ❤️" },
      { label: "No, too risky 😅" },
    ],
  },
  {
    id: 3,
    text: "If your best friend secretly loved you, what would you do?",
    type: "choice",
    options: [
      { label: "Give him a chance 💖" },
      { label: "Stay just friends 🤝" },
      { label: "It depends... 🤔" },
    ],
  },
  {
    id: 4,
    text: "What's more important in a relationship?",
    type: "choice",
    options: [
      { label: "Loyalty ❤️" },
      { label: "Looks 😍" },
      { label: "Money 💸" },
    ],
  },
  {
    id: 5,
    text: "Do you believe true love can begin from friendship?",
    type: "choice",
    options: [
      { label: "Yes, absolutely 🌸" },
      { label: "No, not really 🙁" },
    ],
  },
  {
    id: 6,
    text: "How would you feel if a close friend started caring for you in a deeper way?",
    type: "choice",
    options: [
      { label: "Flattered and curious 💕" },
      { label: "Uncomfortable, I'd pull back 😬" },
      { label: "I'd need time to think 🤔" },
    ],
  },
  {
    id: 7,
    text: "Would you rather know how someone truly feels, even if it's complicated?",
    type: "choice",
    options: [
      { label: "Yes, honesty matters 💬" },
      { label: "No, I'd rather not know 🙈" },
    ],
  },
  {
    id: 8,
    text: "What's the one thing that makes someone feel like 'home' to you?",
    type: "text",
    placeholder: "Think of someone who makes you feel safe... 🏡",
  },
  {
    id: 9,
    text: "Have you ever wondered if a friendship could become something more?",
    type: "choice",
    options: [
      { label: "Yes, more than once 💭" },
      { label: "Maybe, once or twice 🌸" },
      { label: "No, never really 🤷" },
    ],
  },
  {
    id: 10,
    text: "If the right person was already in your life, do you think you'd notice?",
    type: "choice",
    options: [
      { label: "Yes, I'd feel it ✨" },
      { label: "Maybe I'd miss the signs 😅" },
      { label: "Probably not until they told me 💌" },
    ],
  },
];

export const questionTexts = questions.map((q) => q.text);
