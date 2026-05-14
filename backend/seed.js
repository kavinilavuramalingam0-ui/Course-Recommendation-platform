require('dotenv').config();
const mongoose = require('mongoose');

const User = require('./models/User');
const Course = require('./models/Course');
const Review = require('./models/Review');
const LearningPath = require('./models/LearningPath');

const sampleCourses = [
  // ── PLURALSIGHT ──────────────────────────────────────────────────
  {
    title: 'Advanced React Design Patterns',
    provider: 'Pluralsight',
    difficulty: 'Advanced',
    courseUrl: 'https://app.pluralsight.com/library/courses/react-advanced-patterns',
    description: 'Learn how to build scalable React applications using advanced design patterns like Compound Components, Render Props, and Custom Hooks.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070',
    categoryTags: ['React', 'Frontend', 'JavaScript', 'Design Patterns']
  },
  {
    title: 'Node.js Microservices Architecture',
    provider: 'Pluralsight',
    difficulty: 'Advanced',
    courseUrl: 'https://app.pluralsight.com/library/courses/nodejs-microservices',
    description: 'Master the principles of microservices and how to implement them effectively using Node.js and Docker.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088',
    categoryTags: ['Node.js', 'Backend', 'Microservices', 'Docker']
  },
  {
    title: 'Python for Data Science Fundamentals',
    provider: 'Pluralsight',
    difficulty: 'Beginner',
    courseUrl: 'https://app.pluralsight.com/library/courses/python-data-science',
    description: 'A comprehensive introduction to Python programming specifically tailored for data analysis and visualization using pandas and matplotlib.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070',
    categoryTags: ['Python', 'Data Science', 'Machine Learning', 'Analytics']
  },
  {
    title: 'AWS Certified Solutions Architect',
    provider: 'Pluralsight',
    difficulty: 'Advanced',
    courseUrl: 'https://app.pluralsight.com/library/courses/aws-architect-big-picture',
    description: 'Prepare for the AWS Certified Solutions Architect exam. Covers core AWS services, security, and architecture best practices.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072',
    categoryTags: ['AWS', 'Cloud Computing', 'Architecture', 'DevOps']
  },
  {
    title: 'CSS Grid & Flexbox Mastery',
    provider: 'Pluralsight',
    difficulty: 'Beginner',
    courseUrl: 'https://app.pluralsight.com/library/courses/css-grid-flexbox-layouts',
    description: 'Build complex, responsive layouts with ease using modern CSS techniques like Grid and Flexbox.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070',
    categoryTags: ['CSS', 'Frontend', 'Web Design', 'UI/UX']
  },
  {
    title: 'GraphQL API Development with Apollo',
    provider: 'Pluralsight',
    difficulty: 'Intermediate',
    courseUrl: 'https://app.pluralsight.com/library/courses/graphql-big-picture',
    description: 'Step-by-step guide to building powerful and efficient APIs using GraphQL and Apollo Server.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034',
    categoryTags: ['GraphQL', 'Backend', 'API', 'JavaScript']
  },
  {
    title: 'Cybersecurity Fundamentals: Penetration Testing',
    provider: 'Pluralsight',
    difficulty: 'Beginner',
    courseUrl: 'https://app.pluralsight.com/library/courses/ethical-hacking-penetration-testing',
    description: 'Learn the basics of ethical hacking, vulnerability scanning, and how to secure networks and applications.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070',
    categoryTags: ['Cybersecurity', 'Security', 'Penetration Testing', 'Networking']
  },
  {
    title: 'Mastering TypeScript for React Developers',
    provider: 'Pluralsight',
    difficulty: 'Intermediate',
    courseUrl: 'https://app.pluralsight.com/library/courses/typescript-react',
    description: 'Elevate your React skills by integrating TypeScript. Learn about interfaces, generics, and strict typing in large codebases.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128',
    categoryTags: ['TypeScript', 'React', 'Frontend', 'JavaScript']
  },
  {
    title: 'Kubernetes for Developers: Core Concepts',
    provider: 'Pluralsight',
    difficulty: 'Advanced',
    courseUrl: 'https://app.pluralsight.com/library/courses/kubernetes-developers-core-concepts',
    description: 'Deploy, scale, and manage containerized applications with Kubernetes. Covers Pods, Services, and Deployments.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2070',
    categoryTags: ['Kubernetes', 'Cloud Computing', 'DevOps', 'Docker']
  },
  {
    title: 'Full Stack Next.js & Prisma',
    provider: 'Pluralsight',
    difficulty: 'Intermediate',
    courseUrl: 'https://app.pluralsight.com/library/courses/building-full-stack-app-nextjs-prisma',
    description: 'Build a full-stack web application from scratch using Next.js 14, React Server Components, and Prisma ORM.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=2070',
    categoryTags: ['Next.js', 'React', 'Fullstack', 'JavaScript', 'Database']
  },
  {
    title: 'Machine Learning with TensorFlow 2',
    provider: 'Pluralsight',
    difficulty: 'Advanced',
    courseUrl: 'https://app.pluralsight.com/library/courses/tensorflow-2-getting-started',
    description: 'Build complex neural networks and deep learning models using Python and TensorFlow 2.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965',
    categoryTags: ['Machine Learning', 'Python', 'AI', 'TensorFlow']
  },
  {
    title: 'Go Programming: The Complete Developer Guide',
    provider: 'Pluralsight',
    difficulty: 'Intermediate',
    courseUrl: 'https://app.pluralsight.com/library/courses/go-programming-complete-developer-guide',
    description: "Learn Google's Go language. From basic syntax to advanced concurrency using Goroutines and Channels.",
    thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069',
    categoryTags: ['Go', 'Backend', 'Programming', 'Concurrency']
  },
  {
    title: 'Designing Accessible Web Interfaces',
    provider: 'Pluralsight',
    difficulty: 'Intermediate',
    courseUrl: 'https://app.pluralsight.com/library/courses/web-accessibility-meeting-guidelines',
    description: 'Ensure your web apps meet WCAG standards. Learn about ARIA attributes, keyboard navigation, and semantic HTML.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1546900703-cf06143d1239?q=80&w=2070',
    categoryTags: ['Accessibility', 'Frontend', 'UI/UX', 'HTML']
  },
  {
    title: 'Data Structures and Algorithms in Java',
    provider: 'Pluralsight',
    difficulty: 'Intermediate',
    courseUrl: 'https://app.pluralsight.com/library/courses/java-data-structures-algorithms',
    description: 'Master the core concepts of DSA in Java. Essential preparation for software engineering technical interviews.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070',
    categoryTags: ['Java', 'Algorithms', 'Data Structures', 'Interview Prep']
  },
  {
    title: 'Building Real-time Apps with WebSockets & Redis',
    provider: 'Pluralsight',
    difficulty: 'Intermediate',
    courseUrl: 'https://app.pluralsight.com/library/courses/nodejs-websockets-real-time',
    description: 'Create scalable, real-time communication systems like chat apps and live dashboards using Socket.io and Redis pub/sub.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070',
    categoryTags: ['Node.js', 'WebSockets', 'Backend', 'Redis']
  },
  {
    title: 'Android App Development with Kotlin',
    provider: 'Pluralsight',
    difficulty: 'Intermediate',
    courseUrl: 'https://app.pluralsight.com/library/courses/android-development-kotlin-fundamentals',
    description: 'Learn modern Android development using Kotlin, Jetpack Compose, and robust architectural patterns.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=2070',
    categoryTags: ['Android', 'Mobile Development', 'Kotlin', 'Mobile']
  },
  {
    title: 'iOS App Development: SwiftUI Basics',
    provider: 'Pluralsight',
    difficulty: 'Beginner',
    courseUrl: 'https://app.pluralsight.com/library/courses/swift-ui-fundamentals',
    description: "A beginner's guide to building native iOS applications for iPhone and iPad using Swift and SwiftUI.",
    thumbnailUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070',
    categoryTags: ['iOS', 'Mobile Development', 'Swift', 'Mobile']
  },
  {
    title: 'Angular Masterclass: RxJS and State Management',
    provider: 'Pluralsight',
    difficulty: 'Intermediate',
    courseUrl: 'https://app.pluralsight.com/library/courses/rxjs-angular-reactive-development',
    description: "Deep dive into Angular's reactive programming model with RxJS and effective state management using NgRx.",
    thumbnailUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974',
    categoryTags: ['Angular', 'Frontend', 'JavaScript', 'RxJS']
  },
  {
    title: 'Introduction to Rust Programming',
    provider: 'Pluralsight',
    difficulty: 'Beginner',
    courseUrl: 'https://app.pluralsight.com/library/courses/rust-fundamentals',
    description: 'Learn a language that empowers everyone to build reliable and efficient software. Focus on memory safety and concurrency.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070',
    categoryTags: ['Rust', 'Systems Programming', 'Backend']
  },
  {
    title: 'Vue 3 Essentials: Composition API',
    provider: 'Pluralsight',
    difficulty: 'Beginner',
    courseUrl: 'https://app.pluralsight.com/library/courses/vue-3-composition-api',
    description: 'Master the Vue 3 Composition API to write cleaner, more reusable component logic.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070',
    categoryTags: ['Vue', 'Frontend', 'JavaScript', 'Web']
  },

  // ── UDEMY ────────────────────────────────────────────────────────
  {
    title: 'The Complete JavaScript Course 2024',
    provider: 'Udemy',
    difficulty: 'Beginner',
    courseUrl: 'https://www.udemy.com/course/the-complete-javascript-course/',
    description: 'The most comprehensive JavaScript course on the market. Go from zero to expert covering DOM, OOP, async JS, and modern ES6+.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070',
    categoryTags: ['JavaScript', 'Frontend', 'Web', 'Programming']
  },
  {
    title: 'React - The Complete Guide (incl. Hooks, Router, Redux)',
    provider: 'Udemy',
    difficulty: 'Intermediate',
    courseUrl: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
    description: 'Dive in and learn React from scratch. Covers all core modern React concepts including Hooks, Context, Redux Toolkit, and React Router.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1587620962725-abab19836100?q=80&w=2031',
    categoryTags: ['React', 'Frontend', 'JavaScript', 'Redux']
  },
  {
    title: 'The Web Developer Bootcamp 2024',
    provider: 'Udemy',
    difficulty: 'Beginner',
    courseUrl: 'https://www.udemy.com/course/the-web-developer-bootcamp/',
    description: 'The only course you need to learn web development. HTML, CSS, JS, Node, MongoDB, and more — all in one comprehensive bootcamp.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064',
    categoryTags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Fullstack']
  },

  // ── COURSERA ─────────────────────────────────────────────────────
  {
    title: 'Machine Learning Specialization',
    provider: 'Coursera',
    difficulty: 'Advanced',
    courseUrl: 'https://www.coursera.org/specializations/machine-learning-introduction',
    description: 'Build ML models with NumPy & scikit-learn, build & train supervised models for prediction & binary classification, and apply best practices.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070',
    categoryTags: ['Machine Learning', 'Python', 'AI', 'Data Science']
  },
  {
    title: 'Google Data Analytics Professional Certificate',
    provider: 'Coursera',
    difficulty: 'Beginner',
    courseUrl: 'https://www.coursera.org/professional-certificates/google-data-analytics',
    description: 'Get on the fast track to a career in data analytics. Learn in-demand skills from Google employees with hands-on projects.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
    categoryTags: ['Data Science', 'Analytics', 'SQL', 'Python']
  },
];

const samplePaths = [
  {
    title: "Senior Fullstack Mastery",
    description: "Go from junior to senior engineer by mastering the intersection of frontend, backend, and DevOps.",
    level: "Advanced",
    courseTitles: ["Advanced React Design Patterns", "Node.js Microservices Architecture", "Full Stack Next.js & Prisma", "Mastering TypeScript for React Developers"],
    duration: "45h 12m",
    enrolled: 1240,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
  },
  {
    title: "Cloud Native Architect",
    description: "Design scalable, resilient architectures using AWS, Docker, and Kubernetes.",
    level: "Advanced",
    courseTitles: ["AWS Certified Solutions Architect", "Kubernetes for Developers: Core Concepts", "Node.js Microservices Architecture"],
    duration: "32h 20m",
    enrolled: 850,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
  },
  {
    title: "Modern UI/UX Engineer",
    description: "Build beautiful, highly-responsive web applications using Tailwind and Next.js.",
    level: "Intermediate",
    courseTitles: ["CSS Grid & Flexbox Mastery", "Full Stack Next.js & Prisma", "GraphQL API Development with Apollo"],
    duration: "24h 15m",
    enrolled: 2100,
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
  }
];

const seedDatabase = async () => {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('Connected to Database for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Review.deleteMany({});
    await LearningPath.deleteMany({});
    console.log('Cleared existing data.');

    // Insert Courses
    const createdCourses = await Course.insertMany(sampleCourses);
    console.log(`Successfully seeded ${createdCourses.length} courses!`);

    // Insert Sample User
    const sampleUser = new User({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
      interestTags: ['React', 'Backend', 'Node.js', 'Fullstack']
    });
    
    const savedUser = await sampleUser.save();
    console.log(`Successfully seeded sample user with ID: ${savedUser._id}`);

    // Insert Sample Reviews
    const sampleReview1 = new Review({
      userId: savedUser._id,
      courseId: createdCourses[0]._id, // Advanced React
      rating: 5,
      comment: 'Excellent deep dive into advanced patterns!'
    });

    const sampleReview2 = new Review({
      userId: savedUser._id,
      courseId: createdCourses[1]._id, // Node.js Microservices
      rating: 4,
      comment: 'Very informative, but pacing was a bit fast.'
    });

    await Review.insertMany([sampleReview1, sampleReview2]);
    console.log('Successfully seeded sample reviews!');

    // Insert Learning Paths
    const pathData = samplePaths.map(path => {
      const pathCourses = path.courseTitles.map(title => {
        const found = createdCourses.find(c => c.title === title);
        return found ? found._id : null;
      }).filter(id => id !== null);

      return {
        ...path,
        courses: pathCourses
      };
    });

    await LearningPath.insertMany(pathData);
    console.log(`Successfully seeded ${pathData.length} learning paths!`);

    console.log('Database seeding complete!');
    process.exit(0);

  } catch (error) {
    console.error('Seeding error:', error.message);
    if (error.message.includes('ENOTFOUND') || error.message.includes('topology')) {
      console.error('\n>>> TIP: Make sure your IP is whitelisted in MongoDB Atlas.');
      console.error('>>> Go to Atlas -> Network Access -> Add Current IP Address.\n');
    }
    process.exit(1);
  }
};

seedDatabase();
