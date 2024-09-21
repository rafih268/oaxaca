/**
 * This is a functional component that takes renders out a list of mains using the component MenuItem.
 * @module Mains
 */
import React, { useState, useEffect } from 'react'
import MenuItem from './MenuItem'

/**
 * This function renders the list of mains.
 * @returns {JSX.Element} - The list of mains.
 */
const Mains = () => {
  const [mains, setMains] = useState([])

  useEffect(() => {
    getMainItems()
  })

  const getMainItems = async () => {
    const response = await fetch('http://localhost:5000/api/menus/mains', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    setMains(data)
  }

  return (
    <div>
      <h1>Mains</h1>
      {mains.map((main) => (
        <MenuItem key={main.id} {...main} />
      ))}
    </div>
  )
}

export default Mains
