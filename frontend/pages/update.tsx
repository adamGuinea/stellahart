import React from 'react';
import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ query }: any) {
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
