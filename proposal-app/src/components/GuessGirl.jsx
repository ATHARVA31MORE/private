import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './GuessGirl.module.css';

export default function GuessGirl({ onSubmit }) {
  const [name, setName] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      if (navigator.vibrate) navigator.vibrate(50);
      onSubmit(name.trim());
    }
  };

  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero image */}
        <div className={styles.heroWrap}>
          <img
            src="/sakura-flying-petals-transparent-background_206725-479.avif"
            alt="pink petals"
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroCenter}>
            <motion.span
              className={styles.heroIcon}
              animate={{ scale: [1, 1.15, 1], rotate: [0, 12, -12, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              🤔
            </motion.span>
          </div>
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>Quick Question!</h2>

          <p className={styles.question}>
            Who do you think I'm going to propose to?
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={`${styles.inputWrap} ${focused ? styles.inputFocused : ''}`}>
              <input
                className={styles.input}
                type="text"
                placeholder="Type her name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            <motion.button
              type="submit"
              className={styles.btn}
              disabled={!name.trim()}
              whileHover={name.trim() ? { scale: 1.04, boxShadow: '0 0 28px rgba(255,107,157,0.65)' } : {}}
              whileTap={name.trim() ? { scale: 0.96 } : {}}
            >
              That's my guess! 🎯
            </motion.button>
          </form>

          <p className={styles.hint}>💭 Be honest — I won't judge!</p>
        </div>
      </motion.div>
    </div>
  );
}
