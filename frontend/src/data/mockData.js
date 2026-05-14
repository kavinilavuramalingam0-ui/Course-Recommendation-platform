export const mockCourses = [
  {
    id: 1,
    title: "React Deep Dive: From Fundamentals to Advanced Patterns",
    instructor: "Sarah Jenkins",
    platform: "Pluralsight",
    difficulty: "Beginner",
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
    rating: 4.8,
    reviews: 1240,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Mastering Node.js and Express for Scalable Backends",
    instructor: "Michael Chen",
    platform: "Pluralsight",
    difficulty: "Advanced",
    tags: ["Node.js", "Express", "Backend", "JavaScript", "API"],
    rating: 4.7,
    reviews: 890,
    image: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Microservices Architecture with Docker and Kubernetes",
    instructor: "David Miller",
    platform: "Pluralsight",
    difficulty: "Advanced",
    tags: ["Docker", "Kubernetes", "DevOps", "Microservices", "Cloud"],
    rating: 4.9,
    reviews: 560,
    image: "https://images.unsplash.com/photo-1605752683031-04de21b14227?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "Tailwind CSS: Modern Responsive Design",
    instructor: "Alex Rivera",
    platform: "Pluralsight",
    difficulty: "Beginner",
    tags: ["Tailwind CSS", "CSS", "Frontend", "UI/UX"],
    rating: 4.6,
    reviews: 1100,
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    title: "Python for Data Science and Machine Learning",
    instructor: "Emily Stone",
    platform: "Pluralsight",
    difficulty: "Intermediate",
    tags: ["Python", "Data Science", "Machine Learning", "AI"],
    rating: 4.8,
    reviews: 2300,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    title: "AWS Certified Solutions Architect Associate",
    instructor: "Ryan Kroonenburg",
    platform: "Pluralsight",
    difficulty: "Intermediate",
    tags: ["AWS", "Cloud", "Architecture", "Infrastructure"],
    rating: 4.9,
    reviews: 4500,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 7,
    title: "Fullstack Web Development with Next.js",
    instructor: "Guillermo Rauch",
    platform: "Pluralsight",
    difficulty: "Advanced",
    tags: ["Next.js", "React", "Fullstack", "JavaScript"],
    rating: 4.7,
    reviews: 950,
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 8,
    title: "Building Real-time Apps with GraphQL and Apollo",
    instructor: "Lee Byron",
    platform: "Pluralsight",
    difficulty: "Intermediate",
    tags: ["GraphQL", "Apollo", "Frontend", "API"],
    rating: 4.6,
    reviews: 430,
    image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 9,
    title: "Git and GitHub: Essential Version Control",
    instructor: "Linus Torvalds",
    platform: "Pluralsight",
    difficulty: "Beginner",
    tags: ["Git", "GitHub", "DevOps", "Workflow"],
    rating: 4.9,
    reviews: 8200,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2ee?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 10,
    title: "TypeScript Mastery: Professional Application Dev",
    instructor: "Anders Hejlsberg",
    platform: "Pluralsight",
    difficulty: "Intermediate",
    tags: ["TypeScript", "JavaScript", "Frontend", "Backend"],
    rating: 4.8,
    reviews: 1300,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60"
  }
];

export const careerGoals = [
  "Fullstack Developer",
  "Frontend Engineer",
  "Backend Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Cloud Architect"
];

// Maps each career goal to the skills most relevant for that path.
// Used in OnboardingModal Step 2 to group tags and in matchService for goal bonus.
export const goalTagMap = {
  'Fullstack Developer':  ['React', 'Node.js', 'JavaScript', 'TypeScript', 'Next.js', 'Express', 'GraphQL'],
  'Frontend Engineer':    ['React', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
  'Backend Developer':    ['Node.js', 'Express', 'Python', 'GraphQL', 'Docker', 'Git'],
  'DevOps Engineer':      ['Docker', 'Kubernetes', 'AWS', 'DevOps', 'Git', 'Python'],
  'Data Scientist':       ['Python', 'Machine Learning', 'AWS', 'Git'],
  'Cloud Architect':      ['AWS', 'Docker', 'Kubernetes', 'DevOps'],
};

export const availableTags = [
  "React", "Node.js", "JavaScript", "TypeScript", "Python", 
  "AWS", "Docker", "Kubernetes", "Next.js", "Tailwind CSS", 
  "GraphQL", "DevOps", "Git", "Machine Learning", "Express"
];

export const mockAssessments = [
  { id: 1, name: "React Proficiency", level: "Expert", score: 284, date: "2 days ago", icon: "zap" },
  { id: 2, name: "Node.js Backend", level: "Proficient", score: 195, date: "1 week ago", icon: "server" },
  { id: 3, name: "CSS/Tailwind Design", level: "Advanced", score: 210, date: "3 days ago", icon: "palette" },
  { id: 4, name: "JavaScript Advanced", level: "Expert", score: 290, date: "Just now", icon: "code-2" }
];

export const mockPaths = [
  {
    id: "p1",
    title: "Senior Fullstack Mastery",
    description: "Go from junior to senior engineer by mastering the intersection of frontend, backend, and DevOps.",
    level: "Advanced",
    courses: [1, 2, 7, 10],
    duration: "45h 12m",
    enrolled: 1240,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
  },
  {
    id: "p2",
    title: "Cloud Native Architect",
    description: "Design scalable, resilient architectures using AWS, Docker, and Kubernetes.",
    level: "Advanced",
    courses: [3, 6, 9],
    duration: "32h 20m",
    enrolled: 850,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
  },
  {
    id: "p3",
    title: "Modern UI/UX Engineer",
    description: "Build beautiful, highly-responsive web applications using Tailwind and Next.js.",
    level: "Intermediate",
    courses: [4, 7, 8],
    duration: "24h 15m",
    enrolled: 2100,
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
  }
];
