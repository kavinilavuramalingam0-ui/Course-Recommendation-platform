import React from 'react';
import Masonry from 'react-layout-masonry';
import CourseCard from './CourseCard';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, LayoutGrid } from 'lucide-react';

const MasonryGrid = () => {
  const { recommendations, loading, error } = useUser();

  if (loading && recommendations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-white/10 rounded-3xl bg-white/5 animate-pulse">
        <LayoutGrid size={48} className="text-ps-orange mb-4 opacity-50" />
        <h3 className="text-xl font-bold text-white mb-2">Analyzing your skills...</h3>
        <p className="text-ps-gray text-center max-w-xs">Curating the best courses from Pluralsight for your career goals.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-red-500/10 rounded-3xl bg-red-500/5">
        <h3 className="text-xl font-bold text-red-400 mb-2">Connection Error</h3>
        <p className="text-ps-gray text-center max-w-xs">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-bold border border-red-500/20 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-white/10 rounded-3xl bg-white/5">
        <Sparkles size={48} className="text-ps-orange mb-4 opacity-50" />
        <h3 className="text-xl font-bold text-white mb-2">No matches found</h3>
        <p className="text-ps-gray text-center max-w-xs">Try adding more skills to your profile to get personalized recommendations.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <LayoutGrid className="text-ps-orange" size={24} />
          <h1 className="text-2xl font-black uppercase tracking-tight">Recommended for You</h1>
        </div>
        <div className="text-xs font-bold text-ps-gray uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          {recommendations.length} Results
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <Masonry
          columns={{ 1: 1, 640: 2, 1024: 3 }}
          gap={24}
        >
          {recommendations.map((course) => (
            <motion.div
              key={course._id || course.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </Masonry>
      </AnimatePresence>
    </div>
  );
};


export default MasonryGrid;
