const express = require('express');
const router = express.Router();
const { getHelpRequest, getAllHelpRequests, getHelpRequestsByUser, getResolved, createHelpRequest, updateHelpRequest, toggleResolved, deleteHelpRequest } = require('../controllers/helpReqController');

/**
 * This file assigns CRUD operations to their corresponding endpoints.
 * The router object is used to handle HTTP requests through the HTTP methods it provides.
 */

router.get('/:id', getHelpRequest);
router.get('/', getAllHelpRequests);
router.get('/user/:user_id', getHelpRequestsByUser);
router.get('/resolved/:resolved', getResolved);
router.post('/:user_id', createHelpRequest);
router.put('/toggleresolved/:id', toggleResolved);
router.put('/:id', updateHelpRequest);
router.delete('/:id', deleteHelpRequest);

module.exports = router;
