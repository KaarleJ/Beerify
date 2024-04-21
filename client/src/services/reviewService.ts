import axios from 'axios';
import { Review } from '../types';

const url =
  process.env.NODE_ENV === 'production'
    ? '/api/reviews'
    : 'http://localhost:3000/api/reviews';

export const getReviews = async () => {
  const response = await axios.get(url);
  return response.data;
};

export const createReview = async (review: Review) => {
  const response = await axios.post<Review>(url, review, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const updateReview = async (review: Review) => {
  const response = await axios.put<Review>(`${url}/${review.id}`, review, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const removeReview = async (id: number) => {
  const response = await axios.delete<Review>(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};
