import { useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { IProduct } from '../interfaces';
import { ALL_PRODUCTS_QUERY } from '../queries';
import Product from './Product';


const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  if (loading) return <div className="loading">loading</div>;
  if (error) return <div className="error">{error.message}</div>;

  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((product: IProduct) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}
