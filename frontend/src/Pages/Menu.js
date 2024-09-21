import BoxComponent from '../components/BoxComponent'

import '../App.css'

/**
 * This is the menu page component. It displays the menu items using the BoxComponent.
 * @returns {JSX.Element} The menu page component.
 */
function Menu() {
  return (
    <div className='App'>
      <header className='Container'>
        <BoxComponent/>
      </header>
    </div>
  )
}

export default Menu
