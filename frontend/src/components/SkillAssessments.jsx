import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { getProficiency } from '../data/questionBank';
import AssessmentModal from './AssessmentModal';
import { Zap, Server, Palette, Code2, Trophy, BarChart3, Clock, ChevronRight, BookOpen } from 'lucide-react';

const iconMap = {
  zap: <Zap size={20} />,
  server: <Server size={20} />,
  palette: <Palette size={20} />,
  'code-2': <Code2 size={20} />,
};

const SkillAssessments = () => {
  const { assessments } = useUser();
  const [showModal, setShowModal] = useState(false);

  // Derive all stats dynamically from real assessment results
  const stats = useMemo(() => {
    if (assessments.length === 0) return null;

    const avgScore = Math.round(assessments.reduce((s, a) => s + a.score, 0) / assessments.length);
    const expertBadges = assessments.filter(a => a.proficiency === 'Expert').length;
    const verifiedSkills = assessments.length;
    const percentile = Math.min(99, Math.round((avgScore / 400) * 99));
    const topAssessment = [...assessments].sort((a, b) => b.score - a.score)[0];
    const proficiency = getProficiency(avgScore);
    const barWidth = `${Math.round((avgScore / 400) * 100)}%`;

    return { avgScore, expertBadges, verifiedSkills, percentile, topAssessment, proficiency, barWidth };
  }, [assessments]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-ps-orange font-black text-[10px] uppercase tracking-[0.3em] mb-4">
            <Trophy size={14} />
            Verified Proficiency
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
            Skill <span className="text-ps-orange">Assessments</span>
          </h1>
          <p className="text-ps-gray text-lg max-w-xl">
            Measure your knowledge against the industry standard and identify your next growth opportunity.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-8 py-4 bg-ps-orange hover:bg-ps-orange/90 text-white rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-ps-orange/20 whitespace-nowrap"
        >
          Take New Assessment
        </button>
      </header>

      {stats ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Score Card — derived from real data */}
            <div className="lg:col-span-2 bg-ps-surface border border-white/5 rounded-[2rem] p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <BarChart3 size={200} />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-ps-orange/10 border border-ps-orange/20 flex items-center justify-center text-ps-orange">
                    <Zap size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight">
                      Skill IQ <span className="text-ps-orange">{stats.avgScore}</span>
                    </h3>
                    <p className="text-ps-gray font-medium">
                      Top {100 - stats.percentile}% — {stats.topAssessment.skill} is your strongest skill
                    </p>
                  </div>
                </div>

                <div className="space-y-6 mt-auto">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black uppercase tracking-widest text-ps-gray">Proficiency Level</span>
                    <span className={`text-sm font-bold ${stats.proficiency.color}`}>{stats.proficiency.label}</span>
                  </div>
                  <div className="h-4 bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: stats.barWidth }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-ps-orange to-orange-400"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-ps-gray/40">
                    <span>Novice</span>
                    <span>Emerging</span>
                    <span>Proficient</span>
                    <span>Advanced</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="bg-ps-surface/50 border border-white/5 rounded-[2rem] p-8 flex flex-col justify-center gap-8">
              <div>
                <div className="text-3xl font-black text-white">{stats.verifiedSkills}</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-ps-gray mt-1">Verified Skills</div>
              </div>
              <div className="h-px bg-white/5" />
              <div>
                <div className="text-3xl font-black text-ps-orange">{stats.expertBadges}</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-ps-gray mt-1">Expert Badges</div>
              </div>
              <div className="h-px bg-white/5" />
              <div>
                <div className="text-3xl font-black text-white">{stats.percentile}th</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-ps-gray mt-1">Percentile Global</div>
              </div>
            </div>
          </div>

          {/* Assessment History */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
              Recent Activity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessments.map((a) => (
                <div key={a.id} className="bg-ps-surface border border-white/5 hover:border-ps-orange/30 p-6 rounded-2xl transition-all group cursor-pointer flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/5 text-ps-orange group-hover:bg-ps-orange/10 transition-colors">
                      {iconMap[a.icon] || <Zap size={20} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-ps-orange transition-colors">{a.skill}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          a.proficiency === 'Expert' ? 'bg-ps-orange/20 text-ps-orange' : 'bg-white/10 text-ps-gray'
                        }`}>
                          {a.proficiency}
                        </span>
                        <span className="text-[10px] font-bold text-ps-gray/60 flex items-center gap-1">
                          <Clock size={10} /> {a.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-black text-white">{a.score}</div>
                      <div className="text-[10px] uppercase font-black tracking-widest text-ps-gray">Score</div>
                    </div>
                    <ChevronRight size={18} className="text-ps-gray group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Empty state — no assessments yet */
        <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
          <div className="w-20 h-20 rounded-2xl bg-ps-orange/10 border border-ps-orange/20 flex items-center justify-center text-ps-orange">
            <BookOpen size={40} />
          </div>
          <div>
            <h3 className="text-2xl font-black mb-2">No Assessments Yet</h3>
            <p className="text-ps-gray max-w-sm">
              Take your first assessment to earn Skill IQ points and see where you rank globally.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 bg-ps-orange hover:bg-ps-orange/90 text-white rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-ps-orange/20"
          >
            Take First Assessment
          </button>
        </div>
      )}

      {showModal && <AssessmentModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default SkillAssessments;
