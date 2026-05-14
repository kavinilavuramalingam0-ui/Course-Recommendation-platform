/**
 * Calculates the match score between user interests and course tags.
 * @param {string[]} userInterests - Array of tags user is interested in.
 * @param {string[]} courseTags - Array of tags the course covers.
 * @returns {Object} { score: number, matched: string[], gap: string[] }
 */
export const calculateMatchScore = (userInterests = [], courseTags = []) => {
  if (!courseTags.length) return { score: 0, matched: [], gap: [] };
  
  const matched = courseTags.filter(tag => 
    userInterests.some(interest => interest.toLowerCase() === tag.toLowerCase())
  );
  
  const gap = courseTags.filter(tag => 
    !matched.includes(tag)
  );
  
  const score = Math.round((matched.length / courseTags.length) * 100);
  
  return { score, matched, gap };
};
