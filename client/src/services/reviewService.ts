import axios from 'axios';
import { RawReview, Review } from '../types';

const url =
  process.env.NODE_ENV === 'production'
    ? '/api/reviews'
    : 'http://localhost:3000/api/reviews';

export const getReviews = async (authorId: string | null) => {
  const id = authorId ? Number(authorId) : undefined;
  const response = await axios.get<Review[]>(url, { params: { authorId: id } });
  return response.data;
};

export const getOneReview = async (id: number | undefined) => {
  if (!id) throw new Error('ID of review is required');
  const response = await axios.get<Review>(`${url}/${id}`);
  return response.data;
};

export const createReview = async (review: RawReview) => {
  const response = await axios.post<Review>(url, review, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const updateReview = async (id: number, review: RawReview) => {
  const response = await axios.put<Review>(`${url}/${id}`, review, {
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
