import { motion } from 'framer-motion';
import styles from './FloatingHearts.module.css';

const HEARTS = ['❤️','💕','💖','💗','💝','🩷','💓','💞'];

const generateHearts = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: HEARTS[i % HEARTS.length],
    left: `${5 + Math.random() * 90}%`,
    size: 14 + Math.random() * 18,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 7,
    opacity: 0.12 + Math.random() * 0.18,
  }));

const hearts = generateHearts(16);

export default function FloatingHearts() {
  return (
    <div className={styles.container}>
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className={styles.heart}
          style={{
            left: h.left,
            fontSize: h.size,
            opacity: h.opacity,
          }}
          initial={{ y: '110vh', rotate: -15 }}
          animate={{ y: '-10vh', rotate: 15 }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  );
}
