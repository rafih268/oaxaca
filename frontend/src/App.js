import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage';
import Kitchen from "./Pages/Kitchen";
import CardVerification from "./Pages/CardVerification";
import CardSuccessful from "./Pages/CardSuccessful";
import Waiter from "./Pages/Waiter"
import Menu from "./Pages/Menu"
import OrderPage from './Pages/OrderPage'
import Navbar from './components/Navbar';
import ManageUsers from './Pages/ManageUsers';
import Login from './Pages/Login'
import Register from './Pages/Register'
import About from './Pages/About';

/**
 * This is the main component of the application. 
 * @returns {JSX.Element} The main component of the application.
 */
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='Payment' element={<CardVerification />}/>
          <Route path='PaymentSuccess' element={<CardSuccessful />} />
          <Route path='Home' element={<HomePage />} />
          <Route path='Menu' element={<Menu />} />
          <Route path='Order' element={<OrderPage />} />
          <Route path='Kitchen' element={<Kitchen />} />
          <Route path='Waiter' element={<Waiter />} />
          <Route path='Login' element={<Login />} />
          <Route path='Register' element={<Register />} />
          <Route path='ManageUsers' element={<ManageUsers />} />
          <Route path='About' element={<About />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
