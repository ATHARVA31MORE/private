import { motion } from 'framer-motion';
import styles from './Proposal.module.css';

const LETTER_LINES = [
  "Hey Priyanka... 🌸",
  "I know this might feel a little too soon, but trust me... ❤️",
  "",
  "Making this decision wasn't easy for me.",
  "I've been thinking about it for a long time,",
  "and honestly, I've been very scared to tell you how I feel.",
  "",
  "The biggest reason I kept hesitating",
  "wasn't the fear of rejection",
  "it was the fear of losing you.",
  "Our friendship means so much to me,",
  "and I couldn't bear the thought",
  "of making things awkward",
  "or losing the bond we've built",
  "if you didn't feel the same.",
  "",
  "Keeping these feelings to myself",
  "was becoming harder every single day.",
  "I knew that if I never told you,",
  "I'd always regret wondering...",
  "'What if?'",
  "",
  "I don't know what your answer will be,",
  "and I'll respect it no matter what.",
  "But I wanted to be honest",
  "with the person who means so much to me.",
  "",
  "I can't promise you a perfect life,",
  "but I can promise to always respect you,",
  "support you,",
  "make you smile,",
  "stand by your side,",
  "and never stop choosing you.",
  "",
  "And deep down...",
  "I truly believe",
  "this could be one of the best decisions",
  "we ever make. 💕",
];

export default function Proposal({ onYes, onThink }) {
  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Hero image */}
        <div className={styles.heroWrap}>
          <img
            src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80"
            alt="romantic"
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroCenter}>
            <motion.div
              className={styles.topHeart}
              animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            >
              💌
            </motion.div>
            <h2 className={styles.heroTitle}>A letter for you</h2>
          </div>
        </div>

        {/* Scrollable body */}
        <div className={styles.body}>
          <div className={styles.letter}>
            {LETTER_LINES.map((line, i) => (
              <motion.p
                key={i}
                className={line === '' ? styles.spacer : styles.line}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            className={styles.question}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className={styles.qText}>Kay tu majhi hoshil Priyanka 💍</p>
          </motion.div>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.button
              className={styles.yesBtn}
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate([50, 30, 80, 30, 50]);
                onYes();
              }}
              whileHover={{ scale: 1.06, boxShadow: '0 0 36px rgba(255,107,157,0.8)' }}
              whileTap={{ scale: 0.94 }}
            >
              ❤️ Yes!
            </motion.button>

            <motion.button
              className={styles.thinkBtn}
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(40);
                onThink();
              }}
              whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.45)' }}
              whileTap={{ scale: 0.96 }}
            >
              🤍 Let me Think
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}