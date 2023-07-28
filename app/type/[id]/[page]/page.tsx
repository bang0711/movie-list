import React from "react";

type Props = {
  params: {
    id: string;
    page: number;
  };
};

function page({ params: { id, page } }: Props) {
  return (
    <div>
      {id} + {page}
    </div>
  );
}

export default page;
