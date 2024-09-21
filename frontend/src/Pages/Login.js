import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./page.css";
import {userLogin, handleChangeForm} from "../components/Responses"

/**
 * This is the login page of the application.
 * @returns {JSX.Element} The login page of the application.
 */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /**
   * This function validates the login form.
   * @returns {boolean} True if the form is valid, false otherwise.
   */
  function validateForm() {
    
    return email.length > 0 && password.length > 0;
  }

  /**
   * This function handles the submission of the login form.
   * @param {Event} event The event that triggered the function.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await userLogin({
        email: email,
        password: password,
      });
      if (response.status === 200) {
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
    <h2> Login to your account </h2>
    <div className="Login">
      <Form onSubmit={handleSubmit}>
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
        <Button block="true" size="lg" type="submit" disabled={!validateForm()} className="text">
          Login
        </Button>
      </Form>
    </div>
    </div>
  );
}
  

export default Login;
