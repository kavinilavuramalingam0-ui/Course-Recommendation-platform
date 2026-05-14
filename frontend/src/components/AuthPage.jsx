import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Mail, Lock, User, ArrowRight, ShieldCheck, Rocket, Brain } from 'lucide-react';
import { useUser } from '../context/UserContext';

const AuthPage = () => {
  const { login, register, error, loading } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        await register({ name, email, password });
      }
    } catch (err) {
      // Error handled by context
    }
  };

  return (
    <div className="min-h-screen bg-ps-dark text-white font-sans flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side: Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-ps-surface border-r border-white/5 p-16 flex-col justify-between overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-ps-orange/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-ps-orange/5 rounded-full blur-[100px]" />
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 relative z-10"
        >
          <div className="w-10 h-10 bg-ps-orange rounded-xl flex items-center justify-center rotate-12">
            <Zap fill="white" size={24} />
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter">Pluralsight <span className="text-ps-orange">Recommend</span></span>
        </motion.div>

        <div className="space-y-12 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-7xl font-black leading-tight tracking-tight uppercase"
          >
            Level up your <br />
            <span className="text-ps-orange">career journey.</span>
          </motion.h1>

          <div className="grid grid-cols-1 gap-8 max-w-md">
            {[
              { icon: <Brain className="text-ps-orange" />, title: "AI-Powered Matching", desc: "Our engine analyzes thousands of course tags to find your perfect fit." },
              { icon: <ShieldCheck className="text-ps-orange" />, title: "Verified Skill Paths", desc: "Follow curated sequences designed by industry experts." },
              { icon: <Rocket className="text-ps-orange" />, title: "Accelerated Learning", desc: "Stop guessing and start mastering the skills that matter." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (idx * 0.1) }}
                className="flex gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-ps-orange/50 transition-colors duration-500">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-ps-gray text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-ps-gray text-sm font-medium relative z-10"
        >
          &copy; 2026 Pluralsight Clone. Part of FSD AI Workshop.
        </motion.div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-16 relative">
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <div className="w-8 h-8 bg-ps-orange rounded-lg flex items-center justify-center rotate-12">
            <Zap fill="white" size={18} />
          </div>
          <span className="text-lg font-black uppercase tracking-tighter">Recommend</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-4xl font-black uppercase tracking-tight">
              {isLogin ? (
                <>Welcome <span className="text-ps-orange">Back</span></>
              ) : (
                <>Start Your <span className="text-ps-orange">Journey</span></>
              )}
            </h2>
            <p className="text-ps-gray font-medium">
              {isLogin 
                ? "Enter your credentials to access your personalized dashboard." 
                : "Create an account to start tracking your skill progress."}
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode='wait'>
              {!isLogin && (
                <motion.div 
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5 overflow-hidden"
                >
                  <label className="text-[10px] uppercase font-black tracking-widest text-ps-gray ml-1">Full Name</label>
                  <div className="relative group">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ps-gray group-focus-within:text-ps-orange transition-colors" />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-ps-surface/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-ps-orange/50 focus:bg-ps-surface transition-all placeholder:text-ps-gray/50"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-black tracking-widest text-ps-gray ml-1">Email Address</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ps-gray group-focus-within:text-ps-orange transition-colors" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full bg-ps-surface/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-ps-orange/50 focus:bg-ps-surface transition-all placeholder:text-ps-gray/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-ps-gray">Password</label>
                {isLogin && (
                  <button type="button" className="text-[10px] uppercase font-black tracking-widest text-ps-orange hover:text-white transition-colors">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ps-gray group-focus-within:text-ps-orange transition-colors" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-ps-surface/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-ps-orange/50 focus:bg-ps-surface transition-all placeholder:text-ps-gray/50"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-ps-orange hover:bg-ps-orange/90 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-xl shadow-ps-orange/20 mt-8 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  {isLogin ? 'Sign In to Account' : 'Create Your Account'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="pt-6 text-center">
            <p className="text-ps-gray text-sm font-medium">
              {isLogin ? "Don't have an account yet?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-ps-orange font-black uppercase tracking-widest text-[10px] hover:underline underline-offset-4"
              >
                {isLogin ? 'Create Account' : 'Sign In Now'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
