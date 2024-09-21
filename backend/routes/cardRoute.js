const express = require('express')
const router = express.Router();
const { getCardDetails , addCard , deleteCard, checkExists} = require('../controllers/cardController');

/**
 * This file assigns CRUD operations to their corresponding endpoints.
 * The router object is used to handle HTTP requests through the HTTP methods it provides.
 */

router.get('/', getCardDetails);
router.post('/add', addCard);
router.delete('/delete', deleteCard);
router.post('/check', checkExists);


module.exports = router;