import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService, recommendationService, learningPathService, authService, assessmentService } from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : { interests: [], goal: '', onboardingComplete: false };
  });

  const [dbUser, setDbUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [learningPaths, setLearningPaths] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [filters, setFilters] = useState({
    difficulty: 'All',
    platform: 'All',
    highMatchOnly: false
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('explorer');
  const [showOnboarding, setShowOnboarding] = useState(!userProfile.onboardingComplete);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const [assessments, setAssessments] = useState([]);

  const addAssessment = async (result) => {
    if (!dbUser) return;
    try {
      const response = await assessmentService.create(result);
      if (response.success) {
        setAssessments(prev => [response.data, ...prev]);
      }
    } catch (err) {
      console.error("Failed to save assessment:", err);
    }
  };

  // Auth Initialization
  useEffect(() => {
    const initAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const { data } = await authService.getMe();
        const names = data.name.split(' ');
        const initials = names.map(n => n[0]).join('').toUpperCase().substring(0, 2);
        setDbUser({ ...data, initials });
        
        // Load user-specific profile from localStorage
        const savedProfile = localStorage.getItem(`userProfile_${data._id}`);
        if (savedProfile) {
          setUserProfile(JSON.parse(savedProfile));
        } else {
          setUserProfile({
            interests: data.interestTags || [],
            goal: data.goal || '',
            onboardingComplete: (data.interestTags || []).length > 0
          });
        }

        // Fetch assessments from DB
        const response = await assessmentService.getAll();
        if (response.success) {
          setAssessments(response.data);
        }
      } catch (err) {
        console.error("Auth initialization failed:", err);
        localStorage.removeItem('token');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchPaths = async () => {
      try {
        const { data } = await learningPathService.getAll();
        setLearningPaths(data);
      } catch (err) {
        console.error("Failed to fetch learning paths:", err);
      }
    };

    initAuth();
    fetchPaths();
  }, [token]);

  // Fetch recommendations when user interests or DB user changes
  useEffect(() => {
    const fetchRecs = async () => {
      if (!dbUser) return;
      try {
        setLoading(true);
        const { data } = await recommendationService.getForUser(dbUser._id);
        setRecommendations(data);
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, [dbUser]);

  useEffect(() => {
    if (dbUser) {
      localStorage.setItem(`userProfile_${dbUser._id}`, JSON.stringify(userProfile));
    }
  }, [userProfile, dbUser]);

  const updateProfile = async (data) => {
    if (!dbUser) return;
    
    try {
      setLoading(true);
      // Update backend
      if (data.interests) {
        await userService.updateInterests(dbUser._id, data.interests);
      }
      if (data.goal) {
        await userService.updateGoal(dbUser._id, data.goal);
      }
      
      // Update local state
      setUserProfile(prev => ({ ...prev, ...data, onboardingComplete: true }));
      
      // Refresh recommendations (goal bonus now applies)
      const { data: newRecs } = await recommendationService.getForUser(dbUser._id);
      setRecommendations(newRecs);
      
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to save interests.");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await authService.login(credentials);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setShowAuth(false);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await authService.register(userData);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setShowAuth(false);
      setShowOnboarding(true); // Redirect to onboarding for new users
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || 'Registration failed. Please try a different email.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setDbUser(null);
    setCurrentView('explorer');
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const filteredRecommendations = React.useMemo(() => {
    let list = [...recommendations];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      list = list.filter(c => 
        c.title.toLowerCase().includes(query) || 
        (c.provider && c.provider.toLowerCase().includes(query)) ||
        (c.categoryTags && c.categoryTags.some(t => t.toLowerCase().includes(query)))
      );
    }

    // Difficulty filter — now backed by the difficulty field in the DB
    if (filters.difficulty && filters.difficulty !== 'All') {
      list = list.filter(c => c.difficulty === filters.difficulty);
    }
    if (filters.platform && filters.platform !== 'All') {
      list = list.filter(c => c.provider === filters.platform);
    }
    if (filters.highMatchOnly) {
      list = list.filter(c => c.matchScore >= 50);
    }

    // Sort by match score descending
    return list.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }, [recommendations, filters, searchQuery]);

  return (
    <UserContext.Provider value={{ 
      userProfile, 
      updateProfile, 
      filters, 
      setFilters, 
      recommendations: filteredRecommendations,
      allRecommendations: recommendations,
      showOnboarding,
      setShowOnboarding,
      showAuth,
      setShowAuth,
      openAuth,
      authMode,
      setAuthMode,
      user: dbUser,
      loading,
      error,
      searchQuery,
      setSearchQuery,
      currentView,
      setCurrentView,
      isAuthenticated: !!dbUser,
      assessments,
      addAssessment,
      learningPaths,
      login,
      register,
      logout,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
