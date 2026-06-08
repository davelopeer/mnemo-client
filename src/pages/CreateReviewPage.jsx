import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as reviewsApi from '../api/reviews.js';
import { useAuth } from '../auth/AuthContext.jsx';
import ReviewForm from '../components/review/ReviewForm.jsx';
import styles from './CreateReviewPage.module.css';

function CreateReviewPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (payload) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await reviewsApi.createReview(token, payload);
      navigate('/profile');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <ReviewForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default CreateReviewPage;
