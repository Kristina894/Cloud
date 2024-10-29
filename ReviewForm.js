import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ReviewForm({ onReviewAdded }) {
  const [name, setName] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/reviews', {
        name,
        restaurantName,
        rating,
        reviewText,
      });
      onReviewAdded(response.data);
      setName('');
      setRestaurantName('');
      setRating(5);
      setReviewText('');
      // Redirect to a different page if desired
      navigate('/graph'); // Replace '/graph' with the actual path to the graph page
    } catch (error) {
      console.error("There was an error submitting the review!", error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f7f7f7',
    }}>
      <form onSubmit={handleSubmit} style={{
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '300px',
      }}>
        <h2>Submit Your Review</h2>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Restaurant Name:</label>
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Rating:</label>
          <input
            type="number"
            value={rating}
            min="1"
            max="5"
            onChange={(e) => setRating(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Comments:</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', resize: 'none' }}
          ></textarea>
        </div>
        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '10px'
        }}>Submit Review</button>
        <button type="button" onClick={() => navigate('/graph')} style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>View Graph</button>
      </form>
    </div>
  );
}

export default ReviewForm;
