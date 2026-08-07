import Avatar from "../ui/Avatar.jsx";
import Button from "../ui/Button.jsx";
import Icon from "../ui/Icon.jsx";
import styles from "./ProfileHeader.module.css";

const MEDIA_STATS_CONFIG = [
  { id: "books", label: "Livros", icon: "book", color: "#3E5641" },
  { id: "movies", label: "Filmes", icon: "camera", color: "#7B1113" },
  { id: "series", label: "Séries", icon: "tv", color: "#1F487E" },
  { id: "games", label: "Jogos", icon: "gamepad", color: "#c9a227" },
  { id: "comics", label: "HQs", icon: "comic", color: "#A5907E" },
];

function ProfileHeader({
  user,
  isOwnProfile = false,
  onEdit,
  mediaCounts = {},
  activeFilters = [],
  onFilterChange = () => {},
}) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <Avatar src={user.avatarUrl} alt={user.name} size="xl" ring />
        <div className={styles.info}>
          <h1 className={styles.name}>{user.name}</h1>
          <span className={styles.nickname}>{user.nickname}</span>
          <p className={styles.bio}>{user.bio}</p>

          <ul className={styles.mediaStats} aria-label="Mídias consumidas">
            {MEDIA_STATS_CONFIG.map(({ id, label, icon, color }) => {
              const isActive = activeFilters.includes(id);
              return (
                <li key={id} className={styles.mediaStat}>
                  <button
                    type="button"
                    className={`${styles.mediaStatButton} ${isActive ? styles.mediaStatActive : ""}`}
                    onClick={() => onFilterChange(id)}
                    aria-pressed={isActive}
                    title={`Filtrar por ${label}`}
                  >
                    <span className={styles.mediaIcon} style={{ color }}>
                      <Icon name={icon} size={24} strokeWidth={1.6} />
                    </span>
                    <span className={styles.mediaCount}>
                      {mediaCounts[id] ?? 0}
                    </span>
                    <span className={styles.mediaLabel}>{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.actions}>
          {!isOwnProfile ? (
            <Button variant="outline" iconLeft={<Icon name="mail" size={16} />}>
              Mensagem
            </Button>
          ) : null}
          {isOwnProfile ? (
            <Button
              type="button"
              variant="primary"
              iconLeft={<Icon name="sparkle" size={16} />}
              onClick={onEdit}
            >
              Editar perfil
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;
