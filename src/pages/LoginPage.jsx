import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import Button from '../components/ui/Button.jsx';
import styles from './LoginPage.module.css';

const showcaseImages = [
  'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600',
  'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600',
  'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=600',
  'https://images.unsplash.com/photo-1556438064-2d7646166914?w=600'
];

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await signIn(formData);
      navigate(location.state?.from?.pathname ?? '/home', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.form}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>M</span>
          <h1 className={styles.brandName}>Mnemo</h1>
        </div>

        <p className={styles.tagline}>
          Sua biblioteca cultural. Memória, descoberta e conexão em um só lugar.
        </p>

        <form className={styles.fields} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ana@example.com"
              autoComplete="username"
              required
            />
          </label>

          <label className={styles.field}>
            <span>Senha</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? (
            <p className={styles.errorMessage} role="alert" aria-live="assertive">
              {error}
            </p>
          ) : null}

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>

          <div className={styles.divider}>
            <span>ou</span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => navigate('/cadastro')}
          >
            Criar conta nova
          </Button>
        </form>

        <footer className={styles.footnote}>
          Ao entrar você concorda com nossos termos e política de privacidade.
        </footer>
      </section>

      <section className={styles.showcase} aria-hidden="true">
        <div className={styles.mosaic}>
          {showcaseImages.map((url, index) => (
            <div key={url} className={styles.tile} style={{ animationDelay: `${index * 120}ms` }}>
              <img src={url} alt="" />
            </div>
          ))}
        </div>
        <div className={styles.pillars}>
          <div>
            <span className={styles.pillarLabel}>Memória</span>
            <p>Registre cada livro, filme, jogo ou HQ que marcou você.</p>
          </div>
          <div>
            <span className={styles.pillarLabel}>Descoberta</span>
            <p>Explore o que pessoas com gosto parecido estão consumindo.</p>
          </div>
          <div>
            <span className={styles.pillarLabel}>Conexão</span>
            <p>Converse sobre obras, autores e temas que te movem.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
