import { StatusLang } from './statuslang';
import { categories, forums, jokes } from './consts';

const aviateLang = (user) => ({
  data: {
    userdata: {
      type: 'fetch',
      group: 'scratchdb',
      url: 'https://scratchdb.lefty.one/v3/user/info/' + user,
    },
    forumdata: {
      type: 'fetch',
      group: 'scratchdb',
      url: 'https://scratchdb.lefty.one/v3/forum/user/info/' + user,
    },
    jokes: {
      type: 'data',
      data: jokes,
    },
  },
  argTypes: [
    {
      name: 'category',
      test: (value) => categories.includes(value.toLowerCase()),
      apply: (value) => value.toLowerCase(),
    },
    {
      name: 'forum',
      test: (value) => Object.keys(forums).includes(value.toLowerCase()),
      apply: (value) => forums[value.toLowerCase()],
    },
    {
      name: 'number',
      test: (value) => /^-?\d+(\.\d+)?$/.test(value.trim()),
      apply: (value) => Number(value),
    },
  ],
  components: [
    // General
    {
      name: 'username',
      func: (data) => data.get('userdata', 'username'),
    },
    {
      name: 'id',
      func: (data) => data.get('userdata', 'id'),
    },
    {
      name: 'country',
      func: (data) => data.get('userdata', 'country'),
    },
    {
      name: 'status',
      func: (data) => data.get('userdata', 'status'),
    },
    {
      name: 'joke',
      limit: 1,
      func: (data) =>
        data.get('jokes', Math.floor(Math.random() * jokes.length)),
    },
    {
      name: 'open',
      func: () => '{',
    },
    {
      name: 'close',
      func: () => '}',
    },
    // Statistics
    {
      name: 'followers',
      func: (data) => data.get('userdata', 'statistics.followers'),
    },
    {
      name: 'posts',
      func: (data) => data.get('forumdata', 'counts.total.count'),
    },
    {
      name: 'posts',
      args: ['forum'],
      func: (data, args) => data.get('forumdata', `counts.${args[0]}.count`),
    },
    {
      name: 'rank',
      args: ['forum'],
      func: (data, args) => data.get('forumdata', `counts.${args[0]}.rank`),
    },
    {
      name: 'rank',
      args: ['category'],
      func: (data, args) => data.get('userdata', `statistics.ranks.${args[0]}`),
    },
    {
      name: 'stats',
      args: ['category'],
      func: (data, args) => data.get('userdata', `statistics.${args[0]}`),
    },
    // Math
    {
      name: 'add',
      args: ['number', 'number'],
      func: (_, args) => args[0] + args[1],
    },
    {
      name: 'sub',
      args: ['number', 'number'],
      func: (_, args) => args[0] - args[1],
    },
    {
      name: 'mul',
      args: ['number', 'number'],
      func: (_, args) => args[0] * args[1],
    },
    {
      name: 'div',
      args: ['number', 'number'],
      func: (_, args) => args[0] / args[1],
    },
    {
      name: 'pow',
      args: ['number', 'number'],
      func: (_, args) => Math.pow(args[0], args[1]),
    },
    {
      name: 'root',
      args: ['number', 'number'],
      func: (_, args) => Math.pow(args[0], 1 / args[1]),
    },
    {
      name: 'random',
      args: ['number', 'number'],
      func: (_, args) =>
        Math.floor(Math.random() * (args[1] - args[0] + 1)) + args[0],
    },
    {
      name: 'percent',
      args: ['number', 'number'],
      func: (_, args) => (args[0] / args[1]) * 100,
    },
    {
      name: 'round',
      args: ['number'],
      func: (_, args) => Math.round(args[0]),
    },
    {
      name: 'round',
      args: ['number', 'number'],
      func: (_, args) =>
        Math.round((args[0] + Number.EPSILON) * 10 ** args[1]) / 10 ** args[1],
    },
  ],
});

const lang = new StatusLang(aviateLang);
export default lang;
