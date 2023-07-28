import React from "react";

type Props = {
  params: {
    id: number;
  };
};

function MoviePage({ params: { id } }: Props) {
  return <div>{id}</div>;
}

export default MoviePage;
