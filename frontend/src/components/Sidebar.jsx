import React, { useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { Filter, SlidersHorizontal, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const { filters, setFilters, userProfile, setShowOnboarding, allRecommendations } = useUser();

  // Derive available platforms from the UNFILTERED list so platforms
  // never disappear when a difficulty filter is active.
  const availablePlatforms = useMemo(() => {
    const providers = ['All', ...new Set(allRecommendations.map(c => c.provider).filter(Boolean))];
    return providers;
  }, [allRecommendations]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <aside className="w-full lg:w-72 flex flex-col gap-8 shrink-0">
      <div className="bg-ps-surface border border-white/5 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2 text-ps-orange mb-6">
          <Filter size={20} />
          <h2 className="text-xl font-bold">Discovery Filters</h2>
        </div>

        <div className="space-y-8">
          <div>
            <label className="text-xs uppercase font-black text-ps-gray mb-3 block tracking-widest">Difficulty</label>
            <div className="flex flex-col gap-2">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
                <button
                  key={diff}
                  onClick={() => handleFilterChange('difficulty', diff)}
                  className={`px-4 py-2 text-sm text-left rounded-lg transition-all ${
                    filters.difficulty === diff 
                    ? 'bg-ps-orange/10 text-ps-orange border border-ps-orange/20' 
                    : 'bg-white/5 text-ps-gray hover:text-white border border-transparent'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase font-black text-ps-gray mb-3 block tracking-widest">Platform</label>
            <div className="flex flex-col gap-2">
              {availablePlatforms.map(platform => (
                <button
                  key={platform}
                  onClick={() => handleFilterChange('platform', platform)}
                  className={`px-4 py-2 text-sm text-left rounded-lg transition-all ${
                    filters.platform === platform 
                    ? 'bg-ps-orange/10 text-ps-orange border border-ps-orange/20' 
                    : 'bg-white/5 text-ps-gray hover:text-white border border-transparent'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <button
              onClick={() => handleFilterChange('highMatchOnly', !filters.highMatchOnly)}
              className={`w-full p-4 rounded-xl flex items-center justify-between transition-all ${
                filters.highMatchOnly 
                ? 'bg-ps-orange border border-ps-orange text-white' 
                : 'bg-white/5 border border-white/5 text-ps-gray hover:text-white'
              }`}
            >
              <span className="font-bold text-sm">High Match Only</span>
              <div className={`w-10 h-6 rounded-full relative transition-colors ${filters.highMatchOnly ? 'bg-white/30' : 'bg-white/10'}`}>
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${filters.highMatchOnly ? 'translate-x-4' : ''}`} />
              </div>
            </button>
            <p className="text-[10px] text-ps-gray mt-2 px-1">Shows only courses with &gt;50% match score.</p>
          </div>
        </div>
      </div>

      <div className="bg-ps-orange/10 border border-ps-orange/20 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2 text-ps-orange mb-4">
          <SlidersHorizontal size={20} />
          <h2 className="text-lg font-bold">Your Profile</h2>
        </div>
        <p className="text-xs text-ps-gray mb-4 tracking-tighter leading-tight font-medium uppercase font-black">
          Primary Goal: <span className="text-white ml-1">{userProfile.goal || 'Not Set'}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {userProfile.interests?.map(interest => (
            <span key={interest} className="px-2 py-1 bg-ps-surface border border-white/10 text-ps-orange rounded text-[10px] font-bold uppercase">
              {interest}
            </span>
          ))}
        </div>
        <button 
          onClick={() => setShowOnboarding(true)}
          className="mt-6 w-full text-[10px] font-black uppercase text-ps-orange hover:text-white flex items-center justify-center gap-1 transition-colors"
        >
          Update Skills <ChevronRight size={12} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
