import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Zap, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { questionBank, comingSoonSkills, getProficiency } from '../data/questionBank';
import { availableTags } from '../data/mockData';
import { useUser } from '../context/UserContext';

const availableSkills = availableTags.filter(t => questionBank[t]);

const STEP = { SELECT: 'select', QUIZ: 'quiz', RESULT: 'result' };

const AssessmentModal = ({ onClose }) => {
  const { addAssessment } = useUser();
  const [step, setStep] = useState(STEP.SELECT);
  const [skill, setSkill] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // array of chosen option indices
  const [chosen, setChosen] = useState(null); // currently selected option for current question
  const [result, setResult] = useState(null);

  const questions = skill ? questionBank[skill] : [];

  const handleSkillSelect = (s) => setSkill(s);

  const startQuiz = () => {
    setStep(STEP.QUIZ);
    setQuestionIndex(0);
    setAnswers([]);
    setChosen(null);
  };

  const handleAnswer = (optionIndex) => {
    if (chosen !== null) return; // already answered
    setChosen(optionIndex);
  };

  const handleNext = () => {
    const newAnswers = [...answers, chosen];

    if (questionIndex < questions.length - 1) {
      setAnswers(newAnswers);
      setQuestionIndex(i => i + 1);
      setChosen(null);
    } else {
      // Quiz complete — compute result
      const correct = newAnswers.filter((a, i) => a === questions[i].answer).length;
      const score = Math.round((correct / questions.length) * 400);
      const proficiency = getProficiency(score);
      const assessment = {
        id: Date.now(),
        skill,
        score,
        correct,
        total: questions.length,
        proficiency: proficiency.label,
        date: 'Just now',
        icon: 'zap',
      };
      setResult(assessment);
      setStep(STEP.RESULT);
      addAssessment(assessment);
    }
  };

  const q = questions[questionIndex];
  const progress = questions.length ? ((questionIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="w-full max-w-xl bg-ps-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-ps-orange/10 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-ps-gray hover:text-white transition-colors z-10">
          <X size={22} />
        </button>

        <AnimatePresence mode="wait">
          {/* ── STEP 1: SKILL SELECT ── */}
          {step === STEP.SELECT && (
            <motion.div key="select" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="p-8 space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-ps-orange mb-2">New Assessment</p>
                <h2 className="text-2xl font-black tracking-tight">Choose a Skill to Test</h2>
                <p className="text-ps-gray text-sm mt-1">Each assessment has 5 questions. Your score earns Skill IQ points.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                {availableSkills.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSkillSelect(s)}
                    className={`px-4 py-3 rounded-xl border text-sm font-bold text-left transition-all ${
                      skill === s
                        ? 'bg-ps-orange/10 border-ps-orange text-ps-orange'
                        : 'bg-white/5 border-white/5 hover:border-white/20 text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {comingSoonSkills.length > 0 && (
                <p className="text-[10px] text-ps-gray/40 uppercase tracking-widest">
                  Coming soon: {comingSoonSkills.join(', ')}
                </p>
              )}

              <button
                onClick={startQuiz}
                disabled={!skill}
                className="w-full py-3 bg-ps-orange hover:bg-ps-orange/90 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all"
              >
                Start Assessment <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {/* ── STEP 2: QUIZ ── */}
          {step === STEP.QUIZ && q && (
            <motion.div key={`quiz-${questionIndex}`} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }} className="p-8 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-ps-orange">{skill} Assessment</p>
                  <p className="text-xs text-ps-gray mt-0.5">Question {questionIndex + 1} of {questions.length}</p>
                </div>
                <span className="text-xs font-bold text-ps-gray">{Math.round(progress)}%</span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-ps-orange rounded-full"
                  initial={{ width: `${((questionIndex) / questions.length) * 100}%` }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Question */}
              <p className="text-lg font-bold leading-snug">{q.q}</p>

              {/* Options */}
              <div className="space-y-3">
                {q.options.map((opt, idx) => {
                  const isChosen = chosen === idx;
                  const isCorrect = idx === q.answer;
                  let cls = 'bg-white/5 border-white/5 text-white hover:border-white/20';
                  if (chosen !== null) {
                    if (isCorrect) cls = 'bg-green-500/10 border-green-500/50 text-green-400';
                    else if (isChosen && !isCorrect) cls = 'bg-red-500/10 border-red-500/40 text-red-400';
                    else cls = 'bg-white/5 border-white/5 text-ps-gray/50';
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={chosen !== null}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-left flex items-center justify-between transition-all ${cls}`}
                    >
                      <span>{opt}</span>
                      {chosen !== null && isCorrect && <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />}
                      {chosen !== null && isChosen && !isCorrect && <XCircle size={16} className="text-red-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                disabled={chosen === null}
                className="w-full py-3 bg-ps-orange hover:bg-ps-orange/90 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
              >
                {questionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {/* ── STEP 3: RESULT ── */}
          {step === STEP.RESULT && result && (
            <motion.div key="result" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-8 space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-ps-orange/10 border border-ps-orange/20 flex items-center justify-center text-ps-orange">
                  <Trophy size={40} />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-ps-orange mb-2">{skill} Assessment Complete</p>
                <h2 className="text-4xl font-black">
                  Skill IQ <span className="text-ps-orange">{result.score}</span>
                </h2>
                <p className="text-ps-gray mt-1">{result.correct}/{result.total} correct — {result.proficiency} Level</p>
              </div>

              {/* Proficiency bar */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-ps-gray">
                  <span>Proficiency</span>
                  <span className="text-ps-orange">{result.proficiency}</span>
                </div>
                <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(result.score / 400) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-ps-orange to-orange-400 rounded-full"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/5 text-white rounded-xl font-bold text-sm transition-all">
                  Done
                </button>
                <button
                  onClick={() => { setStep(STEP.SELECT); setSkill(null); setResult(null); }}
                  className="flex-1 py-3 bg-ps-orange hover:bg-ps-orange/90 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  Take Another <Zap size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AssessmentModal;
