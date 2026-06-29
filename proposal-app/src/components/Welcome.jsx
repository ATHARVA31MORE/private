import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Welcome.module.css';

const LINES = [
  { text: 'Hey Priyanka 😊', style: 'name', delay: 0.2 },
  { text: "I need your help making an important decision.", style: 'body', delay: 0.8 },
  { text: "I'm planning to propose to someone...", style: 'body', delay: 1.4 },
  { text: "But before I do — I need your honest opinion.", style: 'highlight', delay: 2.0 },
];

export default function Welcome({ onStart }) {
  const [showBtn, setShowBtn] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowBtn(true), 3200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Hero image */}
        <div className={styles.heroWrap}>
          <img
            src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80"
            alt="roses"
            className={`${styles.heroImg} ${imgLoaded ? styles.heroImgLoaded : ''}`}
            onLoad={() => setImgLoaded(true)}
          />
          <div className={styles.heroOverlay} />
          {/* Floating icon centered on the image */}
          <motion.div
            className={styles.iconOverlay}
            animate={{ scale: [1, 1.12, 1], rotate: [0, -8, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          >
            💝
          </motion.div>
        </div>

        {/* Card body */}
        <div className={styles.body}>
          <div className={styles.lines}>
            {LINES.map((l, i) => (
              <motion.p
                key={i}
                className={styles[l.style]}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: l.delay, duration: 0.55, ease: 'easeOut' }}
              >
                {l.text}
              </motion.p>
            ))}
          </div>

          {showBtn && (
            <motion.button
              className={styles.btn}
              onClick={onStart}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(255,107,157,0.7)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              Sure, I'll help! 💖
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
