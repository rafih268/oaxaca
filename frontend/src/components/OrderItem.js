/**
 * This component renders an order item with its name and price.
 * It also has a delete button that calls the deleteItem function.
 * @module OrderItem
 */
import '../App.css'
import { FaTrash } from 'react-icons/fa'

/**
 * This function renders the order item.
 * @param {Object} item - The item to be rendered.
 * @param {Function} deleteItem - The function to delete an item.
 * @returns {JSX.Element} - The order item.
 */
const OrderItem = ({ item, deleteItem }) => {
  return (
    <div className='order-item'>
      <h3>
        {item.item_name}
        <FaTrash
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => deleteItem(item.order_id, item.id)}
        />
      </h3>
      <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
    </div>
  )
}
export default OrderItem
