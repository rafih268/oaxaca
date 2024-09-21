const express = require('express')
const bodyParser = require('body-parser')

const router_ol = express.Router()
const {PrismaClient} = require("@prisma/client")
const errMiddleware = require("../middleware/errMiddleware")
const router = require('./authRoute')
const { transformDocument } = require('@prisma/client/runtime')

const { order_list } = new PrismaClient()

// this requires BODY-PARSER to be installed: npm intall body-parser
// GET: http://localhost:5000/api/order_list
// PUT: http://localhost:5000/api/order_list/update_detail/1
// PUT: http://localhost:5000/api/order_list/update/2

// POST: http://localhost:5000/api/order_list/add/200
// DEL: http://localhost:5000/api/order_list/delete/10

router_ol.get('/', errMiddleware , async (req,res) => {
    const orders = await order_list.findMany({
        select: {
            user_id: true,
            order_no: true,
            table_no: true,
            dish: true,
            cost: true,
            order_created_at: true,
            last_updated: true,
            completed: true
        }
    })

    res.json(orders)
})

/** Updates completed field of order_list.
 * 
 * Gets the order number and parses it to int, then selects entry with specific order num & gets the bool value for 'completed'.
 * Sets the completed value to the opposite of what 'completed' previously was.
 */
router_ol.put('/update/:no', errMiddleware,  async (req,res) => {
    const target_ordernum = Number(req.params.no);

    const bool = await order_list.findUnique({
        where: {
            order_no: target_ordernum
        },
        select: {
            completed: true
        }
    })

    var data = false;
    if(bool.completed == false){data = true}
    if(bool.completed == true){data = false}

    
    const target = await order_list.update({
        where: {
            order_no: target_ordernum
        },
        data: {
            completed: data,
            last_updated: new Date()
        }
    })
    return res.json();

})

/** Updates other fields in order_list.
 * 
 * Uses param to get id of item, gets the relevant entry and stores all old values into new fields.
 * Javascript checks which relevant fields are different (by checking if null), if not null, override the old value to new value & updates.
 * Utilises the body-parser to parse the body elements so multiple fields can be passed in. 
 * 
 */
router_ol.put('/update_detail/:id', errMiddleware,  async (req,res) => {
    const id = Number(req.params.id);
    const details = req.body;

    const entry = await order_list.findUnique({
        where: {
            order_no: id
        },
        select: {
            user_id: true,
            table_no: true,
            dish: true,
            cost: true,
            order_created_at: true,
            last_updated: true,
        }
    })

    var newUid = entry.user_id
    var newTableno = entry.table_no
    var newDish = entry.dish
    var newCost = entry.cost
    var newOrdtime = entry.order_created_at

    if(details.user_id){newUid = details.user_id}
    if(details.table_no){newTableno = details.table_no}
    if(details.dish){newDish = details.dish}
    if(details.cost){newCost = details.cost}
    if(details.order_created_at){newOrdtime = details.order_created_at}

    const updateTarget = await order_list.update({
        where: {
            order_no: id
        },
        data: {
            user_id: newUid,
            table_no: newTableno, 
            dish: newDish,
            order_created_at: newOrdtime,
            cost: newCost,
            last_updated: new Date()
        }
    })


    return res.json();

})

router_ol.post('/add/:id', errMiddleware , async (req,res) => {
    const newOrdNum = Number(req.params.id);

    const exists = await order_list.findUnique({
        where: {
            order_no: newOrdNum
        }
    })

    if(exists) {
        return res.status(400).json({
            msg: "this order already exists"
        })
    }

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

    return res.json();
});


router_ol.delete('/delete/:id', errMiddleware , async (req,res) => {
    const ordNo = Number(req.params.id);

    var found = null
    found = await order_list.findUnique({
        where: {
            order_no: ordNo
        }
    })

    if(found != null)
    {
        const delete_order = await order_list.delete({
            where: {
                order_no: ordNo,
            }
        })
    }
    if(found == null) {
        return res.status(400).json({
            msg: "this order does not exist"
        })
    }

    return res.json();
});

module.exports = router_ol