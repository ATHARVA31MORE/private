import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './QuestionCard.module.css';
import ProgressBar from './ProgressBar';

// One hero image per question — different themed images
const QUESTION_IMAGES = [
  'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=600&q=80', // paper hearts
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80', // roses
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80', // romantic couple
  'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80', // sparkle lights
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80', // pink flowers
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80', // sunset couple
  'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=600&q=80', // holding hands
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80', // cozy home
  'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=600&q=80', // dreamy light
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', // warm smile
];

export default function QuestionCard({ question, questionIndex, total, onAnswer }) {
  const [textVal, setTextVal] = useState('');
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleChoice = (opt, idx) => {
    setSelected(idx);
    if (navigator.vibrate) navigator.vibrate([30, 20, 30]);
    setTimeout(() => onAnswer(opt.label), 400);
  };

  const handleTextSubmit = () => {
    if (textVal.trim()) {
      if (navigator.vibrate) navigator.vibrate(50);
      onAnswer(textVal.trim());
    }
  };

  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {/* Slim image banner */}
        <div className={styles.heroWrap}>
          <img
            src={QUESTION_IMAGES[questionIndex % QUESTION_IMAGES.length]}
            alt=""
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroTop}>
            <ProgressBar current={questionIndex} total={total} />
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.qHeader}>
            <span className={styles.qNum}>Q{questionIndex + 1}</span>
            <motion.span
              className={styles.heartPulse}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            >
              💗
            </motion.span>
          </div>

          <h3 className={styles.question}>{question.text}</h3>

          <AnimatePresence mode="wait">
            {question.type === 'text' ? (
              <motion.div
                key="text"
                className={styles.textArea}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={`${styles.inputWrap} ${focused ? styles.inputFocused : ''}`}>
                  <textarea
                    className={styles.input}
                    placeholder={question.placeholder}
                    value={textVal}
                    onChange={(e) => setTextVal(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    rows={3}
                  />
                </div>
                <motion.button
                  className={styles.submitBtn}
                  disabled={!textVal.trim()}
                  onClick={handleTextSubmit}
                  whileHover={textVal.trim() ? { scale: 1.04 } : {}}
                  whileTap={textVal.trim() ? { scale: 0.96 } : {}}
                >
                  Next →
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="choices"
                className={styles.choices}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {question.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    className={`${styles.choiceBtn} ${selected === idx ? styles.choiceSelected : ''}`}
                    onClick={() => handleChoice(opt, idx)}
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {opt.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}