export const MEDIA_CATEGORIES = [
  { id: 'books', label: 'Livros' },
  { id: 'movies', label: 'Filmes' },
  { id: 'series', label: 'Séries' },
  { id: 'games', label: 'Jogos' },
  { id: 'comics', label: 'HQs' }
];

export const RECOMMENDATION_TYPES = [
  { id: 'recommend', label: 'Recomendo', tone: 'positive' },
  { id: 'neutral', label: 'Indiferente', tone: 'neutral' },
  { id: 'not_recommend', label: 'Não recomendo', tone: 'negative' }
];

export const currentUser = {
  id: 'u-001',
  name: 'Ana Vasconcelos',
  nickname: '@anav',
  avatarUrl: 'https://i.pravatar.cc/200?img=41',
  bio: 'Lendo clássicos russos e assistindo filmes do Kurosawa.',
  interests: ['Livros', 'Filmes', 'Séries'],
  stats: { posts: 42, friends: 128, memories: 317 }
};

export const feedPosts = [
  {
    id: 'p-101',
    author: {
      name: 'Rafael Lins',
      nickname: '@rafa',
      avatarUrl: 'https://i.pravatar.cc/200?img=12'
    },
    category: 'books',
    title: 'Neuromancer',
    subtitle: 'William Gibson, 1984',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600',
    recommendation: 'recommend',
    postedAt: 'há 2 horas',
    body:
      'Uma prosa cortante que inventou o ciberespaço antes da internet existir. Gibson desenha a Chiba City como se fosse um sonho febril — dá para sentir o neon queimando nos olhos. Um daqueles livros que você termina e precisa ficar calado por uma hora.'
  },
  {
    id: 'p-102',
    author: {
      name: 'Júlia Moraes',
      nickname: '@jumoraes',
      avatarUrl: 'https://i.pravatar.cc/200?img=32'
    },
    category: 'movies',
    title: 'Paris, Texas',
    subtitle: 'Wim Wenders, 1984',
    coverUrl: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=600',
    recommendation: 'recommend',
    postedAt: 'há 5 horas',
    body:
      'Nunca chorei tanto com silêncios. Harry Dean Stanton caminhando naquele deserto vermelho é cinema na sua forma mais essencial: imagem, tempo, saudade.'
  },
  {
    id: 'p-103',
    author: {
      name: 'Tomás Pereira',
      nickname: '@tomas',
      avatarUrl: 'https://i.pravatar.cc/200?img=15'
    },
    category: 'games',
    title: 'Disco Elysium',
    subtitle: 'ZA/UM, 2019',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600',
    recommendation: 'recommend',
    postedAt: 'ontem',
    body:
      'Um RPG que não tem combate, só conversas — inclusive com as vozes da sua própria cabeça. É literatura disfarçada de jogo.'
  },
  {
    id: 'p-104',
    author: {
      name: 'Beatriz Camargo',
      nickname: '@bia',
      avatarUrl: 'https://i.pravatar.cc/200?img=5'
    },
    category: 'series',
    title: 'The Bear',
    subtitle: 'FX, 2ª temporada',
    coverUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
    recommendation: 'neutral',
    postedAt: 'há 2 dias',
    body:
      'A segunda temporada tem episódios geniais (Forks!) mas se perde em subtramas. Continuo assistindo pela Ayo Edebiri, que rouba cada cena.'
  },
  {
    id: 'p-105',
    author: {
      name: 'Henrique Sá',
      nickname: '@hsa',
      avatarUrl: 'https://i.pravatar.cc/200?img=60'
    },
    category: 'comics',
    title: 'Sandman — Prelúdios e Noturnos',
    subtitle: 'Neil Gaiman, 1989',
    coverUrl: 'https://images.unsplash.com/photo-1569931727741-f5baeff0014a?w=600',
    recommendation: 'not_recommend',
    postedAt: 'há 3 dias',
    body:
      'Reli depois de 15 anos e senti o peso do tempo. A arte do Sam Kieth envelheceu mal para mim. Talvez só eu não seja mais o leitor certo.'
  }
];

export const userPosts = [
  {
    id: 'p-001',
    author: currentUser,
    category: 'books',
    title: 'Pedro Páramo',
    subtitle: 'Juan Rulfo, 1955',
    coverUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600',
    recommendation: 'recommend',
    postedAt: 'há 1 semana',
    body:
      'Um romance curto e assombrado. Rulfo te leva a Comala pela mão e, quando você percebe, está conversando com mortos sem saber quem é vivo.'
  },
  {
    id: 'p-002',
    author: currentUser,
    category: 'movies',
    title: 'Ran',
    subtitle: 'Akira Kurosawa, 1985',
    coverUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600',
    recommendation: 'recommend',
    postedAt: 'há 2 semanas',
    body: 'Rei Lear virou épico samurai. A cena da queda do castelo, sem trilha, é cinema puro.'
  },
  {
    id: 'p-003',
    author: currentUser,
    category: 'series',
    title: 'Better Call Saul',
    subtitle: 'AMC, final',
    coverUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600',
    recommendation: 'recommend',
    postedAt: 'há 1 mês',
    body: 'Mais contido que Breaking Bad, mais triste. A lenta corrosão de um homem bom.'
  }
];

export const friends = [
  {
    id: 'f-01',
    name: 'Rafael Lins',
    nickname: '@rafa',
    avatarUrl: 'https://i.pravatar.cc/200?img=12',
    sharedInterests: ['Livros', 'Filmes'],
    mutualCount: 14
  },
  {
    id: 'f-02',
    name: 'Júlia Moraes',
    nickname: '@jumoraes',
    avatarUrl: 'https://i.pravatar.cc/200?img=32',
    sharedInterests: ['Filmes', 'Séries'],
    mutualCount: 9
  },
  {
    id: 'f-03',
    name: 'Tomás Pereira',
    nickname: '@tomas',
    avatarUrl: 'https://i.pravatar.cc/200?img=15',
    sharedInterests: ['Jogos', 'HQs'],
    mutualCount: 22
  },
  {
    id: 'f-04',
    name: 'Beatriz Camargo',
    nickname: '@bia',
    avatarUrl: 'https://i.pravatar.cc/200?img=5',
    sharedInterests: ['Séries', 'Livros'],
    mutualCount: 6
  },
  {
    id: 'f-05',
    name: 'Henrique Sá',
    nickname: '@hsa',
    avatarUrl: 'https://i.pravatar.cc/200?img=60',
    sharedInterests: ['HQs', 'Filmes'],
    mutualCount: 3
  },
  {
    id: 'f-06',
    name: 'Lívia Prado',
    nickname: '@livp',
    avatarUrl: 'https://i.pravatar.cc/200?img=25',
    sharedInterests: ['Livros'],
    mutualCount: 18
  }
];
