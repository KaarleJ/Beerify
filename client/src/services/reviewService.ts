import axios from 'axios';
import { RawReview, Review, UpdReview } from '../types';

const url =
  process.env.NODE_ENV === 'production'
    ? '/api/reviews'
    : 'http://localhost:3000/api/reviews';

export const getReviews = async () => {
  const response = await axios.get(url);
  return response.data;
};

export const getSpecific = async (id: number) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
};

export const createReview = async (review: RawReview) => {
  const response = await axios.post<RawReview>(url, review, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const updateReview = async (review: UpdReview) => {
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
