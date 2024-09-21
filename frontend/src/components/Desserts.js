/**
 * This is a functional component that takes renders out a list of drinks using the component MenuItem.
 * @module Desserts
 */
import React, { useState, useEffect } from 'react'
import MenuItem from './MenuItem'

/**
 * This function renders the list of desserts.
 * @returns {JSX.Element} - The list of desserts.
 */
const Desserts = () => {
  const [desserts, setDesserts] = useState([])

  useEffect(() => {
    getDessertItems()
  })

  const getDessertItems = async () => {
    const response = await fetch('http://localhost:5000/api/menus/desserts', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    setDesserts(data)
  }

  return (
    <>
      <h1>Desserts</h1>
      <div className='desserts-menu'>
        {desserts.map((dessert) => (
          <MenuItem key={dessert.id} {...dessert} />
        ))}
      </div>
    </>
  )
}

export default Desserts
