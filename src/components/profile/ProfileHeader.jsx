import Avatar from "../ui/Avatar.jsx";
import Button from "../ui/Button.jsx";
import Icon from "../ui/Icon.jsx";
import { MEDIA_CATEGORIES } from "../../data/mockData.js";
import styles from "./ProfileHeader.module.css";

function ProfileHeader({
  user,
  isOwnProfile = false,
  onEdit,
  mediaCounts = {},
  activeFilters = [],
  onFilterChange = () => {},
  mediaPreferences = null,
}) {
  const visibleCategories =
    mediaPreferences && mediaPreferences.length > 0
      ? MEDIA_CATEGORIES.filter((c) => mediaPreferences.includes(c.id))
      : MEDIA_CATEGORIES;

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <Avatar src={user.avatarUrl} alt={user.name} size="xl" />
        <div className={styles.info}>
          <h1 className={styles.name}>{user.name}</h1>
          <span className={styles.nickname}>{user.nickname}</span>
          <p className={styles.bio}>{user.bio}</p>

          {visibleCategories.length > 0 && (
            <ul className={styles.mediaStats} aria-label="Mídias consumidas">
              {visibleCategories.map(({ id, icon, label, color }) => {
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
          )}
        </div>

        <div className={styles.actions}>
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
