import * as React from 'react';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

/**
 * This is the home component. It displays a button to login as a guest and a button to login as an employee.
 * @returns {JSX.Element} The home component.
 */
function Home() {
    return (
      <div className="App">
        <h2><a href="/Login" className="text"> <Button className='asset-btn-blue'>Login as Guest </Button></a></h2>

        <h2><a href="/Login" className="text"> <Button className='asset-btn-blue'> Login as Employee </Button></a></h2>
        <Link to="/home" className="text"> <Button className='asset-btn-blue'> Return to Home </Button></Link>
      </div>
    );
  }
  
  export default Home;
