import {
  ArrowLeftFromLine,
  Award,
  BadgeInfo,
  Calendar,
  FileLock2,
  Handshake,
  HomeIcon,
  List,
  Search,
  Star,
  ThumbsUp,
  TrendingUp,
  Users,
} from 'lucide-react';

export const AvatarList = [
  {
    id: 1,
    name: 'Alice',
    image: 'https://i.pinimg.com/564x/99/f3/5a/99f35a4179e659ce63250408e68c8cf6.jpg',
  },
  {
    id: 2,
    name: 'Bob',
    image: 'https://i.pinimg.com/564x/db/8a/97/db8a97c6020e869c86f3a073099dbdf8.jpg',
  },
  {
    id: 3,
    name: 'Charlie',
    image: 'https://i.pinimg.com/564x/a2/8f/1d/a28f1d6e34caa6e0103c3b3eab83d4d3.jpg',
  },
  {
    id: 4,
    name: 'David',
    image: 'https://i.pinimg.com/564x/1b/0a/6b/1b0a6b80404935ca8cbb78e731e65041.jpg',
  },
  {
    id: 5,
    name: 'Eve',
    image: 'https://i.pinimg.com/564x/11/12/98/111298b52d6af98c918ebd23a97a60bf.jpg',
  },
  {
    id: 6,
    name: 'Frank',
    image: 'https://i.pinimg.com/736x/e7/83/47/e783474bcedfd09b96a689fdfda0f6b6.jpg',
  },
  {
    id: 7,
    name: 'Grace',
    image: 'https://i.pinimg.com/736x/b3/d4/8d/b3d48da0f5fd543cacf6b21bebdc4579.jpg',
  },
  {
    id: 8,
    name: 'Henry',
    image: 'https://i.pinimg.com/736x/88/95/1b/88951b14c1692cab712f77a692567182.jpg',
  },
  {
    id: 9,
    name: 'Ian',
    image: 'https://i.pinimg.com/564x/2f/98/17/2f98172f0a31207b3b67b076e2bcc534.jpg',
  },
  {
    id: 10,
    name: 'Jack',
    image: 'https://i.pinimg.com/736x/60/cb/81/60cb8167adc7b1b61ee1eba8a4c98af3.jpg',
  },
  {
    id: 11,
    name: 'Kate',
    image: 'https://i.pinimg.com/564x/9b/b0/66/9bb066864b0d225c324551ee2c83125d.jpg',
  },
];

export const featureGrid = [
  {
    id: 1,
    title: 'Decentralized Identity Management',
    description:
      'Foster dynamic and secure interactions within a decentralized, blockchain-powered community.',
  },
  {
    id: 2,
    title: 'End-to-End Encryption',
    description:
      'Ensure user privacy with encrypted communication and data-sharing protocols throughout the platform.',
  },
  {
    id: 3,
    title: 'Immutable Record Keeping',
    description:
      'Store all interactions and transactions on a tamper-proof blockchain ledger for complete transparency.',
  },
  {
    id: 4,
    title: 'Smart Contract Integration',
    description:
      'Automate and streamline community governance and transactions with self-executing smart contracts.',
  },
  {
    id: 5,
    title: 'Tokenized Reputation System',
    description:
      'Reward positive contributions with tokens, allowing users to build trust and influence within the community.',
  },
  {
    id: 6,
    title: 'Privacy-Focused Data Sharing',
    description:
      'Provide users with full control over their data, enabling secure and permission-based sharing.',
  },
];

export const SideBarList = [
  {
    title: 'Discover',
    children: [
      {
        title: 'Home',
        path: '/',
        icon: HomeIcon,
      },
      {
        title: 'Explore',
        path: '/explore',
        icon: Search,
      },
    ],
  },
  {
    title: 'Community',
    children: [
      {
        title: 'Create Community',
        path: '/create-group',
        icon: Users,
      },
      {
        title: 'Most Popular',
        path: '/all-groups',
        icon: TrendingUp,
      },
      {
        title: 'Joined Communities',
        path: '/',
        icon: Award,
      },
    ],
  },
  {
    title: 'Games',
    children: [
      {
        title: 'New Releases',
        path: '/games',
        icon: Star,
      },
      {
        title: 'Top Rated',
        path: '/top-rated',
        icon: ThumbsUp,
      },
      {
        title: 'Genres',
        path: '/genres',
        icon: List,
      },
      {
        title: 'Upcoming',
        path: '/upcoming',
        icon: Calendar,
      },
    ],
  },

  {
    title: 'Resources',
    children: [
      {
        title: 'Help & Support',
        path: '/',
        icon: BadgeInfo,
      },
      {
        title: 'Terms & Conditions',
        path: '/',
        icon: Handshake,
      },
      {
        title: 'Privacy Policy',
        path: '/',
        icon: FileLock2,
      },
      {
        title: 'About',
        path: '/',
        icon: ArrowLeftFromLine,
      },
    ],
  },
];

export const GameList = [
  {
    gameCover: 'https://images7.alphacoders.com/137/1377511.jpg',
    gameName: 'Eclipse of Eternity',
    gameDescription:
      'A sci-fi adventure game where players explore distant galaxies, uncover ancient secrets, and battle alien civilizations to save the universe.',
    createdAt: new Date('2023-11-15'),
    id: '1',
    gameDisplayImage: 'https://avatarfiles.alphacoders.com/363/thumb-1920-363019.jpg',
    rating: '0',
    likes: '1',
  },
  {
    gameName: "Flip' N Win",
    gameCover:
      'https://www.gammastack.com/wp-content/uploads/2021/08/Types-Of-Lottery-Blog-Post.jpg.webp',
    gameDisplayImage: '/head-coin.svg',
    gameDescription:
      'A fun and addictive puzzle game where players flip and match colorful tiles to win prizes and rewards.',
    createdAt: new Date('2024-08-30'),
    id: '4',
    rating: '0',
    likes: '0',
  },
  {
    gameCover: 'https://images5.alphacoders.com/292/292839.jpg',
    gameDisplayImage: 'https://images8.alphacoders.com/131/1313275.png',
    gameName: 'Mystic Realms: The Awakening',
    gameDescription:
      'An epic fantasy RPG where players embark on a quest to awaken the ancient dragons and restore balance to the mystical realms.',
    createdAt: new Date('2024-02-20'),
    id: '2',
    rating: '0',
    likes: '1',
  },
  {
    gameCover: 'https://images8.alphacoders.com/135/1352905.png',
    gameDisplayImage: 'https://avatarfiles.alphacoders.com/373/373555.png',
    gameName: 'Cyber Knights: Rebellion',
    gameDescription:
      'A cyberpunk action game where players lead a group of rebels against a corrupt megacorporation in a dystopian future city.',
    createdAt: new Date('2024-05-10'),
    id: '3',
    rating: '0',
    likes: '0',
  },

  // {
  //   gameCover: 'https://example.com/cover4.jpg',
  //   gameDisplayImage: 'https://example.com/display4.jpg',
  //   gameName: 'Shadow of the Ancients',
  //   gameDescription:
  //     'A dark fantasy game where players must uncover the secrets of an ancient civilization and prevent the return of a malevolent force.',
  //   createdAt: new Date('2024-08-30'),
  //   id: '4',
  // },
  // {
  //   gameCover: 'https://example.com/cover5.jpg',
  //   gameDisplayImage: 'https://example.com/display5.jpg',
  //   gameName: 'Galactic Frontier: Odyssey',
  //   gameDescription:
  //     'A space exploration game where players captain a starship, build alliances, and explore uncharted territories in a vast galaxy.',
  //   createdAt: new Date('2024-12-05'),
  //   id: '5',
  // },
  // {
  //   gameCover: 'https://example.com/cover6.jpg',
  //   gameDisplayImage: 'https://example.com/display6.jpg',
  //   gameName: 'Legends of Avalon',
  //   gameDescription:
  //     'A medieval fantasy game where players become knights of the Round Table, embark on quests, and defend the kingdom of Avalon.',
  //   createdAt: new Date('2025-03-15'),
  //   id: '6',
  // },
  // {
  //   gameCover: 'https://example.com/cover7.jpg',
  //   gameDisplayImage: 'https://example.com/display7.jpg',
  //   gameName: 'Neon City Chronicles',
  //   gameDescription:
  //     'An open-world action game set in a neon-lit metropolis, where players navigate the criminal underworld and fight for control of the city.',
  //   createdAt: new Date('2025-06-25'),
  //   id: '7',
  // },
  // {
  //   gameCover: 'https://example.com/cover8.jpg',
  //   gameDisplayImage: 'https://example.com/display8.jpg',
  //   gameName: 'Realm of the Lost Gods',
  //   gameDescription:
  //     'An action-adventure game where players explore ancient ruins, solve puzzles, and battle mythical creatures to uncover the secrets of the lost gods.',
  //   createdAt: new Date('2025-09-10'),
  //   id: '8',
  // },
  // {
  //   gameCover: 'https://example.com/cover9.jpg',
  //   gameDisplayImage: 'https://example.com/display9.jpg',
  //   gameName: 'Quantum Rift',
  //   gameDescription:
  //     'A sci-fi thriller where players manipulate time and space to solve mysteries and prevent a catastrophic event that threatens reality itself.',
  //   createdAt: new Date('2025-12-20'),
  //   id: '9',
  // },
  // {
  //   gameCover: 'https://example.com/cover10.jpg',
  //   gameDisplayImage: 'https://example.com/display10.jpg',
  //   gameName: 'Vanguard: Rise of the Heroes',
  //   gameDescription:
  //     'A superhero action game where players assemble a team of heroes, thwart villainous plots, and save the world from impending doom.',
  //   createdAt: new Date('2026-03-05'),
  //   id: '10',
  // },
];
