const express = require('express')
const router = new express.Router()
const CreateUser = require('../models/user')
const CreatePatner = require('../models/patner')
const Order = require('../models/orders')


//admin can create users account
router.post('/admins/createuser', async (req, res) => {
    const user = new CreateUser(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
}),

//admin can get users by id
router.get('/admins/getuser/:id', async (req, res) => {
    
    const _id = req.params.id

    try {
        const user = await CreateUser.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
    
})

//admin can get users orders
router.get('/admins/orders', async (req, res) => {
    try {
        const orders = await Order.find({})
        res.send(orders)
    } catch (e) {
        res.status(500).send()
    }
})



//admins can create patners account
router.post('/admins/patner', async (req, res) => {
    const patner = new CreatePatner(req.body)
    try {
        await patner.save()
        res.status(201).send(patner)
    } catch (e) {
        res.status(400).send(e)
    }
})

//admins can find patners by there id's and update there products and other details
router.patch('/admins/patner:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['company_name', 'email', 'company_address', 'product', 'contact']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const patner = await CreatePatner.findById(req.params.id)

        patner.forEach(update => {
            patner[update]=req.body[update]
        });

        await patner.save();

        if (!user) {
            return res.status(404).send()
        }

        res.send(patner)
    } catch (e) {
        res.status(400).send(e)
    }
})





module.exports = router