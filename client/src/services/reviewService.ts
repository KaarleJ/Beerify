import axios from 'axios';

const url = process.env.NODE_ENV === 'production' ? '/reviews' : 'http://localhost:3000/api/reviews';

interface Review {
  rating: number;
  text: string;
  beerName: string;
}

const getAll = async () => {
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
};

const create = async (newObject: Review) => {
  const response = await axios.post(url, newObject);
  return response.data;
};

const remove = async (id: number) => {
  const response = await axios.delete(`${url}/${id}`);
  return response.data;
};

export default { getAll, create, remove };
