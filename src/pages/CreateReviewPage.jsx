import { useNavigate } from 'react-router-dom';
import ReviewForm from '../components/review/ReviewForm.jsx';
import styles from './CreateReviewPage.module.css';

function CreateReviewPage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/home');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <ReviewForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}

export default CreateReviewPage;
