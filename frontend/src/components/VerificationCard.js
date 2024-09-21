/**
 * This component is used to verify the card details of the user.
 * @module VerificationCard
 */
import React, { useState, useEffect } from 'react'
import {
  createOrder,
  capturePayment,
  generateAccessToken,
  handleResponse,
} from './PaypalApi.js'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

/** checkCard is referenced in the main verificationCard const and handles actually sending the request and data. 
 * 
 * @param {*} data sent to the backend. 
 * @returns response if the request was successful or failed.
 */

async function checkCard(data) {
  const response = await fetch(`http://localhost:5000/api/payment/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return await response
}

/** Updates user state with input field values on change. (Reused code from auth Responses.js).
 *
 * @param {*} event that the user changes card details.
 * @param {*} cardDetails correspond to card details through frontend.
 * @param {*} setCardDetails tries to set CardDetails if a new value has been entered.
 * @returns relevant response if request was sucessfull or not, prompting further action.
 */
export function handleChangePayment(event, cardDetails, setCardDetails) {
  let updatedCardDetails = Object.assign({}, cardDetails)
  switch (event.target.name) {
    case 'cardId':
      updatedCardDetails.cardId = event.target.value
      break
    case 'cardType':
      updatedCardDetails.cardType = event.target.value
      break
    case 'cardNumber':
      updatedCardDetails.cardNumber = event.target.value
      break
    case 'fullName':
      updatedCardDetails.fullName = event.target.value
      break
    case 'expiryDate':
      updatedCardDetails.expiryDate = event.target.value
      break
    case 'cvv':
      updatedCardDetails.cvv = event.target.value
      break
    default:
      break
  }
  setCardDetails(event.target.value)
  return updatedCardDetails
}

/**
 * This function is used to render the verification card component.
 * @returns {JSX.Element} - The verification card component.
 */
const VerificationCard = () => {
  const [cardDetails, setCardDetails] = useState([])

  useEffect(() => {
    getCardDetails()
  })

  const getCardDetails = async () => {
    const response = await fetch('http://localhost:5000/api/payment', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    setCardDetails(data)
  }

  const navigate = useNavigate()

  const [cardNumber, setCardNumber] = useState('')
  const [cardType, setCardType] = useState('')
  const [cardFullName, setCardFullName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')

  // handles event for when the user clicks the submit button
  async function handleSubmit(event) {
    event.preventDefault()
    if (
      cardCvv.length > 0 &&
      cardFullName.length > 0 &&
      cardType.length > 0 &&
      cardCvv.length > 0 &&
      cardExpiry.length > 0
    ) {
      try {
        const response = await checkCard({
          cardNumber: cardNumber,
          cardType: cardType,
          fullName: cardFullName,
          expiryDate: cardExpiry,
          cvv: cardCvv,
        })
        if (response.status === 200) {
          const cardData = await response.json()
          sessionStorage.removeItem('totalCost')
          navigate('/paymentsuccess')
          sessionStorage.setItem('card', JSON.stringify(cardData))
        }
      } catch (error) {
        console.log(error)
        swal({
          title: 'Error with payment',
          text: 'Please try again error message: ' + error,
          icon: 'warning',
          dangerMode: true,
        })
      }
    } else {
      swal({
        title: 'Empty field',
        text: 'Please fill in the whole form before submitting',
        icon: 'warning',
        dangerMode: true,
      })
    }
  }

  return (
    <div className='cverification_canvas'>
      <h1 className='cverification_header'>Payment</h1>
      {sessionStorage.getItem('totalCost') > 0 ? (
        <p>Amount to be paid: ${sessionStorage.getItem('totalCost')}</p>
      ) : (
        <p>No items have been added to your order.</p>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='card_no'>
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type='text'
            name='card_no'
            value={cardNumber}
            onChange={(event) => setCardNumber(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='card_type'>
          <Form.Label>Card Type</Form.Label>
          <Form.Control
            type='text'
            name='card_type'
            value={cardType}
            onChange={(event) => setCardType(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='card_fullname'>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type='text'
            name='card_fullname'
            value={cardFullName}
            onChange={(event) => setCardFullName(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='card_expiry'>
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control
            type='text'
            name='card_expiry'
            value={cardExpiry}
            onChange={(event) => setCardExpiry(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='card_cvv'>
          <Form.Label>Card cvv</Form.Label>
          <Form.Control
            type='number'
            name='card_cvv'
            value={cardCvv}
            onChange={(event) => setCardCvv(event.target.value)}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default VerificationCard
