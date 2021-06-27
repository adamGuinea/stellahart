import { createContext, ReactNode, useContext, useState } from 'react';

type IProps = {
  children: ReactNode
}
const LocalStateContext = createContext({
  openCart: () => {},
  closeCart: () => {},
  toggleCart: () => {},
});
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }: IProps) {
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function openCart() {
    return setCartOpen(true);
  }

  function closeCart() {
    return setCartOpen(false);
  }

  return (
    <LocalStateProvider value={{ toggleCart, openCart, closeCart, cartOpen }}>
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}
export { CartStateProvider, useCart };
