/**
 * This is a functional component that takes renders out a list of drinks using the component MenuItem.
 * @module Starters
 */
import React, { useState, useEffect } from 'react'
import MenuItem from './MenuItem'

/**
 * This function renders the list of starters using template component MenuItem.
 * @returns {JSX.Element} - The list of starters.
 */
const Starters = () => {
  const [starters, setStarters] = useState([])

  useEffect(() => {
    getStarterItems()
  })

  const getStarterItems = async () => {
    const response = await fetch('http://localhost:5000/api/menus/starters', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    setStarters(data)
    return response
  }

  return (
    <div>
      <h1>Starters</h1>
      {starters.map((starter) => (
        <MenuItem key={starter.id} {...starter} />
      ))}
    </div>
  )
}

export default Starters
