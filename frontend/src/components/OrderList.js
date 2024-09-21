/**
 * This is a functional component that takes renders out a list of order items using the component OrderItem.
 * @module OrderList
 */
import OrderItem from './OrderItem'

/**
 * This function renders the list of order items.
 * @param {Object} items - The items to be rendered.
 * @param {Function} deleteItem - The function to delete an item.
 * @returns {JSX.Element} - The list of order items.
 */
const OrderList = ({ items, deleteItem }) => {
  return (
    <>
      {items.length > 0
        ? items.map((item, index) => <OrderItem key={index} item={item} deleteItem={deleteItem} />)
        : (<h2>No items have been added</h2>)}
    </>
  )
}
export default OrderList
