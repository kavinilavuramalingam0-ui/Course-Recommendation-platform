import React from 'react';
import { UserProvider, useUser } from './context/UserContext';
import Sidebar from './components/Sidebar';
import MasonryGrid from './components/MasonryGrid';
import OnboardingModal from './components/OnboardingModal';
import AuthPage from './components/AuthPage';
import SkillAssessments from './components/SkillAssessments';
import LearningPaths from './components/LearningPaths';
import { Search, Zap, Layers, BarChart3, LogOut, User as UserIcon, LayoutGrid, Trophy, Map as MapIcon } from 'lucide-react';

const AppContent = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    isAuthenticated, 
    user, 
    openAuth, 
    logout,
    showOnboarding,
    currentView,
    setCurrentView
  } = useUser();

  const renderMainContent = () => {
    switch(currentView) {
      case 'assessments':
        return <SkillAssessments />;
      case 'paths':
        return <LearningPaths />;
      case 'explorer':
      default:
        return (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <Sidebar />
            <div className="flex-1 min-w-0">
              <MasonryGrid />
            </div>
          </div>
        );
    }
  };

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-ps-dark text-white font-sans overflow-x-hidden selection:bg-ps-orange selection:text-white">
      {/* Navigation Bar */}
      <nav className="h-16 border-b border-white/5 bg-ps-surface/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('explorer')}>
            <div className="w-8 h-8 bg-ps-orange rounded-lg flex items-center justify-center rotate-12 transition-transform hover:rotate-0">
              <Zap fill="white" size={20} />
            </div>
            <span className="text-xl font-black uppercase tracking-tighter hidden md:block transition-all hover:text-ps-orange">Pluralsight <span className="text-ps-orange">Recommend</span></span>
          </div>
          
          <div className="hidden lg:flex items-center gap-2">
            {[
              { id: 'explorer', label: 'Course Explorer', icon: <LayoutGrid size={14} /> },
              { id: 'assessments', label: 'Skill Assessments', icon: <Trophy size={14} /> },
              { id: 'paths', label: 'Learning Paths', icon: <MapIcon size={14} /> },
            ].map(link => (
              <button 
                key={link.id}
                onClick={() => setCurrentView(link.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                  currentView === link.id 
                    ? 'bg-white/10 text-white border border-white/10' 
                    : 'text-ps-gray hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ps-gray group-focus-within:text-ps-orange transition-colors" size={18} />
            <input 
              type="text" 
              placeholder={`Search ${currentView}...`} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/40 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-ps-orange/50 focus:bg-black/60 transition-all w-48 lg:w-64"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-[10px] font-black tracking-widest text-ps-gray uppercase">Learner</span>
              <span className="text-xs font-bold text-white leading-none">{user.name}</span>
            </div>
            <div className="group relative">
              <div className="w-9 h-9 rounded-full bg-ps-orange/20 border border-ps-orange/30 flex items-center justify-center text-[10px] font-black text-ps-orange cursor-pointer hover:bg-ps-orange hover:text-white transition-all">
                {user.initials}
              </div>
              <div className="absolute right-0 top-full pt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-ps-surface border border-white/10 rounded-xl p-2 shadow-2xl min-w-[150px]">
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-ps-gray hover:text-ps-orange hover:bg-white/5 rounded-lg transition-all"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Conditional Hero Section (Only for Explorer) */}
      {currentView === 'explorer' && (
        <header className="px-6 py-8 lg:py-10 max-w-7xl mx-auto animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="relative p-8 lg:p-12 rounded-[2rem] bg-gradient-to-br from-ps-surface to-ps-dark border border-white/5 overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Layers size={240} />
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 text-ps-orange font-black text-[10px] uppercase tracking-[0.3em] mb-6">
                <BarChart3 size={14} />
                Skill Overlap Engine AI Active
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
                Stop guessing.<br />Start <span className="text-ps-orange">learning.</span>
              </h2>
              <p className="text-base lg:text-lg text-ps-gray max-w-xl leading-relaxed font-medium">
                Connect your career goals with our expert-level course tags and visualize your path to proficiency in seconds.
              </p>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Layout */}
      <main className="px-6 py-8 md:py-12 max-w-7xl mx-auto">
        {renderMainContent()}
      </main>

      {showOnboarding && <OnboardingModal />}

      {/* Footer */}
      <footer className="border-t border-white/5 bg-ps-surface/30 mt-20 px-6 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex items-center gap-2 grayscale brightness-50 cursor-pointer" onClick={() => setCurrentView('explorer')}>
            <div className="w-6 h-6 bg-ps-gray rounded flex items-center justify-center rotate-12">
              <Zap fill="white" size={14} />
            </div>
            <span className="text-lg font-black uppercase tracking-tighter">Pluralsight Recommend</span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] uppercase font-black tracking-widest text-ps-gray">
              &copy; 2026 Pluralsight Clone. Built for Fullstack AI Workshop bootcamp.
            </p>
            <p className="text-[9px] uppercase font-black tracking-[0.2em] text-ps-orange/40">
              Interactive Prototype v1.3
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;
