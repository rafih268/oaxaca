import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./page.css";
import {userRegister, handleChangeForm} from "../components/Responses"

/**
 * This is the registration page. It allows users to register a customer account.
 * @returns {JSX.Element} The registration page.
 */
function Register() {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /**
   * This function handles the submission of the registration form.
   * @param {Event} event The event that triggered the function.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await userRegister({
        name: username,
        email: email,
        password: password,
        role: "CUSTOMER"
      });
      if (response.status === 201) {
        const userData = await response.json();
        sessionStorage.setItem("user", JSON.stringify(userData));
        navigate("/home"); // redirect to home page
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
    <h2> Register an account </h2>
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
            <Form.Label className="input-parent">Name</Form.Label>
            <Form.Control className="input"
                autoFocus
                type="username"
                value={username}
                onChange={(e) => handleChangeForm(e, username, setUsername)}
            />
            </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label className="input-parent">Email</Form.Label>
          <Form.Control className="input"
            autoFocus
            type="email"
            value={email}
            onChange={(e) => handleChangeForm(e, email, setEmail)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label className="input-parent">Password</Form.Label>
          <Form.Control className="input"
            type="password"
            value={password}
            onChange={(e) => handleChangeForm(e, password, setPassword)}
          />
        </Form.Group>
        <Button block="true" size="lg" type="submit" className="text">
          Register
        </Button>
      </Form>
    </div>
    </div>
  );
}
  

export default Register;
