import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Fade from 'react-bootstrap/Fade'
import './page.css'
import { userRegister, handleChangeForm } from '../components/Responses'
import swal from 'sweetalert'

/**
 * This page allows the manager to create and delete users.
 * @returns {JSX.Element} The page to manage users.
 */
function ManageUsers() {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userRole, setUserRole] = useState('')
  const [userID, setUserID] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    checkToken()
  })

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false)
      }, 2000)
    }
  }, [success])

  /**
   * Checks that the user from the token matches the user from session storage.
   */
  async function checkToken() {
    if (user) {
      const response = await fetch(
        `http://localhost:5000/api/user/token/` + token,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const requestJson = await response.json()
      const { name, id, email, role } = requestJson.data
      if (
        name !== user.name ||
        id !== user.id ||
        email !== user.email ||
        role !== user.role
      ) {
        console.log(
          'Error: User from token does not match user from session storage'
        )
        sessionStorage.clear()
      }
    }
  }

  /**
   * Handles the submit event for the form.
   * @param {Event} event The event that triggered the function.
   */
  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const response = await userRegister({
        name: username,
        email: email,
        password: password,
        role: role,
      })
      setSuccess(response.status === 201)
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Handles the submit event for the form.
   * @param {Event} event The event that triggered the function.
   */
  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const response = await userRegister({
        name: username,
        email: email,
        password: password,
        role: userRole,
      })
      setSuccess(response.status === 201)
    } catch (error) {
      console.log(error)
      swal({
        title: 'Error',
        text: 'Please try again error message: ' + error,
        icon: 'warning',
        dangerMode: true,
      })
    }
  }

  /**
   * Handles the delete event for the form.
   * @param {Event} event The event that triggered the function.
   */
  async function handleDelete(event, userId) {
    event.preventDefault()
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      setSuccess(response.status === 200)
    } catch (error) {
      console.log(error)
      swal({
        title: 'Error',
        text: 'Please try again error message: ' + error,
        icon: 'warning',
        dangerMode: true,
      })
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Unauthorized</h2>
      </div>
    )
  }

  const { role, token } = user

  if (user.role !== 'MANAGER') {
    return (
      <div>
        <h2>Unauthorized</h2>
      </div>
    )
  }

  return (
    <div>
      <h2> Create a User </h2>
      <div className='CreateUser'>
        <Form onSubmit={handleSubmit}>
          <Form.Group size='lg' controlId='username'>
            <Form.Label className='input-parent'>Name</Form.Label>
            <Form.Control
              className='input'
              autoFocus
              type='username'
              value={username}
              onChange={(e) => handleChangeForm(e, username, setUsername)}
            />
          </Form.Group>
          <Form.Group size='lg' controlId='email'>
            <Form.Label className='input-parent'>Email</Form.Label>
            <Form.Control
              className='input'
              autoFocus
              type='email'
              value={email}
              onChange={(e) => handleChangeForm(e, email, setEmail)}
            />
          </Form.Group>
          <Form.Group size='lg' controlId='password'>
            <Form.Label className='input-parent'>Password</Form.Label>
            <Form.Control
              className='input'
              type='password'
              value={password}
              onChange={(e) => handleChangeForm(e, password, setPassword)}
            />
          </Form.Group>
          <Form.Group size='lg' controlId='role'>
            <Form.Label className='input-parent'>role</Form.Label>
            <Form.Control
              as='select'
              value={userRole}
              onChange={(e) => {
                console.log('chosen role', e.target.value)
                setUserRole(e.target.value)
              }}
            >
              <option>select role</option>
              <option value='CUSTOMER'>Customer</option>
              <option value='WAITER'>Waiter</option>
              <option value='KITCHEN_STAFF'>Kitchen</option>
              <option value='MANAGER'>Manager</option>
            </Form.Control>
          </Form.Group>
          <Form.Group size='lg' controlId='password'>
            <Form.Label className='input-parent'>Password</Form.Label>
            <Form.Control
              className='input'
              type='password'
              value={password}
              onChange={(e) => handleChangeForm(e, password, setPassword)}
            />
          </Form.Group>
          <Form.Group size='lg' controlId='role'>
            <Form.Label className='input-parent'>role</Form.Label>
            <Form.Control
              as='select'
              value={userRole}
              onChange={(e) => {
                console.log('chosen role', e.target.value)
                setUserRole(e.target.value)
              }}
            >
              <option>select role</option>
              <option value='CUSTOMER'>Customer</option>
              <option value='WAITER'>Waiter</option>
              <option value='KITCHEN_STAFF'>Kitchen</option>
              <option value='MANAGER'>Manager</option>
            </Form.Control>
          </Form.Group>
          <Button
            block='true'
            size='lg'
            type='submit'
            className='text'
            variant='success'
          >
            Create
          </Button>
        </Form>
        <h2>Delete User</h2>
        <Form onSubmit={(event) => handleDelete(event, userID)}>
          <Form.Group size='lg' controlId='userId'>
            <Form.Label className='input-parent'>User ID</Form.Label>
            <Form.Control
              className='input'
              autoFocus
              type='userId'
              value={userID}
              onChange={(e) => handleChangeForm(e, userID, setUserID)}
            />
          </Form.Group>
          <Button
            block='true'
            size='lg'
            type='submit'
            className='text'
            variant='danger'
          >
            Delete
          </Button>
        </Form>
        <Link to='/home'>
          <Button>Return to Home</Button>
        </Link>
        <Fade in={success}>
          <div>{success && <p> Success </p>}</div>
        </Fade>
      </div>
    </div>
  )
}

export default ManageUsers
