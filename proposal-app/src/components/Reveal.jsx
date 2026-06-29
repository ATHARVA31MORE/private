import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Reveal.module.css';

// Stages: 0=guessed name, 1=but..., 2=IS YOU
export default function Reveal({ guessName, onContinue }) {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const t2 = setTimeout(() => setStage(2), 3000);
    return () => { clearTimeout(t2); };
  }, []);

  const handleTap = () => {
    if (stage === 1) setStage(2);
    // stage 2 handled by button
  };

  return (
    <div className={styles.wrap} onClick={stage < 2 ? handleTap : undefined}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <AnimatePresence mode="wait">
          {stage === 1 && (
            <motion.div
              key="but"
              className={styles.stageWrap}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.55 }}
            >
              <motion.p
                className={styles.butText}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              >
                But...
              </motion.p>
              <p className={styles.butSub}>
                The person I actually wanted to tell this to...
              </p>
              <p className={styles.tap}>Tap to reveal 💫</p>
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="isyou"
              className={styles.stageWrap}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.ring}
                  initial={{ scale: 0, opacity: 0.7 }}
                  animate={{ scale: 4 + i * 1.5, opacity: 0 }}
                  transition={{ delay: i * 0.2, duration: 1.2, ease: 'easeOut' }}
                />
              ))}

              <motion.div
                className={styles.bigHeart}
                animate={{ scale: [1, 1.15, 1], rotate: [0, -8, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ❤️
              </motion.div>

              <motion.h1
                className={styles.isYou}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
              >
                IS YOU ❤️
              </motion.h1>

              <motion.p
                className={styles.isYouSub}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                It was always you, Priyanka.
              </motion.p>

              <motion.button
                className={styles.continueBtn}
                onClick={(e) => { e.stopPropagation(); onContinue(); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(255,107,157,0.7)' }}
                whileTap={{ scale: 0.95 }}
              >
                Read my message 💌
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}