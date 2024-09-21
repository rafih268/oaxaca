import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "./page.css";

/**
 * This page is the home page for guests and employees. 
 * It displays functionality depending on the role of the logged in user.
 * @returns {JSX.Element} The home page for guests and employees.
 */
const HomePage = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [unresolvedRequests, setUnresolvedRequests] = useState([]);
  const [tableAssignment, setTableAssignment] = useState(null);
  const [deletingRequestId, setDeletingRequestId] = useState(null);
  const [togglingRequestId, setTogglingRequestId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); 
  const [isToggling, setIsToggling] = useState(false); 
  

  useEffect(() => {
    checkToken();
  }, []); // the empty dependency array ensures that this effect is only run once
  
  useEffect(() => {
    getAssignment();
  }, []);
  
  useEffect(() => {
    getUnresolvedRequests();
  }, []);
  

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
   * This function creates a new help request for the logged in user.
   * @returns {Promise<Response>} The response from the server.
   */
  async function requestAssistance() {
    const response = await fetch(`http://localhost:5000/api/help_request/` + id, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      })
    return response;
  }

  /**
   * This function gets all unresolved help requests.
   * @returns {Promise<Response>} The response from the server.
   */
  async function getUnresolvedRequests() {
    const response = await fetch(`http://localhost:5000/api/help_request/resolved/false`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
    const requestJson  = await response.json();
    setUnresolvedRequests(requestJson.data);
    return response;
  }

  /**
   * This function gets the table assignment for the logged in user.
   * @returns {Promise<Response>} The response from the server.
   */
  async function getAssignment() {
    const response = await fetch(`http://localhost:5000/api/table_assignment/`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
    const requestJson  = await response.json();
    if(requestJson.data.length === 0){
      return;
    }
    for(let i = requestJson.data.length-1; i >= 0; i--){
      if(requestJson.data[i].user_id === id){
        setTableAssignment(requestJson.data[i]);
        break;
      }
    return response;
    }
  }
  
  /**
   * This function creates a new help request for the logged in user.
   * @param {Event} event The event that triggered this function.
   * @returns {Promise<Response>} The response from the server.
   */
  async function handleRequestAssistance(event) {
    try {
      await requestAssistance();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * This function deletes a help request with the given id.
   * @param {number} requestId The id of the help request to delete.
   */
  async function handleDeleteRequest(requestId) {
    setIsDeleting(true);
    setDeletingRequestId(requestId);
    try {
      await fetch(`http://localhost:5000/api/help_request/${requestId}`, {
        method: "DELETE",
      });
      setUnresolvedRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
      setDeletingRequestId(null);
    }
  }

  /**
   * This function toggles the resolved status of a help request with the given id.
   * @param {number} requestId The id of the help request to toggle.
   * @param {boolean} resolved The current resolved status of the help request.
   */
  async function handleToggleRequest(requestId, resolved) {
    setIsToggling(true);
    setTogglingRequestId(requestId);
    try {
      await fetch(`http://localhost:5000/api/help_request/toggleresolved/${requestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resolved: !resolved }),
      });
      setUnresolvedRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
      setUnresolvedRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId ? { ...request, resolved: !resolved } : request
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsToggling(false);
      setTogglingRequestId(null);
    }
  }

  /**
   * This function assigns a waiter to a table that is not currently being served.
   */
  async function handleAssignWaiter() {
    try {
      let table_number = 1;
      while (tableAssignment === null) {
        const response = await fetch(`http://localhost:5000/api/table_assignment/table/${table_number}/WAITER`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const requestJson = await response.json();
        if (requestJson.data.length === 0) { // if table is not currently being served
          const assignment = await fetch(`http://localhost:5000/api/table_assignment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              user_id: id,
              table_no: table_number,
             }),
          });
          if(assignment.status === 201){
            const assignmentData = await assignment.json();
            setTableAssignment(assignmentData.data);
            break;
          }
        }
        table_number++;
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * This function unassigns a waiter from all tables they are assigned to.
   */
  async function handleUnassignWaiter() {
    try {
      const response = await fetch(`http://localhost:5000/api/table_assignment/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const requestJson = await response.json();
      let assignments = requestJson.data;
      
      // only keep assignments that match the logged in user
      assignments = assignments.filter((assignment) => assignment.user_id === id);

      // delete all assignments for the user
      const deletePromises = assignments.map((assignment) =>
      fetch(`http://localhost:5000/api/table_assignment/${assignment.id}`, {
          method: "DELETE",
        })
      );
      await Promise.all(deletePromises); // wait for deletion to finish before updating state

      setTableAssignment(null);
    } catch (error) {
      console.log(error);
    }
  }

  // if user is not logged in, show guest page
  if(!user){
    return (
      <div>
        <h2>Welcome to Oaxaca!</h2>
        <h2><a href="/Register" className="text"> <Button className='asset-btn-blue'>Sign Up! </Button></a></h2>
        <h2><a href="/Login" className="text"> <Button className='asset-btn-blue'>Login</Button></a></h2>
        <h2><a href="/Menu" className="text"> <Button className='asset-btn-blue'>Menu</Button></a></h2>
      </div>
    );
  }

  const { name, role, id, token } = user;
  // if user is logged in, show home page
  return (
    
    <div>
      <h2>Welcome, {name}.</h2>
      <Link to="/menu">
            <Button className='asset-btn-blue'>View Menu</Button>
      </Link>
      {role === "CUSTOMER" && (
        <div>
          <Link to="/order">
          <Button className='asset-btn-green'>Place Order</Button>
          </Link>
          <Form onSubmit={handleRequestAssistance}>
            <Button block="true" size="lg" type="submit" className="asset-btn-blue">Request Assistance</Button>
          </Form>
        </div>
      )}
      {role === "KITCHEN_STAFF" && (
        <div>
          <Link to="/orders">
            <Button className='asset-btn-blue'>View Orders</Button>
          </Link>
          <Form onSubmit={handleRequestAssistance}>
          <Button block="true" size="lg" type="submit" className='asset-btn-blue'>Request Assisstance</Button>
          </Form>
        </div>
      )}
      {role === "WAITER" && (
        <div>
          <Link to="/orders">
            <Button className='asset-btn-blue'>View Orders </Button>
          </Link>
          <Link to="/Waiter">
          <Button className='asset-btn-blue'>Edit Orders</Button>
          </Link>

          {tableAssignment ? (
            <div>
              <h2>Assigned to table {tableAssignment.table_no} at {tableAssignment.last_updated}</h2>
              <Button onClick={handleUnassignWaiter} variant="warning">Unassign</Button>
            </div>
          ) : (
            <div>
              <h2>Not currently assigned to a table.</h2>
              <Button className='asset-btn-green'onClick={handleAssignWaiter} variant="success">Get Assigned</Button>
            </div>
          )}
        
          <h2>Unresolved Help Requests ({unresolvedRequests.length})</h2>
            {unresolvedRequests.length > 0 ? (
              <ListGroup className='help-request-list'>
                {unresolvedRequests.map(request => (
                  <ListGroup.Item key={request.id} className="help-request-item">
                    {request.user.role} {request.user.name}, ID: {request.user_id} requested assistance at {request.created_at}
                    <Button 
                    variant={request.resolved ? "success" : "warning"} 
                    size="sm" disabled={isToggling && togglingRequestId === request.id} 
                    onClick={() => handleToggleRequest(request.id)}
                    className = "help-request-button"
                    >
                      Mark as Resolved
                    </Button>
                    <Button 
                    variant="outline-danger" 
                    size="sm" disabled={isDeleting && deletingRequestId === request.id} 
                    onClick={() => handleDeleteRequest(request.id)}
                    className = "help-request-button"
                    >
                      Delete
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p>No unresolved help requests.</p>
            )}
        </div>
      )}
      {role === "MANAGER" && (
        <div>
          <Link to="/orders">
          <Button className='asset-btn-blue'>View Orders</Button>
          </Link>
          <Link to="/manageusers">
          <Button className='asset-btn-blue'>Manage Users</Button>
          </Link>
          <Link to="/Waiter">
          <Button className='asset-btn-blue'>edit orders</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
