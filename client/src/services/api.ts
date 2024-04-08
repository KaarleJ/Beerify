

export const getCount = async () => {
  const url = process.env.NODE_ENV === 'production' ? '/count' : 'http://localhost:3000/count';
  const response = await fetch(url);
  const data = await response.json();
  return data;
};