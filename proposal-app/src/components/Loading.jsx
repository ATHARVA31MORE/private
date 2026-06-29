import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Loading.module.css';
import { analyzeAnswers } from '../utils/analyzeAnswers';
import { sendAnswersEmail } from '../utils/sendEmail';

const STEPS = [
  { label: 'Reading your answers...', icon: '📖', targetPct: 28 },
  { label: 'Analyzing compatibility...', icon: '🧠', targetPct: 60 },
  { label: 'Consulting the heart...', icon: '💖', targetPct: 85 },
  { label: 'Almost there...', icon: '✨', targetPct: 100 },
];

const STEP_DELAYS = [0, 1200, 2600, 3900];
const MIN_DISPLAY_MS = 5200;

export default function Loading({ answers, guessName, onDone }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [pct, setPct] = useState(0);
  const [dots, setDots] = useState('');
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const t = setInterval(() => setDots(d => (d.length >= 3 ? '' : d + '.')), 480);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timers = STEP_DELAYS.map((delay, i) =>
      setTimeout(() => { setStepIdx(i); setPct(STEPS[i].targetPct); }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    analyzeAnswers(answers).then((result) => {
      if (result === 'alternative') {
        sendAnswersEmail(answers, guessName, result);
      }
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(() => onDone(result), remaining);
    });
  }, [answers, guessName, onDone]);

  const currentStep = STEPS[stepIdx];

  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero image */}
        <div className={styles.heroWrap}>
          <img
            src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80"
            alt="stars"
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <motion.div
              className={styles.spinnerRing}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <div className={styles.spinnerInner} />
            </motion.div>
            <span className={styles.heroEmoji}>🔮</span>
          </div>
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>AI Analysis</h2>
          <p className={styles.subtitle}>Processing your heart's answers...</p>

          <div className={styles.stepsWrap}>
            {STEPS.map((s, i) => {
              const done = i < stepIdx;
              const active = i === stepIdx;
              return (
                <motion.div
                  key={i}
                  className={`${styles.stepRow} ${active ? styles.stepActive : done ? styles.stepDone : styles.stepPending}`}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: i <= stepIdx ? 1 : 0.28, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                >
                  <span className={styles.stepIcon}>{done ? '✅' : active ? s.icon : '⬜'}</span>
                  <span className={styles.stepLabel}>{s.label}{active ? dots : ''}</span>
                </motion.div>
              );
            })}
          </div>

          <div className={styles.barSection}>
            <div className={styles.track}>
              <motion.div
                className={styles.fill}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
              />
              <div className={styles.shimmer} />
            </div>
            <div className={styles.barMeta}>
              <span className={styles.barLabel}>Analyzing</span>
              <motion.span
                className={styles.pctLabel}
                key={pct}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {pct}%
              </motion.span>
            </div>
          </div>

          <motion.p
            className={styles.wait}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Please wait a moment...
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
