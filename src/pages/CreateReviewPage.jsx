import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as profileApi from "../api/profile.js";
import * as reviewsApi from "../api/reviews.js";
import { useAuth } from "../auth/AuthContext.jsx";
import ReviewForm from "../components/review/ReviewForm.jsx";
import { MEDIA_CATEGORIES } from "../data/mockData.js";
import styles from "./CreateReviewPage.module.css";

function CreateReviewPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mediaPreferences, setMediaPreferences] = useState(null);
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPreferences() {
      try {
        const profile = await profileApi.getMyProfile(token);
        if (isMounted) {
          setMediaPreferences(
            Array.isArray(profile.mediaPreferences)
              ? profile.mediaPreferences
              : [],
          );
        }
      } catch {
        if (isMounted) {
          setMediaPreferences([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingPreferences(false);
        }
      }
    }

    loadPreferences();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const categories = useMemo(() => {
    if (!Array.isArray(mediaPreferences) || mediaPreferences.length === 0) {
      return MEDIA_CATEGORIES;
    }
    return MEDIA_CATEGORIES.filter((item) =>
      mediaPreferences.includes(item.id),
    );
  }, [mediaPreferences]);

  const handleSubmit = async (payload) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await reviewsApi.createReview(token, payload);
      navigate("/profile");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isLoadingPreferences) {
    return (
      <div className={styles.page}>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <ReviewForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        categories={categories}
      />
    </div>
  );
}

export default CreateReviewPage;
