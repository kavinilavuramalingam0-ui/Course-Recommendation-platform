import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { careerGoals, availableTags, goalTagMap } from '../data/mockData';
import { Check, Target, BookOpen, ChevronRight, X } from 'lucide-react';

const OnboardingModal = () => {
  const { userProfile, updateProfile, setShowOnboarding } = useUser();
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState(userProfile.goal || '');
  const [selectedTags, setSelectedTags] = useState(userProfile.interests || []);

  const handleNext = () => {
    if (step === 1 && selectedGoal) {
      setStep(2);
    } else if (step === 2) {
      updateProfile({
        goal: selectedGoal,
        interests: selectedTags,
        onboardingComplete: true
      });
      setShowOnboarding(false);
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Compute path-relevant vs other tags for step 2
  const primaryTags = goalTagMap[selectedGoal] || [];
  const otherTags = availableTags.filter(t => !primaryTags.includes(t));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl bg-ps-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative shadow-ps-orange/10"
      >
        <button 
          onClick={() => setShowOnboarding(false)}
          className="absolute top-4 right-4 p-2 text-ps-gray hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-ps-orange">
                  <Target size={32} />
                  <h2 className="text-3xl font-bold tracking-tight">Define Your Path</h2>
                </div>
                <p className="text-ps-gray text-lg">Select your primary career goal to help us tailor your learning journey.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {careerGoals.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setSelectedGoal(goal)}
                      className={`p-4 rounded-xl border flex items-center justify-between transition-all text-left ${
                        selectedGoal === goal 
                        ? 'bg-ps-orange/10 border-ps-orange text-ps-orange' 
                        : 'bg-white/5 border-white/5 hover:border-white/20 text-white'
                      }`}
                    >
                      <span className="font-medium">{goal}</span>
                      {selectedGoal === goal && <Check size={20} />}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-ps-orange">
                  <BookOpen size={32} />
                  <h2 className="text-3xl font-bold tracking-tight">Select Interests</h2>
                </div>
                <p className="text-ps-gray text-lg">What skills are you looking to master? Choose at least 3 for better matches.</p>
                
                {/* Primary tags — recommended for selected path */}
                {primaryTags.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-ps-orange/80 mb-3">
                      Recommended for {selectedGoal}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {primaryTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                            selectedTags.includes(tag)
                            ? 'bg-ps-orange border-ps-orange text-white'
                            : 'bg-ps-orange/5 border-ps-orange/30 hover:border-ps-orange/60 text-ps-orange/80 hover:text-white'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other tags — general skills */}
                {otherTags.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-ps-gray/60 mb-3">
                      Other Skills
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {otherTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                            selectedTags.includes(tag)
                            ? 'bg-ps-orange border-ps-orange text-white'
                            : 'bg-white/5 border-white/5 hover:border-white/20 text-ps-gray hover:text-white'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 bg-black/20 flex items-center justify-between border-t border-white/10">
          <div className="flex gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${step === 1 ? 'bg-ps-orange' : 'bg-ps-orange/30'}`} />
            <div className={`w-2.5 h-2.5 rounded-full ${step === 2 ? 'bg-ps-orange' : 'bg-ps-orange/30'}`} />
          </div>
          
          <button
            onClick={handleNext}
            disabled={step === 1 ? !selectedGoal : selectedTags.length === 0}
            className="px-6 py-3 bg-ps-orange hover:bg-ps-orange/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-ps-orange/20"
          >
            {step === 1 ? 'Next' : 'Launch Learning'}
            <ChevronRight size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingModal;
