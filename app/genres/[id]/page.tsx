import React from "react";

type Props = {
  params: {
    id: string;
  };
};

function GenrePage({ params: { id } }: Props) {
  return <div>{id}</div>;
}

export default GenrePage;
