export type Review = {
  id: number;
  rating: number;
  text: string;
  beerName: string;
  author: User;
};

export type User = {
  id: number;
  username: string;
};
