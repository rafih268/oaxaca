import '../App.css';

/**
 * This is the about page. It is a simple page that displays information about the restaurant.
 * @returns {JSX.Element} The about page.
 */
function About() {
  return (
    <div className='About'>
      <header className='About-header'>
        <h1>About</h1>
      </header>
      <p>
        We are Oaxaca, a restaurant committed to delivering good food and service. Feel free to browse our wide variety of dishes and drinks. We hope you enjoy your experience with us.
      </p>
    </div>
  )
}

export default About;