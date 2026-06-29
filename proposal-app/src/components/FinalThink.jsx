import { motion } from 'framer-motion';
import styles from './FinalThink.module.css';
import GiftReveal from './GiftReveal';

const LINES = [
  { text: "That's completely okay ❤️", delay: 0.2 },
  { text: "I just wanted you to know how I truly feel.", delay: 0.6 },
  { text: "No matter what your answer is,", delay: 1.0 },
  { text: "I'll always respect it.", delay: 1.3 },
  { text: "Our friendship means everything to me.", delay: 1.7 },
  { text: "Take all the time you need. 🌸", delay: 2.1 },
];

export default function FinalThink() {
  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className={styles.icon}
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          🤍
        </motion.div>

        <h2 className={styles.title}>It's Okay 🌸</h2>

        <div className={styles.lines}>
          {LINES.map((line, i) => (
            <motion.p
              key={i}
              className={styles.line}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: line.delay, duration: 0.5 }}
            >
              {line.text}
            </motion.p>
          ))}
        </div>

        <motion.p
          className={styles.sign}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
        >
          — Atharva 💌
        </motion.p>
      </motion.div>
      <GiftReveal />
    </div>
  );
}
