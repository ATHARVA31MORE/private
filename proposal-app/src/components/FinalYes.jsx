import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import styles from './FinalYes.module.css';
import GiftReveal from './GiftReveal';

const BURST_HEARTS = ['❤️','💕','💖','💗','💝','🩷','💓','🌸','✨','💞'];

export default function FinalYes() {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    if (navigator.vibrate) navigator.vibrate([80, 40, 80, 40, 200]);
    const fire = (particleRatio, opts) => {
      confetti({ origin: { y: 0.6 }, ...opts, particleCount: Math.floor(200 * particleRatio), colors: ['#FF6B9D','#C850C0','#8B5CF6','#FFD6EC','#FF85C8'] });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2,  { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1,  { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1,  { spread: 120, startVelocity: 45 });
    setTimeout(() => {
      confetti({ angle: 60,  spread: 55, particleCount: 80, origin: { x: 0 }, colors: ['#FF6B9D','#FFD6EC'] });
      confetti({ angle: 120, spread: 55, particleCount: 80, origin: { x: 1 }, colors: ['#C850C0','#8B5CF6'] });
    }, 600);
  }, []);

  return (
    <div className={styles.wrap}>
      {BURST_HEARTS.map((h, i) => (
        <motion.span key={i} className={styles.burstHeart}
          style={{ left: `${8 + (i / BURST_HEARTS.length) * 84}%`, fontSize: `${18 + Math.random() * 20}px` }}
          initial={{ y: 0, opacity: 1, scale: 0 }}
          animate={{ y: `-${80 + Math.random() * 40}vh`, opacity: 0, scale: 1.5, rotate: (Math.random() - 0.5) * 60 }}
          transition={{ delay: Math.random() * 0.8, duration: 1.8 + Math.random() * 0.8, ease: 'easeOut' }}
        >{h}</motion.span>
      ))}

      <motion.div className={styles.card}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.2 }}
      >
        {/* Celebration image */}
        <div className={styles.heroWrap}>
          <img
            src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80"
            alt="celebration"
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroCenter}>
            <motion.div className={styles.bigHeart}
              animate={{ scale: [1, 1.2, 0.95, 1.1, 1], rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >❤️</motion.div>
          </div>
        </div>

        <div className={styles.body}>
          <motion.h1 className={styles.title}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >She said YES! 🎉</motion.h1>

          <motion.p className={styles.message}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >You just made me the happiest person alive ❤️</motion.p>

          <motion.p className={styles.sub}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >— Atharva 💌</motion.p>
        </div>
        
      </motion.div>
      <GiftReveal />
    </div>
    
  );
}
