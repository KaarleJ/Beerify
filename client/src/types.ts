export type Review = {
  id: number;
  rating: number;
  text: string;
  beerName: string;
  author: Author
}

export type Author = {
  id: number;
  username: string;
}