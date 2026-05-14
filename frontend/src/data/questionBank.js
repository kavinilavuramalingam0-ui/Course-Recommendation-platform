// Question bank for Skill Assessments.
// Each skill has 5 multiple-choice questions.
// `answer` is the 0-based index of the correct option.

export const questionBank = {
  'React': [
    { q: 'Which hook runs a side effect after every render by default?', options: ['useState', 'useEffect', 'useRef', 'useCallback'], answer: 1 },
    { q: 'What does the React key prop help with?', options: ['Styling elements', 'Identifying list items for reconciliation', 'Passing data to children', 'Preventing re-renders'], answer: 1 },
    { q: 'Which pattern lets you share stateful logic between components without changing the component tree?', options: ['HOC', 'Render Props', 'Custom Hooks', 'Context API'], answer: 2 },
    { q: 'What does React.memo() do?', options: ['Memoizes a value', 'Prevents re-render if props are unchanged', 'Creates a ref', 'Caches API results'], answer: 1 },
    { q: 'In React 18, what is the main benefit of concurrent rendering?', options: ['Faster hydration', 'Interruptible renders to keep UI responsive', 'Server-side props', 'Auto batching only'], answer: 1 },
  ],
  'Node.js': [
    { q: 'What is the event loop responsible for in Node.js?', options: ['Executing synchronous code', 'Managing non-blocking I/O callbacks', 'Spawning threads', 'Garbage collection'], answer: 1 },
    { q: 'Which module is used to create an HTTP server natively in Node.js?', options: ['fs', 'path', 'http', 'net'], answer: 2 },
    { q: 'What does process.nextTick() do?', options: ['Queues a callback after I/O', 'Queues a callback before the next event loop iteration', 'Delays execution by 1ms', 'Runs in a worker thread'], answer: 1 },
    { q: 'Which of these is NOT a built-in Node.js module?', options: ['os', 'crypto', 'lodash', 'stream'], answer: 2 },
    { q: 'What is a Stream in Node.js used for?', options: ['Storing data', 'Processing data piece by piece', 'Scheduling tasks', 'Managing processes'], answer: 1 },
  ],
  'JavaScript': [
    { q: 'What does the "=== " operator check?', options: ['Value only', 'Value and type', 'Reference equality', 'Prototype chain'], answer: 1 },
    { q: 'What does Array.prototype.reduce() return?', options: ['Always an array', 'A single accumulated value', 'A new array of same length', 'A boolean'], answer: 1 },
    { q: 'What is a closure?', options: ['A function that returns an object', 'A function with access to its outer scope', 'An immediately invoked function', 'A pure function'], answer: 1 },
    { q: 'Which method is used to create a shallow copy of an object?', options: ['Object.create()', 'Object.assign()', 'JSON.parse(JSON.stringify())', 'structuredClone()'], answer: 1 },
    { q: 'What does the "async/await" syntax transform your function into?', options: ['A generator', 'A Promise-returning function', 'A synchronous function', 'A callback-based function'], answer: 1 },
  ],
  'TypeScript': [
    { q: 'Which TypeScript utility type makes all properties optional?', options: ['Required<T>', 'Partial<T>', 'Readonly<T>', 'Pick<T,K>'], answer: 1 },
    { q: 'What does the "unknown" type enforce compared to "any"?', options: ['Nothing different', 'Type checking before use', 'Stricter null checking', 'Immutability'], answer: 1 },
    { q: 'What is a TypeScript interface used for?', options: ['Implementing classes only', 'Defining the shape of an object', 'Creating enums', 'Declaring variables'], answer: 1 },
    { q: 'What is a TypeScript "type guard"?', options: ['A decorator', 'A runtime check that narrows a type', 'A generic constraint', 'A compiler flag'], answer: 1 },
    { q: 'Which keyword declares a constant enum in TypeScript?', options: ['static', 'readonly', 'const', 'fixed'], answer: 2 },
  ],
  'Python': [
    { q: 'What does a list comprehension `[x*2 for x in range(5)]` return?', options: ['[2,4,6,8,10]', '[0,2,4,6,8]', '[1,2,3,4,5]', '[2,4,6,8]'], answer: 1 },
    { q: 'Which keyword is used to define a generator function?', options: ['async', 'yield', 'return', 'iter'], answer: 1 },
    { q: 'What is the difference between a list and a tuple in Python?', options: ['No difference', 'Tuples are immutable', 'Lists are faster', 'Tuples can only hold numbers'], answer: 1 },
    { q: 'What does the `@staticmethod` decorator do?', options: ['Makes a method class-aware', 'Creates a method without access to self or cls', 'Caches method results', 'Makes method private'], answer: 1 },
    { q: 'Which data structure gives O(1) lookup by key?', options: ['List', 'Set', 'Dictionary', 'Tuple'], answer: 2 },
  ],
  'AWS': [
    { q: 'Which AWS service is used for object storage?', options: ['EC2', 'RDS', 'S3', 'Lambda'], answer: 2 },
    { q: 'What does IAM stand for?', options: ['Internet Access Management', 'Identity and Access Management', 'Instance Auto Management', 'Integrated App Module'], answer: 1 },
    { q: 'Which service lets you run code without provisioning servers?', options: ['EC2', 'ECS', 'Lambda', 'Lightsail'], answer: 2 },
    { q: 'What is an AWS VPC?', options: ['A virtual machine', 'A virtual private network within AWS', 'A CDN service', 'A database cluster'], answer: 1 },
    { q: 'Which AWS service is best for a managed relational database?', options: ['DynamoDB', 'Redshift', 'RDS', 'ElastiCache'], answer: 2 },
  ],
  'Docker': [
    { q: 'What does a Dockerfile define?', options: ['Container network config', 'Instructions to build an image', 'Volume mounts', 'Service orchestration'], answer: 1 },
    { q: 'Which command runs a container from an image?', options: ['docker build', 'docker start', 'docker run', 'docker exec'], answer: 2 },
    { q: 'What is the difference between CMD and ENTRYPOINT in a Dockerfile?', options: ['They are identical', 'ENTRYPOINT is always executed; CMD provides defaults', 'CMD is always executed; ENTRYPOINT provides defaults', 'CMD sets env vars'], answer: 1 },
    { q: 'What does `docker-compose up` do?', options: ['Builds images only', 'Starts all services defined in docker-compose.yml', 'Pushes images to registry', 'Stops all containers'], answer: 1 },
    { q: 'What is a Docker volume used for?', options: ['Networking containers', 'Persisting data outside the container lifecycle', 'Exposing ports', 'Caching layers'], answer: 1 },
  ],
  'Git': [
    { q: 'What does `git rebase` do?', options: ['Merges two branches with a merge commit', 'Moves commits to a new base', 'Deletes a branch', 'Resets the working tree'], answer: 1 },
    { q: 'Which command stages all changed files?', options: ['git commit -a', 'git add .', 'git push', 'git stash'], answer: 1 },
    { q: 'What does `git cherry-pick` do?', options: ['Merges a branch', 'Applies a specific commit to the current branch', 'Reverts a commit', 'Shows commit history'], answer: 1 },
    { q: 'What is the purpose of `.gitignore`?', options: ['Stores commit messages', 'Specifies files Git should not track', 'Lists collaborators', 'Configures remotes'], answer: 1 },
    { q: 'What does `git stash pop` do?', options: ['Deletes a stash', 'Applies the most recent stash and removes it from the stash list', 'Creates a new branch', 'Pushes stash to remote'], answer: 1 },
  ],
  'GraphQL': [
    { q: 'What is the main advantage of GraphQL over REST?', options: ['It is faster always', 'Clients request exactly the data they need', 'It uses less bandwidth always', 'It requires no schema'], answer: 1 },
    { q: 'What are GraphQL subscriptions used for?', options: ['One-time queries', 'Real-time data updates', 'Mutations', 'Schema stitching'], answer: 1 },
    { q: 'What is a GraphQL resolver?', options: ['A type definition', 'A function that returns data for a field', 'A query validator', 'A caching layer'], answer: 1 },
    { q: 'What does the GraphQL `!` (exclamation mark) denote in a schema?', options: ['Optional field', 'Non-nullable field', 'Deprecated field', 'Array field'], answer: 1 },
    { q: 'Which keyword is used for data modification operations in GraphQL?', options: ['Query', 'Subscription', 'Mutation', 'Fragment'], answer: 2 },
  ],
  'Machine Learning': [
    { q: 'What is overfitting in a machine learning model?', options: ['Model performs poorly on training data', 'Model performs well on training data but poorly on new data', 'Model is too simple', 'Model has too few parameters'], answer: 1 },
    { q: 'Which algorithm is used for classification and regression with decision boundaries?', options: ['K-Means', 'Linear Regression', 'SVM', 'PCA'], answer: 2 },
    { q: 'What does "gradient descent" minimize?', options: ['Model parameters', 'Loss function', 'Training data size', 'Feature count'], answer: 1 },
    { q: 'What is the purpose of a validation set?', options: ['Training the model', 'Tuning hyperparameters without touching the test set', 'Normalizing features', 'Reducing model size'], answer: 1 },
    { q: 'What does a confusion matrix show?', options: ['Feature importance', 'True/false positives and negatives', 'Model weights', 'Training loss over time'], answer: 1 },
  ],
};

// Skills that exist in interests but don't have a full question bank yet
export const comingSoonSkills = ['Next.js', 'Tailwind CSS', 'DevOps', 'Kubernetes', 'Express'];

export const PROFICIENCY_LEVELS = [
  { label: 'Novice',     min: 0,   max: 20,  color: 'text-blue-400',   barWidth: '10%' },
  { label: 'Emerging',   min: 21,  max: 40,  color: 'text-green-400',  barWidth: '30%' },
  { label: 'Proficient', min: 41,  max: 60,  color: 'text-yellow-400', barWidth: '55%' },
  { label: 'Advanced',   min: 61,  max: 80,  color: 'text-orange-400', barWidth: '75%' },
  { label: 'Expert',     min: 81,  max: 100, color: 'text-ps-orange',  barWidth: '95%' },
];

export const getProficiency = (scoreOutOf400) => {
  const pct = (scoreOutOf400 / 400) * 100;
  return PROFICIENCY_LEVELS.find(l => pct >= l.min && pct <= l.max) || PROFICIENCY_LEVELS[0];
};
