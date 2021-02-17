import { NextApiRequest } from 'next';
import React from 'react';
import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ query }: NextApiRequest) {
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
