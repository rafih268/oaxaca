const express = require('express')
const bodyParser = require('body-parser')

const router_is = express.Router()
const {PrismaClient} = require("@prisma/client")
const errMiddleware = require("../middleware/errMiddleware")
const router = require('./authRoute')
const { transformDocument } = require('@prisma/client/runtime')


const { MenuItem } = new PrismaClient()

router_is.post('/', errMiddleware , async (req,res) => {

    //const newOrdNum = Number(req.params.id);

    const no_items = 0
    var exists = false
    for(x = 0; x < no_items; x++) {

        if(exists != false) {
            pass;
        } else {

            const add_order = await order_list.create({
                data: {
                    user_id: req.body.user_id,
                    order_no: newOrdNum,
                    table_no: req.body.table_no,
                    dish: req.body.dish,
                    cost: req.body.cost,
                    order_created_at: new Date,
                    last_updated: new Date(),
                    completed: false
                }
            })
            
        }
    }

    return res.json();
})