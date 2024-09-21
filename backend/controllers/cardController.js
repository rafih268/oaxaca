const express = require('express')
const bodyParser = require('body-parser')

const asyncHandler = require('express-async-handler')


const {PrismaClient} = require("@prisma/client")
const errMiddleware = require("../middleware/errMiddleware")
const { transformDocument } = require('@prisma/client/runtime')

const { creditCardDetails } = new PrismaClient()

// GET:  http://localhost:5000/api/payment
// POST: http://localhost:5000/api/payment/add
// DEL:  http://localhost:5000/api/payment/delete
// POST: http://localhost:5000/api/payment/check

/** Route to get all Card details.
 * 
 * @param {*} req request, does not need any additional information as the route is default.
 * @param {*} res response, sends back all the card details in the prisma database.
 */
const getCardDetails = async (req, res) => {
    const cards = await creditCardDetails.findMany({
        select: {
            cardType: true,
            cardNumber: true,
            fullName: true,
            expiryDate: true,
            cvv: true
        }
    })
    res.json(cards)
};


/** Add a new card to the database through a route. 
 * CardNumber field sent as a string as 16 digits (int) was too large and using bigint requires serialization.
 * 
 * @param {*} req request, does not need any additional information as default route.
 * @param {*} res responds with a message if the card already exists in the database.
 * @returns standard json response
 */
const addCard = async (req, res) => {

    const exists = await creditCardDetails.findUnique({
        where: {
            cardNumber: req.body.cardNumber,
        }
    })

    if(exists) {
        return res.status(400).json({
            msg: "Card could not be added: card already exists"
        })
    }

    const newDt = new Date(req.body.expiryDate)
    const add_card = await creditCardDetails.create({
        data: {
            cardType: req.body.cardType,
            cardNumber: req.body.cardNumber,
            fullName: req.body.fullName,
            expiryDate: newDt,
            cvv: req.body.cvv
  
        }
    })

    return res.json();
};


/** Deteles a card from the database.
 * 
 * @param {*} req request, standard request as route same as default. 
 * @param {*} res responds with a message if the card does not exist. 
 * @returns standard json response
 */
const deleteCard = async (req, res) => {
    const newCardNo = (req.body.cardNumber);

    var found = null
    found = await creditCardDetails.findUnique({
        where: {
            cardNumber: newCardNo,
        }
    })

    if(found != null)
    {
        const delete_card = await creditCardDetails.delete({
            where: {
                cardNumber: newCardNo,
            }
        })
    }
    if(found == null) {
        return res.status(400).json({
            msg: "Card could not be deleted: does not exist"
        })
    }

    return res.json();
};


/** Route to check if the card exists in the database. 
 * 
 * This is route is primarily used with the frontend so when the user sends in their details, their card is checked against the database. 
 * Route first grabs the id (CardNumber) and checks if there is an entry with the same id,
 * if there exists such a card, compare all the values. If all values match, alter boolean 'boolSame' which returns the card if sucessfull,
 * otherwise returns message to say details do not match/
 *
 * @param {*} req request, presumable sent through frontend, supplies CardNumber. 
 * @param {*} res response if card details match. 
 */
const checkExists = asyncHandler(async (req, res) => {  

    //grab the entry from database that has matching cardNo, store in cardExists
    const cardExists = await creditCardDetails.findUnique({
        where: {
            cardNumber : req.body.cardNumber,
        },
    })
	
	if (!cardExists) {
      res.status(400)
      console.log("card doesn't exist")
      throw new Error('Card was not found')
    }

    var boolSame = false

    if(req.body.cardType == cardExists.cardType){
        console.log(cardExists.fullName)
        if(req.body.fullName == cardExists.fullName){
            if(req.body.cvv == cardExists.cvv){
                if(Date(req.body.expiryDate) == Date(cardExists.expiryDate)){
                    var boolSame = true
                }
            }
        }
    }
  
    if (boolSame == false) {
      res.status(400)
      throw new Error('Details do not match')
    }
        res.status(200).json({
            cardType : cardExists.cardType,
            cardNumber : cardExists.cardNumber,
            fullName : cardExists.fullName,
            expiryDate : cardExists.expiryDate,
            cvv : cardExists.cvv,
        })

})


module.exports = {
    getCardDetails,
    addCard,
    deleteCard,
    checkExists
  };