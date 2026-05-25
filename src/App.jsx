import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import AppLayout from './components/layout/AppLayout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import CreateReviewPage from './pages/CreateReviewPage.jsx';
import FriendsPage from './pages/FriendsPage.jsx';
import StaticPage from './pages/StaticPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/cadastro" element={<SignupPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/criar-review" element={<CreateReviewPage />} />
          <Route path="/amigos" element={<FriendsPage />} />

          <Route
            path="/quem-somos"
            element={
              <StaticPage
                title="Quem somos"
                subtitle="Uma biblioteca moderna que virou rede social."
              >
                <p>
                  Mnemo nasce da crença de que o que lemos, assistimos e jogamos diz muito sobre
                  quem somos. Queremos que cada memória cultural vire ponto de conexão.
                </p>
                <p>
                  Aqui não tem métrica de popularidade, só conversa honesta sobre obras — de
                  clássicos a descobertas recentes.
                </p>
              </StaticPage>
            }
          />
          <Route
            path="/contato"
            element={
              <StaticPage title="Contato" subtitle="Adoramos ouvir leitores, espectadores e jogadores.">
                <p>Email: ola@mnemo.app</p>
                <p>Instagram: @mnemo.app</p>
              </StaticPage>
            }
          />
          <Route
            path="/faq"
            element={
              <StaticPage title="Perguntas frequentes" subtitle="As dúvidas mais comuns.">
                <p>
                  <strong>Posso importar meus livros do Goodreads?</strong> Em breve.
                </p>
                <p>
                  <strong>Mnemo é gratuito?</strong> Sim, nas funcionalidades principais.
                </p>
                <p>
                  <strong>Como descubro amigos?</strong> Pela página de amigos, buscando por
                  nickname ou id.
                </p>
              </StaticPage>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
