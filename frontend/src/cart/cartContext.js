import React from "react";

const CartContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCartItems: () => {},
});

export default CartContext