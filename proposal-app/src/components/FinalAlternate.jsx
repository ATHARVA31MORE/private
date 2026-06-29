import { motion } from 'framer-motion';
import styles from './FinalAlternate.module.css';
import GiftReveal from './GiftReveal';

const LINES = [
  { text: "I noticed something in your answers... 🌙", delay: 0.2 },
  { text: "Maybe the timing isn't right.", delay: 0.7 },
  { text: "Maybe the feelings aren't the same.", delay: 1.1 },
  { text: "And that's okay.", delay: 1.5 },
  { text: "I couldn't keep this inside any longer,", delay: 2.0 },
  { text: "so I just needed you to know:", delay: 2.4 },
];

const CONFESSION_LINES = [
  { text: "You mean the world to me, Priyanka.", delay: 3.0 },
  { text: "You always have. ❤️", delay: 3.5 },
];

export default function FinalAlternate() {
  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Soft glowing moon icon */}
        <motion.div
          className={styles.icon}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          🌙
        </motion.div>

        <h2 className={styles.title}>I understand...</h2>

        <div className={styles.lines}>
          {LINES.map((line, i) => (
            <motion.p
              key={i}
              className={styles.line}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: line.delay, duration: 0.5 }}
            >
              {line.text}
            </motion.p>
          ))}
        </div>

        <motion.div
          className={styles.confessionBox}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.6, duration: 0.6 }}
        >
          <motion.div
            className={styles.heartSmall}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            ❤️
          </motion.div>
          {CONFESSION_LINES.map((line, i) => (
            <motion.p
              key={i}
              className={styles.confessionLine}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: line.delay, duration: 0.5 }}
            >
              {line.text}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          className={styles.footer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2 }}
        >
          <p className={styles.footerText}>
            No matter what happens, I'll always be here for you.
          </p>
          <p className={styles.footerText}>
            Our friendship is my greatest treasure. 🌸
          </p>
          <p className={styles.sign}>— Atharva 💌</p>
        </motion.div>
      </motion.div>
      <GiftReveal />
    </div>
  );
}
