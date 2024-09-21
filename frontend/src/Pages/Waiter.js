import {handleChangeForm} from "../components/Responses";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Fade from "react-bootstrap/Fade";
import "./page.css";
import swal from 'sweetalert';

/**
 * This page allows waiters to delete menu items, toggle the completeness of orders and delete items from orders.
 * @returns {JSX.Element} The page for management of orders and menu items.
 */
function Waiter(){
  const [itemId, setItemId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [action, setAction] = useState("")
  const [orderItemId, setOrderItemId] = useState("")
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [success, setSuccess] = useState(false);

    useEffect(() => {
        checkToken();
    });

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
        }
    }, [success]);

    /**
     * This function checks that the user from the token matches the user from session storage.
     */
    async function checkToken() {
    if(user){
        const response = await fetch(`http://localhost:5000/api/user/token/` + token, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        const requestJson  = await response.json();
        const { name, id, email, role } = requestJson.data;
        if( name !== user.name || id !== user.id || email !== user.email || role !== user.role){
            console.log("Error: User from token does not match user from session storage");
            sessionStorage.clear();
        }
    }

}

  /**
   * This function deletes a menu item with the specified itemId.
   * @param {Event} event The event that triggered the function.
   * @param {string} itemId The id of the menu item to be deleted.
   */
  async function handleDelete(event, itemId) {
    event.preventDefault();
    try {
        const response = await fetch(`http://localhost:5000/api/menus/${itemId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        });
        setSuccess(response.status === 200);
    } catch (error) {
        console.log(error);
        swal({
              title: "Error",
              text: "Please try again error message: " + error,
              icon: "warning",
              dangerMode: true,
            })
    }
  }

  /**
   * This function deletes or toggles the completeness of an order with the specified orderId.
   * @param {Event} event The event that triggered the function.
   * @param {string} orderId The id of the order to be deleted or toggled.
   * @param {string} action The action to be performed on the order. Either "delete" or "toggle".
   */
  async function handleAction(event, orderId, action) {
    event.preventDefault();
    switch(action){
      // delete order with specified orderId
      case "delete":
        try {
          const response = await fetch(`http://localhost:5000/api/order/${orderId}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
          })
          setSuccess(response.status === 200);
        } catch(error){
          console.log(error)
          swal({
              title: "Error",
              text: "Please try again error message: " + error,
              icon: "warning",
              dangerMode: true,
            })
        }
        break;

      // toggle completed status for order with specified orderId
      default:
        try {
          const response = await fetch(`http://localhost:5000/api/order/toggleStatus/${orderId}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
          })
          setSuccess(response.status === 200);
        } catch(error){
          console.log(error)
          swal({
              title: "Error",
              text: "Please try again error message: " + error,
              icon: "warning",
              dangerMode: true,
            })
        }
        break;
      }
    }

  /**
   * This function deletes an item from an order with the specified orderId.
   * @param {Event} event The event that triggered the function.
   * @param {string} orderId The id of the order to be deleted.
   * @param {string} itemId The id of the item to be deleted.
   */
  async function handleDeleteOrderItem(event, orderId, itemId) {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/order/${orderId}/${itemId}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
      })
      setSuccess(response.status === 200);
    } catch(error){
      console.log(error)
      swal({
              title: "Error",
              text: "Please try again error message: " + error,
              icon: "warning",
              dangerMode: true,
            })
    }
  }

  if(!user){
    return(
        <div>
            <h2>Unauthorized</h2>
        </div>
    )
  }

  const {role, token} = user;

  if(role !== "WAITER" && role !== "MANAGER"){
    return(
        <div>
            <h2>Unauthorized</h2>
        </div>
    )
  }

  return (
    <div>
      <div>
        <h2>Delete Item From Menu</h2>
        <Form onSubmit={(event) => handleDelete(event, itemId)}>
            <Form.Group size="lg" controlId="userId">
            <Form.Label className="input-parent">Item ID</Form.Label>
            <Form.Control className="input"
                autoFocus
                type="itemId"
                value={itemId}
                onChange={(e) => handleChangeForm(e, itemId, setItemId)}
            />
            </Form.Group>
            <Button block="true" size="lg" type="submit" className="text" variant="danger">
            Delete
            </Button>
        </Form>
      </div>
    <div>
        <h2>Complete/Delete Orders</h2>
        <Form onSubmit={(event) => handleAction(event, orderId, action)}>
            <Form.Group size="lg" controlId="orderId">
            <Form.Label className="input-parent">Order ID</Form.Label>
            <Form.Control className="input"
                autoFocus
                type="orderId"
                value={orderId}
                onChange={(e) => handleChangeForm(e, orderId, setOrderId)}
            />
            </Form.Group>
            <Form.Group size="lg" controlId="role">
          <Form.Label className="input-parent">action</Form.Label>
          <Form.Control
              as="select"
              value={action}
              onChange={e => {
                console.log("chosen action", e.target.value);
                setAction(e.target.value);
              }}
            >
              <option>select action</option>
              <option value="delete">Delete Order</option>
              <option value="update">Mark Order Complete</option>
          </Form.Control>
          </Form.Group>
            <Button block="true" size="lg" type="submit" className="text" variant="danger">
            Update
            </Button>
        </Form>
    </div>
    
    <div>
        <h2>Delete Item From Order</h2>
        <Form onSubmit={(event) => handleDeleteOrderItem(event, orderId, orderItemId)}>
            <Form.Group size="lg" controlId="orderId">
            <Form.Label className="input-parent">Order ID</Form.Label>
            <Form.Control className="input"
                autoFocus
                type="orderId"
                value={orderId}
                onChange={(e) => handleChangeForm(e, orderId, setOrderId)}
            />
            </Form.Group>
          <Form.Group size="lg" controlId="custom">
            <Form.Label className="input-parent">Item to Delete</Form.Label>
            <Form.Control className="input"
                autoFocus
                type="custom"
                value={orderItemId}
                onChange={(e) => handleChangeForm(e, orderItemId, setOrderItemId)}
            />
            </Form.Group>
            <Form.Group size="lg" controlId="role">

          </Form.Group>
            <Button block="true" size="lg" type="submit" className="text" variant="danger">
            Update
            </Button>
        </Form>
        <Link to="/home">
                <Button>Return to Home</Button>
        </Link>
        <Fade in={success}>
            <div>
            {success && <p> Success </p>}
            </div>
        </Fade>
    </div>
</div>
  );
}
export default Waiter
