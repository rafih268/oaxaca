/**
 * A function that sends a POST request to the server to register a new user.
 * @async
 * @param {Object} data - The user data to be sent to the server.
 * @returns {Object} - The response from the server.
 */
export async function userRegister(data) {
    const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response;
}

/**
 * A function that sends a POST request to the server to login a user.
 * @async
 * @param {Object} data - The user data to be sent to the server.
 * @returns {Object} - The response from the server.
 */
export async function userLogin(data) {
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response;
}

export async function deleteItem(data) {
    const response = await fetch(`http://localhost:5000/api/menu/:id`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        })
      return await response;
  }


/**
 * Updates the user state with the input field values on change.
 *
 * @param {Event} event - The change event from the input field.
 * @param {Object} user - The current user state object.
 * @param {Function} setUser - The setter function to update the user state.
 * @returns {Object} - The updated user state object.
 */
export function handleChangeForm(event, user, setUser) {
  let updatedUser = Object.assign({}, user);
  switch (event.target.name) {
      case 'username':
          updatedUser.name = event.target.value;
          break;
      case 'email':
          updatedUser.email = event.target.value;
          break;
      case 'password':
          updatedUser.password = event.target.value;
          break;
      case 'role':
          updatedUser.role = event.target.value;
          break;
      default:
          break;
  }
  setUser(event.target.value);
  return updatedUser;
}

