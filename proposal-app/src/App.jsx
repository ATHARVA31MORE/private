import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './App.module.css';
import { questions } from './data/questions';

import FloatingHearts from './components/FloatingHearts';
import Welcome from './components/Welcome';
import QuestionCard from './components/QuestionCard';
import Loading from './components/Loading';
import Reveal from './components/Reveal';
import Proposal from './components/Proposal';
import FinalYes from './components/FinalYes';
import FinalThink from './components/FinalThink';
import FinalAlternate from './components/FinalAlternate';
import { sendAnswersEmail } from './utils/sendEmail';

const SCREENS = {
  WELCOME: 0,
  QUESTIONS: 2,
  LOADING: 3,
  REVEAL: 4,
  PROPOSAL: 5,
  FINAL_YES: 6,
  FINAL_THINK: 7,
  FINAL_ALTERNATE: 8,
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.WELCOME);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [aiResult, setAiResult] = useState('positive'); // 'positive' | 'alternative'

  const audioRef = useRef(null);
  const answersRef = useRef([]);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.22;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicPlaying(p => !p);
  };

  const goTo = (s) => setScreen(s);

  const handleAnswer = (answer) => {
    const updated = [...answers, answer];
    setAnswers(updated);
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
    } else {
      goTo(SCREENS.LOADING);
    }
  };

  const handleLoadingDone = (result) => {
    setAiResult(result);
    goTo(SCREENS.REVEAL);
  };

  const handleRevealContinue = () => {
    if (aiResult === 'positive') {
      goTo(SCREENS.PROPOSAL);
    } else {
      goTo(SCREENS.FINAL_ALTERNATE);
    }
  };

  const handleProposalYes = () => {
    sendAnswersEmail(answersRef.current, '', 'positive', 'yes');
    goTo(SCREENS.FINAL_YES);
  };

  const handleProposalThink = () => {
    sendAnswersEmail(answersRef.current, '', 'positive', 'think');
    goTo(SCREENS.FINAL_THINK);
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.96, y: 18 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, scale: 0.94, y: -18, transition: { duration: 0.38, ease: 'easeIn' } },
  };

  const renderScreen = () => {
    switch (screen) {
      case SCREENS.WELCOME:
        return <Welcome key="welcome" onStart={() => goTo(SCREENS.QUESTIONS)} />;
      case SCREENS.QUESTIONS:
        return (
          <QuestionCard
            key={`q-${currentQ}`}
            question={questions[currentQ]}
            questionIndex={currentQ}
            total={questions.length}
            onAnswer={handleAnswer}
          />
        );
      case SCREENS.LOADING:
        return <Loading key="loading" answers={answers} onDone={handleLoadingDone} />;
      case SCREENS.REVEAL:
        return <Reveal key="reveal" onContinue={handleRevealContinue} />;
      case SCREENS.PROPOSAL:
        return (
          <Proposal
            key="proposal"
            onYes={handleProposalYes}
            onThink={handleProposalThink}
          />
        );
      case SCREENS.FINAL_YES:
        return <FinalYes key="finalyes" />;
      case SCREENS.FINAL_THINK:
        return <FinalThink key="finalthink" />;
      case SCREENS.FINAL_ALTERNATE:
        return <FinalAlternate key="finalalternate" />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <FloatingHearts />

      <motion.button
        className={styles.musicBtn}
        onClick={toggleMusic}
        whileTap={{ scale: 0.88 }}
        animate={{ rotate: musicPlaying ? [0, 5, -5, 0] : 0 }}
        transition={{ repeat: musicPlaying ? Infinity : 0, duration: 1.5 }}
        title={musicPlaying ? 'Mute music' : 'Play music'}
      >
        {musicPlaying ? '🎵' : '🔇'}
      </motion.button>

      <div className={styles.screenWrap}>
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={styles.screenInner}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}