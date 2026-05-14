import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

const AuthModal = () => {
  const { showAuth, setShowAuth, login, register, authMode, setAuthMode, error, loading } = useUser();
  const [isLogin, setIsLogin] = useState(authMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setIsLogin(authMode === 'login');
  }, [authMode, showAuth]);

  if (!showAuth) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        await register({ name, email, password });
      }
    } catch (err) {
      // Error is handled by context
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowAuth(false)}
          className="absolute inset-0 bg-ps-dark/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-ps-surface border border-white/10 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 pb-0 flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight">
                {isLogin ? (
                  <>Welcome <span className="text-ps-orange">Back</span></>
                ) : (
                  <>Create <span className="text-ps-orange">Account</span></>
                )}
              </h2>
              <p className="text-ps-gray text-sm mt-2">
                {isLogin ? 'Enter your details to continue your learning journey.' : 'Join thousands of learners mastering new skills today.'}
              </p>
            </div>
            <button 
              onClick={() => setShowAuth(false)}
              className="p-2 hover:bg-white/5 rounded-full text-ps-gray hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-8 mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-ps-gray ml-1">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ps-gray" />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-black/40 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-ps-orange/50 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black tracking-widest text-ps-gray ml-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ps-gray" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-black/40 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-ps-orange/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-ps-gray">Password</label>
                {isLogin && (
                  <button type="button" className="text-[10px] uppercase font-black tracking-widest text-ps-orange hover:text-white transition-colors">
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ps-gray" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-ps-orange/50 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-ps-orange hover:bg-ps-orange/90 text-white rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-ps-orange/20 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Footer */}
          <div className="p-8 pt-0 text-center">
            <p className="text-ps-gray text-xs">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-ps-orange font-bold hover:underline"
              >
                {isLogin ? 'Sign Up Free' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
