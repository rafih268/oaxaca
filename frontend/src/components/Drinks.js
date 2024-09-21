/**
 * This is a functional component that takes renders out a list of drinks using the component MenuItem.
 * @module Drinks
 */
import React, { useState, useEffect } from 'react'
import MenuItem from './MenuItem'

/**
 * This function renders the list of drinks.
 * @returns {JSX.Element} - The list of drinks.
 */
const Drinks = () => {
  const [drinks, setDrinks] = useState([])

  useEffect(() => {
    getDrinkItems()
  })

  const getDrinkItems = async () => {
    const response = await fetch('http://localhost:5000/api/menus/drinks', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    setDrinks(data)
  }

  return (
    <>
      <h1>Drinks</h1>
      <div className='drinks-menu'>
        {drinks.map((drink) => (
          <MenuItem key={drink.id} {...drink} />
        ))}
      </div>
    </>
  )
}

export default Drinks
