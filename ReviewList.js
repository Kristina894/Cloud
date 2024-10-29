import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get('http://localhost:3000/reviews');
      setReviews(response.data);
    };
    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <strong>{review.name}</strong> rated it {review.rating}/5
            <p>{review.reviewText}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;
