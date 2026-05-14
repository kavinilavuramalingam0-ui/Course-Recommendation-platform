import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { learningPathService } from '../services/api';
import { Map, Clock, Users, ArrowRight, Play, BookOpen, Layers, Sparkles, Loader2 } from 'lucide-react';

const LearningPaths = () => {
  const { learningPaths, setCurrentView, setSearchQuery, user } = useUser();
  const [generating, setGenerating] = React.useState(false);
  const [customPath, setCustomPath] = React.useState(null);

  const handleStartPath = (path) => {
    // Set search query to the path title to filter relevant courses
    setSearchQuery(path.title.split(' ')[0]); // Use first word as query for broader results
    setCurrentView('explorer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateCustomPath = async () => {
    if (!user) return;
    try {
      setGenerating(true);
      const { data } = await learningPathService.generateCustomPath(user._id);
      setCustomPath(data);
      // Optional: scroll to the new path
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Failed to generate custom path:", err);
    } finally {
      setGenerating(false);
    }
  };

  const allPaths = React.useMemo(() => {
    if (customPath) return [customPath, ...learningPaths];
    return learningPaths;
  }, [learningPaths, customPath]);

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-ps-orange font-black text-[10px] uppercase tracking-[0.3em] mb-4">
            <Map size={14} />
            Guided Journeys
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-4 leading-none">Curated <span className="text-ps-orange whitespace-nowrap">Learning Paths</span></h1>
          <p className="text-ps-gray text-lg">Stop guessing. We've mapped out the exact sequences of courses needed to master high-demand roles and technologies.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-12">
        {allPaths.map((path, idx) => (
          <motion.div 
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group grid grid-cols-1 lg:grid-cols-12 bg-ps-surface border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-ps-orange/30 transition-all duration-500 shadow-2xl relative cursor-pointer"
            onClick={() => handleStartPath(path)}
          >
            {/* Path Image / Overlay */}
            <div className="lg:col-span-4 relative h-64 lg:h-auto overflow-hidden">
              <img 
                src={path.thumbnail} 
                alt={path.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ps-surface to-transparent lg:hidden" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ps-surface to-transparent hidden lg:block" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleStartPath(path); }}
                  className="w-16 h-16 rounded-full bg-ps-orange text-white flex items-center justify-center shadow-2xl shadow-ps-orange/40 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300"
                >
                  <Play size={24} fill="currentColor" />
                </button>
              </div>
            </div>

            {/* Path Details */}
            <div className="lg:col-span-8 p-8 lg:p-12 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-ps-gray">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
                    <Clock size={12} className="text-ps-orange" />
                    {path.duration}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
                    <Users size={12} className="text-ps-orange" />
                    {path.enrolled.toLocaleString()} Students
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-ps-orange/10 text-ps-orange rounded-full border border-ps-orange/20">
                    <Layers size={12} />
                    {path.level}
                  </div>
                </div>

                <h2 className="text-3xl font-black uppercase tracking-tight group-hover:text-ps-orange transition-colors duration-300">
                  {path.title}
                </h2>
                <p className="text-ps-gray max-w-xl text-lg font-medium leading-relaxed">
                  {path.description}
                </p>
              </div>

              {/* Progress Timeline */}
              <div className="mt-10 space-y-6">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-ps-gray/60">
                  <BookOpen size={12} />
                  Sequence Preview ({path.courses.length} courses)
                </div>
                
                <div className="flex items-center gap-4 relative">
                  {(path.courses || []).map((course, cIdx) => {
                    return (
                      <React.Fragment key={course._id}>
                        <div className="relative group/course">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center p-0.5 overflow-hidden group-hover/course:border-ps-orange/40 transition-colors">
                            <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover rounded-lg" />
                          </div>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-black border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-bold text-white whitespace-nowrap opacity-0 pointer-events-none group-hover/course:opacity-100 transition-opacity z-20 shadow-2xl">
                            {course.title}
                          </div>
                        </div>
                        {cIdx < path.courses.length - 1 && (
                          <div className="w-4 h-0.5 bg-white/5 rounded-full" />
                        )}
                      </React.Fragment>
                    );
                  })}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleStartPath(path); }}
                    className="flex items-center gap-2 ml-auto text-sm font-black uppercase tracking-widest text-white hover:text-ps-orange transition-colors group/btn"
                  >
                    Start Path
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <footer className="bg-ps-surface/30 border border-white/5 p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Can't find what you're looking for?</h3>
          <p className="text-ps-gray font-medium">Build a custom path based on your unique career goals and skill gap analysis.</p>
        </div>
        <button 
          onClick={handleGenerateCustomPath}
          disabled={generating}
          className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-ps-orange hover:text-white transition-all rounded-2xl shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {generating ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Generate Custom Path
            </>
          )}
        </button>
      </footer>
    </div>
  );
};

export default LearningPaths;
