export const MEDIA_CATEGORIES = [
  { id: "books", label: "Livros", color: "#1C3A13", icon: "book" },
  { id: "movies", label: "Filmes", color: "#7B1E3C", icon: "camera" },
  { id: "series", label: "Séries", color: "#1F487E", icon: "tv" },
  { id: "games", label: "Jogos", color: "#C9A227", icon: "gamepad" },
  { id: "comics", label: "HQs", color: "#C95F1A", icon: "comic" },
];

export const currentUser = {
  id: "u-001",
  name: "Ana Vasconcelos",
  nickname: "@anav",
  avatarUrl: "https://i.pravatar.cc/200?img=41",
  bio: "Lendo clássicos russos e assistindo filmes do Kurosawa.",
  interests: ["Livros", "Filmes", "Séries"],
  stats: { posts: 42, friends: 128, memories: 317 },
};

export const feedPosts = [
  {
    id: "p-101",
    author: {
      name: "Rafael Lins",
      nickname: "@rafa",
      avatarUrl: "https://i.pravatar.cc/200?img=12",
    },
    category: "books",
    title: "Neuromancer",
    subtitle: "William Gibson, 1984",
    rating: 4.5,
    postedAt: "há 2 horas",
  },
  {
    id: "p-102",
    author: {
      name: "Júlia Moraes",
      nickname: "@jumoraes",
      avatarUrl: "https://i.pravatar.cc/200?img=32",
    },
    category: "movies",
    title: "Paris, Texas",
    subtitle: "Wim Wenders, 1984",
    rating: 5.0,
    postedAt: "há 5 horas",
  },
  {
    id: "p-103",
    author: {
      name: "Tomás Pereira",
      nickname: "@tomas",
      avatarUrl: "https://i.pravatar.cc/200?img=15",
    },
    category: "games",
    title: "Disco Elysium",
    subtitle: "ZA/UM, 2019",
    rating: 4.5,
    postedAt: "ontem",
  },
  {
    id: "p-104",
    author: {
      name: "Beatriz Camargo",
      nickname: "@bia",
      avatarUrl: "https://i.pravatar.cc/200?img=5",
    },
    category: "series",
    title: "The Bear",
    subtitle: "FX, 2ª temporada",
    rating: 3.0,
    postedAt: "há 2 dias",
  },
  {
    id: "p-105",
    author: {
      name: "Henrique Sá",
      nickname: "@hsa",
      avatarUrl: "https://i.pravatar.cc/200?img=60",
    },
    category: "comics",
    title: "Sandman — Prelúdios e Noturnos",
    subtitle: "Neil Gaiman, 1989",
    rating: 2.5,
    postedAt: "há 3 dias",
  },
];

export const userPosts = [
  {
    id: "p-001",
    author: currentUser,
    category: "books",
    title: "Pedro Páramo",
    subtitle: "Juan Rulfo, 1955",
    rating: 5.0,
    postedAt: "há 1 semana",
  },
  {
    id: "p-002",
    author: currentUser,
    category: "movies",
    title: "Ran",
    subtitle: "Akira Kurosawa, 1985",
    rating: 5.0,
    postedAt: "há 2 semanas",
  },
  {
    id: "p-003",
    author: currentUser,
    category: "series",
    title: "Better Call Saul",
    subtitle: "AMC, final",
    rating: 4.5,
    postedAt: "há 1 mês",
  },
];

export const friends = [
  {
    id: "f-01",
    name: "Rafael Lins",
    nickname: "@rafa",
    avatarUrl: "https://i.pravatar.cc/200?img=12",
    sharedInterests: ["Livros", "Filmes"],
    mutualCount: 14,
  },
  {
    id: "f-02",
    name: "Júlia Moraes",
    nickname: "@jumoraes",
    avatarUrl: "https://i.pravatar.cc/200?img=32",
    sharedInterests: ["Filmes", "Séries"],
    mutualCount: 9,
  },
  {
    id: "f-03",
    name: "Tomás Pereira",
    nickname: "@tomas",
    avatarUrl: "https://i.pravatar.cc/200?img=15",
    sharedInterests: ["Jogos", "HQs"],
    mutualCount: 22,
  },
  {
    id: "f-04",
    name: "Beatriz Camargo",
    nickname: "@bia",
    avatarUrl: "https://i.pravatar.cc/200?img=5",
    sharedInterests: ["Séries", "Livros"],
    mutualCount: 6,
  },
  {
    id: "f-05",
    name: "Henrique Sá",
    nickname: "@hsa",
    avatarUrl: "https://i.pravatar.cc/200?img=60",
    sharedInterests: ["HQs", "Filmes"],
    mutualCount: 3,
  },
  {
    id: "f-06",
    name: "Lívia Prado",
    nickname: "@livp",
    avatarUrl: "https://i.pravatar.cc/200?img=25",
    sharedInterests: ["Livros"],
    mutualCount: 18,
  },
];
