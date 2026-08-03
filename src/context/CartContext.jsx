import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const exist = cart.find((x) => x.id === item.id);

    if (exist) {
      setCart(
        cart.map((x) =>
          x.id === item.id
            ? { ...x, quantity: x.quantity + 1 }
            : x
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;