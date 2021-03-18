import React from 'react';
import styled from 'styled-components';
import { CartItem as CartItemType, User } from '../generated/graphql';
import { calcTotalPrice } from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import { formatMoney } from '../lib/formatMoney';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import { useUser } from './User';

interface ICartItemProps {
  cartItem: CartItemType;
}

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--light-grey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }: ICartItemProps) {
  const { product } = cartItem;
  return (
    <CartItemStyles>
      <img
        width="100"
        src={product?.photo?.image?.publicUrlTransformed as string}
        alt={product?.name as string}
      />
      <div>
        <h3>{product?.name}</h3>
        <p>
          {formatMoney(product?.price! * cartItem?.quantity!)} -{' '}
          <em>
            {cartItem?.quantity} &times; {formatMoney(product?.price!)} each
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const me: User = useUser();
  const { toggleCart, closeCart, cartOpen } = useCart();

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me?.name}'s Cart</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {me?.cart.map((cartItem) => (
          <CartItem key={cartItem?.id} cartItem={cartItem}></CartItem>
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me?.cart))}</p>
      </footer>
    </CartStyles>
  );
}
