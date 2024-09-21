import React, { useState, useEffect, useContext } from 'react'
import CartContext from '../cart/cartContext'
import MenuItem from './MenuItem';

/* This is a functional component that takes renders out a list of drinks using the component MenuItem.
 */
const CartItems = () => {
    const cartCnxt = useContext(CartContext);
    return (
        <div>
            <h1>Cart Items</h1>
            {cartCnxt.items.map((main) => (
                <MenuItem key={main.id} {...main} />
            ))}
        </div>
    )
}

export default CartItems
