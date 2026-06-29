import { motion } from 'framer-motion';
import styles from './ProgressBar.module.css';

export default function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100;

  return (
    <div className={styles.barWrap}>
      <span className={styles.label}>Question {current + 1} of {total}</span>
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          initial={{ width: `${(current / total) * 100}%` }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
