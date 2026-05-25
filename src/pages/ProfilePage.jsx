import { useState } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader.jsx';
import PostCard from '../components/feed/PostCard.jsx';
import { currentUser, userPosts, MEDIA_CATEGORIES } from '../data/mockData.js';
import styles from './ProfilePage.module.css';

const profileTabs = [
  { id: 'posts', label: 'Reviews' },
  { id: 'about', label: 'Sobre' },
  { id: 'collections', label: 'Coleções' }
];

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className={styles.page}>
      <ProfileHeader user={currentUser} />

      <nav className={styles.tabs} aria-label="Seções do perfil">
        {profileTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'posts' && (
        <section className={styles.posts}>
          {userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      )}

      {activeTab === 'about' && (
        <section className={styles.about}>
          <article>
            <h3>Interesses</h3>
            <ul className={styles.interestList}>
              {MEDIA_CATEGORIES.map((item) => (
                <li
                  key={item.id}
                  className={
                    currentUser.interests.includes(item.label) ? styles.interestActive : ''
                  }
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Bio</h3>
            <p>{currentUser.bio}</p>
          </article>
        </section>
      )}

      {activeTab === 'collections' && (
        <section className={styles.emptyState}>
          <h3>Coleções chegam em breve.</h3>
          <p>Você poderá agrupar reviews em temas — tipo “cyberpunk dos anos 80”.</p>
        </section>
      )}
    </div>
  );
}

export default ProfilePage;
