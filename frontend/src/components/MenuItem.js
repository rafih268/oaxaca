import React from 'react'
import { Button } from 'react-bootstrap'
import { useState } from 'react'

/** Functional component which takes in parameters corresponding to name, descipption, price, allerngers and image.
 * 
 * @param {*} description of the relevant fields to display to the customer in a menu.
 * @returns the items when used for other catoegies (mains/drinks/starters/desserts).
 */
const MenuItem = ({ id, name, description, price, allergens, image }) => {
  const addToOrder = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/1`, { // default order id value has been set to 1 for now
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          price,
        }),
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ul className='menu_items'>
      <li>{name}</li>
      <p className='menu_desc'>{description}</p>
      <p className='menu_price'>Price: ${price}</p>
      <img src={image} alt={name} />
      <p className='menu_desc'>Allergen(s) :{allergens}</p>
      <Button className='add-btn' onClick={addToOrder}>
        Add to order
      </Button>
    </ul>
  )
}

export default MenuItem
