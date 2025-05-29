import * as React from 'react';

const CartContext = React.createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = React.useState([]);
  
  const addToCart = (donation) => {
    setCart([...cart, donation]);
  };
  
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return React.useContext(CartContext);
}
