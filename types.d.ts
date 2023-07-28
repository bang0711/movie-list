interface Movie {
  backdrop_path: string;
  id: number;
  adult: boolean;
  popularity?: number;
  title: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}
