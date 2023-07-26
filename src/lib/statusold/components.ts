export const components = [
  {
    name: 'username',
    description: 'Your Scratch username',
  },
  {
    name: 'id',
    description: 'Your Scratch user ID',
  },
  {
    name: 'country',
    description: 'Your Scratch country',
  },
  {
    name: 'status',
    description: "Your rank on Scratch, e.g., 'Scratcher'",
  },
  {
    name: 'joke',
    limit: 1,
    description: 'A funny programming joke',
  },
  {
    name: 'open',
    description: "A literal '{'",
  },
  {
    name: 'close',
    description: "A literal '}'",
  },
  // Statistics
  {
    name: 'followers',
    description: 'Amount of followers',
  },
  {
    name: 'posts',
    description: 'Total amount of posts',
  },
  {
    name: 'posts',
    args: ['forum'],
    description: "Amount of posts in 'forum'",
  },
  {
    name: 'rank',
    args: ['forum'],
    description: "What rank you are in 'forum'",
  },
  {
    name: 'rank',
    args: ['category'],
    description: "What rank you are in 'category'",
  },
  {
    name: 'stats',
    args: ['category'],
    description: "Number of 'category'",
  },
  // Math
  {
    name: 'add',
    args: ['number', 'number'],
    description: 'Add two numbers',
  },
  {
    name: 'sub',
    args: ['number', 'number'],
    description: 'Subtract two numbers',
  },
  {
    name: 'mul',
    args: ['number', 'number'],
    description: 'Multiply two numbers',
  },
  {
    name: 'div',
    args: ['number', 'number'],
    description: 'Divide two numbers',
  },
  {
    name: 'pow',
    args: ['number', 'number'],
    description: 'Raise the first number to the power of the second number',
  },
  {
    name: 'root',
    args: ['number', 'number'],
    description: 'Find the Nth root of the first number',
  },
  {
    name: 'random',
    args: ['number', 'number'],
    description: 'Generate a random number between A and B',
  },
  {
    name: 'percent',
    args: ['number', 'number'],
    description: 'Find what percent A is of B',
  },
  {
    name: 'round',
    args: ['number'],
    description: 'Round the number',
  },
  {
    name: 'round',
    args: ['number', 'number'],
    description: 'Round the A to B places',
  },
];
