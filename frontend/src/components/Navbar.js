/**
 * This component renders the navigation bar.
 * @module Navbar
 */
import { Link, useResolvedPath, useMatch } from 'react-router-dom'

/**
 * This function renders the navigation bar.
 * @returns {JSX.Element} - The navigation bar.
 */
function Navbar() {
  return (
    <nav className='nav'>
      <Link to='/Home' className='site-title'>
        Oaxaca
      </Link>
      <ul>
        <ActiveLink to='/Menu'>Menu</ActiveLink>
        <ActiveLink to='/Order'>Ordered Items</ActiveLink>
        <ActiveLink to='/About'>About</ActiveLink>
        <ActiveLink to='/Register'>Sign up</ActiveLink>
        <ActiveLink to='/Login'>Login</ActiveLink>
      </ul>
    </nav>
  )
}

// Changes background-color of the link which is currently active
function ActiveLink({ to, children, ...props }) {
  const path = useResolvedPath(to)
  const isActive = useMatch({ path: path.pathname, end: true })

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default Navbar
