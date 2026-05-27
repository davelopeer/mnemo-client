import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resolveApiAssetUrl } from '../api/client.js';
import * as profileApi from '../api/profile.js';
import { useAuth } from '../auth/AuthContext.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import Button from '../components/ui/Button.jsx';
import { currentUser } from '../data/mockData.js';
import styles from './EditProfilePage.module.css';

const usernamePattern = /^[a-zA-Z0-9_-]+$/;

function validateUsername(username) {
  if (!username) {
    return '';
  }
  if (username.startsWith('@')) {
    return 'Informe o username sem @.';
  }
  if (username.length < 3 || username.length > 30) {
    return 'O username deve ter entre 3 e 30 caracteres.';
  }
  if (!usernamePattern.test(username)) {
    return 'Use apenas letras, números, hífen e underline.';
  }
  return '';
}

function EditProfilePage() {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [status, setStatus] = useState('loading');
  const [formError, setFormError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [avatarMessage, setAvatarMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const data = await profileApi.getMyProfile(token);
        if (isMounted) {
          setProfile(data);
          setUsername(data.username ?? '');
          setDescription(data.description ?? '');
          setStatus('success');
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error');
          setFormError(error.message);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [token]);

  useEffect(() => {
    if (!avatarFile) {
      setPreviewUrl('');
      return undefined;
    }

    const objectUrl = URL.createObjectURL(avatarFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [avatarFile]);

  const displayName = profile?.displayName ?? (user ? `${user.firstName} ${user.lastName}` : currentUser.name);
  const avatarUrl = useMemo(
    () => previewUrl || resolveApiAssetUrl(profile?.profileImageUrl),
    [previewUrl, profile?.profileImageUrl]
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError('');
    setUsernameError('');
    setSuccessMessage('');
    setAvatarMessage('');

    const normalizedUsername = username.trim().toLowerCase();
    const usernameError = validateUsername(normalizedUsername);
    if (usernameError) {
      setUsernameError(usernameError);
      return;
    }

    try {
      const updatedProfile = await profileApi.updateMyProfile(token, {
        username: normalizedUsername || null,
        description: description.trim() || null
      });
      let nextProfile = updatedProfile;

      if (avatarFile) {
        nextProfile = await profileApi.uploadMyAvatar(token, avatarFile);
        setAvatarFile(null);
      }

      setProfile(nextProfile);
      navigate('/profile');
    } catch (error) {
      if (error.message.toLowerCase().includes('username')) {
        setUsernameError(error.message);
      } else {
        setFormError(error.message);
      }
    }
  }

  async function handleRemoveAvatar() {
    setFormError('');
    setAvatarMessage('');

    if (avatarFile) {
      setAvatarFile(null);
      return;
    }

    try {
      const updatedProfile = await profileApi.removeMyAvatar(token);
      setProfile(updatedProfile);
      setAvatarFile(null);
      setAvatarMessage('Foto removida com sucesso.');
    } catch (error) {
      setFormError(error.message);
    }
  }

  if (status === 'loading') {
    return (
      <section className={styles.panel} aria-live="polite">
        <h1>Carregando perfil...</h1>
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section className={styles.panel} aria-live="assertive">
        <h1>Não foi possível carregar seu perfil</h1>
        <p>{formError}</p>
      </section>
    );
  }

  return (
    <form className={styles.panel} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Perfil</span>
          <h1>Editar perfil</h1>
          <p>Escolha como as outras pessoas vão encontrar você no Mnemo.</p>
        </div>
        <div className={styles.headerActions}>
          {profile?.username ? (
            <Button type="button" variant="outline" onClick={() => navigate(`/user/${profile.username}`)}>
              Ver perfil público
            </Button>
          ) : null}
          <Button type="button" variant="outline" onClick={() => navigate('/profile')}>
            Voltar
          </Button>
        </div>
      </div>

      <section className={styles.avatarSection}>
        <Avatar src={avatarUrl} alt={displayName} size="xl" ring />
        <div className={styles.field}>
          <label htmlFor="avatar">Foto de perfil</label>
          <input
            id="avatar"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => setAvatarFile(event.target.files?.[0] ?? null)}
          />
          <span className={styles.helpText}>JPEG, PNG ou WEBP com até 5 MB.</span>
          {profile?.profileImageUrl || avatarFile ? (
            <Button type="button" variant="ghost" size="sm" onClick={handleRemoveAvatar}>
              Remover foto
            </Button>
          ) : null}
          {avatarMessage ? <p className={styles.successMessage}>{avatarMessage}</p> : null}
        </div>
      </section>

      <label className={styles.field} htmlFor="username">
        <span>Username</span>
        <div className={`${styles.usernameInput} ${usernameError ? styles.inputError : ''}`}>
          <span aria-hidden="true">@</span>
          <input
            id="username"
            value={username}
            maxLength={30}
            placeholder="ana_vieira"
            onChange={(event) => {
              setUsername(event.target.value);
              setUsernameError('');
            }}
            aria-describedby={usernameError ? 'username-help username-error' : 'username-help'}
            aria-invalid={Boolean(usernameError)}
          />
        </div>
        <span id="username-help" className={styles.helpText}>
          Use 3 a 30 caracteres: letras, números, hífen e underline.
        </span>
        {usernameError ? (
          <span id="username-error" className={styles.fieldError} role="alert">
            {usernameError}
          </span>
        ) : null}
      </label>

      <label className={styles.field} htmlFor="description">
        <span>Descrição</span>
        <textarea
          id="description"
          value={description}
          maxLength={128}
          rows={5}
          placeholder="Conte um pouco sobre seus gostos culturais."
          onChange={(event) => setDescription(event.target.value)}
        />
        <span className={styles.helpText}>{description.length}/128 caracteres</span>
      </label>

      <div className={styles.feedback} aria-live="polite">
        {formError ? <p className={styles.errorMessage}>{formError}</p> : null}
        {successMessage ? <p className={styles.successMessage}>{successMessage}</p> : null}
      </div>

      <div className={styles.actions}>
        <Button type="submit" variant="primary">
          Salvar alterações
        </Button>
      </div>
    </form>
  );
}

export default EditProfilePage;
