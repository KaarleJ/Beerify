
export const getCount = async () => {
  const response = await fetch('http://localhost:3000/count');
  const data = await response.json();
  return data;
};