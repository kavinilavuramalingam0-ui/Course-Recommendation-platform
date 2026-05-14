import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, ExternalLink } from 'lucide-react';

const CourseCard = ({ course }) => {
  const { 
    title, 
    provider, 
    thumbnailUrl, 
    matchScore, 
    matchedTags = [], 
    gapTags = [], 
    description 
  } = course;

  // Defaults for missing backend fields in v1
  const rating = course.rating || 4.8;
  const reviews = course.reviews || 1250;
  const difficulty = course.difficulty || 'Intermediate';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-ps-surface border border-white/5 rounded-2xl overflow-hidden hover:border-ps-orange/30 transition-all group flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070'} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ps-dark to-transparent opacity-60" />
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] uppercase tracking-wider font-bold border border-white/10">
            {difficulty}
          </span>
          <span className="px-2 py-1 bg-ps-orange rounded text-[10px] uppercase tracking-wider font-bold border border-ps-orange/50">
            {provider}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-ps-orange mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(rating) ? "currentColor" : "none"} />
              ))}
              <span className="text-white text-sm font-bold ml-1">{rating}</span>
            </div>
            <div className="flex items-center gap-1 text-ps-gray text-xs">
              <Users size={12} />
              <span>{reviews.toLocaleString()} students</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-3xl font-black text-ps-orange leading-none">{matchScore}%</div>
            <div className="text-[10px] uppercase font-bold text-ps-gray">Match</div>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold leading-tight mb-2 line-clamp-2 group-hover:text-ps-orange transition-colors">
          {title}
        </h3>
        <p className="text-ps-gray text-xs mb-4 line-clamp-2 italic">{description}</p>

        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {matchedTags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md text-[10px] font-bold uppercase transition-colors hover:bg-green-500/20 cursor-default">
                {tag}
              </span>
            ))}
            {gapTags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-white/5 text-ps-gray border border-white/5 rounded-md text-[10px] font-bold uppercase transition-colors hover:bg-ps-gray/20 cursor-default">
                {tag}
              </span>
            ))}
          </div>

          <button 
            onClick={() => course.courseUrl ? window.open(course.courseUrl, '_blank', 'noopener,noreferrer') : null}
            disabled={!course.courseUrl}
            className={`w-full py-3 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border shadow-lg group/btn ${
              course.courseUrl
                ? 'bg-white/5 hover:bg-ps-orange border-white/5 hover:border-ps-orange hover:shadow-ps-orange/20 cursor-pointer'
                : 'bg-white/5 border-white/5 opacity-40 cursor-not-allowed'
            }`}
          >
            View Course
            <ExternalLink size={16} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
