import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GiftReveal.module.css';

export default function GiftReveal() {
  const [revealed, setRevealed] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  const handleDownload = async () => {
    try {
      const res = await fetch('/priyanka.jpeg');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'priyanka.jpeg';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open('/priyanka.jpeg', '_blank');
    }
  };

  return (
    <>
      <div className={styles.wrap}>
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.button
              key="btn"
              className={styles.giftBtn}
              onClick={() => setRevealed(true)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.06, boxShadow: '0 0 32px rgba(255,107,157,0.6)' }}
              whileTap={{ scale: 0.94 }}
            >
              <motion.span
                animate={{ rotate: [0, -10, 10, -8, 8, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2.2, repeatDelay: 1 }}
                style={{ display: 'inline-block', marginRight: 10 }}
              >
                🎁
              </motion.span>
              Tap to reveal your gift
            </motion.button>
          ) : (
            <motion.div
              key="gift"
              className={styles.giftCard}
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.ring}
                  initial={{ scale: 0.5, opacity: 0.6 }}
                  animate={{ scale: 2.5 + i * 0.8, opacity: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.9, ease: 'easeOut' }}
                />
              ))}

              <motion.div
                className={styles.imgWrap}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setLightbox(true)}
                title="Tap to view full image"
              >
                <img src="/priyanka.jpeg" alt="Priyanka" className={styles.photo} />
                <div className={styles.imgOverlay} />
                <div className={styles.tapHint}>👆 Tap to view</div>
              </motion.div>

              <motion.p
                className={styles.caption}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                You 🌸
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className={styles.lightboxBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <motion.div
              className={styles.lightboxInner}
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button className={styles.closeBtn} onClick={() => setLightbox(false)}>✕</button>

              <img src="/priyanka.jpeg" alt="Priyanka" className={styles.lightboxImg} />

              <motion.button
                className={styles.downloadBtn}
                onClick={handleDownload}
                whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(255,107,157,0.65)' }}
                whileTap={{ scale: 0.95 }}
              >
                ⬇️ Download
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}