import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  if (loading) return <div className="loading">loading</div>;
  if (error) return <div className="error">{error.message}</div>;

  return (
    <div>
      <div>
        {data.allProducts.map((product: any) => (
          <p key={product.id}>{product.name}</p>
        ))}
      </div>
    </div>
  );
}
