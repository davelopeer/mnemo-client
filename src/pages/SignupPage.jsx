import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import Button from '../components/ui/Button.jsx';
import styles from './LoginPage.module.css';

function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    age: ''
  });
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
      await signUp({
        ...formData,
        age: Number(formData.age),
        phone: formData.phone.trim() || undefined
      });
      navigate('/home', { replace: true });
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
          Crie sua conta para registrar memórias culturais e descobrir novas conexões.
        </p>

        <form className={styles.fields} onSubmit={handleSubmit}>
          <div className={styles.fieldGrid}>
            <label className={styles.field}>
              <span>Nome</span>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                autoComplete="given-name"
                required
              />
            </label>

            <label className={styles.field}>
              <span>Sobrenome</span>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                autoComplete="family-name"
                required
              />
            </label>
          </div>

          <label className={styles.field}>
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ana@example.com"
              autoComplete="email"
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
              minLength={8}
              placeholder="Mínimo de 8 caracteres"
              autoComplete="new-password"
              required
            />
          </label>

          <div className={styles.fieldGrid}>
            <label className={styles.field}>
              <span>Idade</span>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="13"
                required
              />
            </label>

            <label className={styles.field}>
              <span>Celular opcional</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+5511999999999"
                autoComplete="tel"
              />
            </label>
          </div>

          {error ? (
            <p className={styles.errorMessage} role="alert" aria-live="assertive">
              {error}
            </p>
          ) : null}

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Criando conta...' : 'Criar conta'}
          </Button>

          <Button type="button" variant="outline" size="lg" fullWidth onClick={() => navigate('/')}>
            Ja tenho uma conta
          </Button>
        </form>
      </section>

      <section className={styles.showcase} aria-hidden="true">
        <div className={styles.signupPanel}>
          <span className={styles.pillarLabel}>Autenticação real</span>
          <h2>Seu espaço cultural começa com uma sessão segura.</h2>
          <p>
            O cadastro cria a conta no backend, gera um token JWT e inicia a sessão automaticamente.
          </p>
        </div>
      </section>
    </div>
  );
}

export default SignupPage;
