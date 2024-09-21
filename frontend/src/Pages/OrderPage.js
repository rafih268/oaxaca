import '../App.css'
import { useState, useEffect } from 'react'
import OrderList from '../components/OrderList'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

/**
 * This is the order page component. It displays the ordered items and the total cost of the order.
 * @returns {JSX.Element} The order page component.
 */
const OrderPage = () => {
  const [order, setOrder] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderedItems()
  }, [])

  /**
   * This function handles the submit event of the form. 
   * It stores the total cost of the order in the session storage and navigates to the payment page.
   * @param {Event} event The event that triggered the function.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    try{
      sessionStorage.setItem("totalCost", calculateCost());
      navigate("/payment");
    } catch(error){
      console.log(error)
    }
  }

  /**
   * This function fetches the ordered items from the database. 
   * It sets the state of the order to the fetched data.
   */
  const fetchOrderedItems = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/1`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()
      setOrder(data)
    } catch (error) {
      console.log(error)
      swal({
            title: "Error",
            text: "The following action failed " + error,
            icon: "warning",
            dangerMode: true,
          })
    }
  }

  /**
   * This function deletes an ordered item from the database.
   * @param {string} orderId The id of the order.
   * @param {string} itemId The id of the ordered item.
   */
  const deleteOrderedItem = async (orderId, itemId) => {
    const response = await fetch(
      `http://localhost:5000/api/order/${orderId}/${itemId}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )

    response.status === 200
      ? setOrder(order.filter((item) => item.id !== itemId))
      : swal({
            title: "Error",
            text: "The following action failed to remove order item " + error,
            icon: "warning",
            dangerMode: true,
          })
  }

  /**
   * This function calculates the total cost of the order.
   * @returns {string} The total cost of the order.
   */
  const calculateCost = () => {
    let total = 0
    order.forEach((item) => {
      total += parseFloat(item.price)
    })

    return (total).toFixed(2)
  }

  return (
    <div className='order-container'>
      
      <header className='order-header'>
        <h1>Ordered Items</h1>
      </header>
      <OrderList items={order} deleteItem={deleteOrderedItem} />
      <h2 style={{color: '#211E1E'}}>Total Cost: ${calculateCost()}</h2>

      <Form onSubmit={handleSubmit}>
        <Button className='add-btn' type="submit">Confirm Order</Button>
      </Form>
    </div>
  )
}
export default OrderPage
