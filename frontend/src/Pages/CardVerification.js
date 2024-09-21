import VerificationCard from '../components/VerificationCard'

import '../App.css'

/**
 * This displays the payment page using the verification card component.
 * @returns {JSX.Element} - The payment page.
 */
function Menu() {
  return (
    <div className='App'>
      <header className='App-header'>
        <VerificationCard />
      </header>
    </div>
  )
}

export default Menu