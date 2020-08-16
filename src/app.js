const express = require('express')
require('./db/mongoose')
require('dotenv').config()

const userRouter = require('./routers/user')
const riderRouter = require('./routers/rider')
const adminRouter = require('./admin/admin')
const adminCreateOthers = require('./admin/adminCreateOthers')

const app = express()
app.use(express.json())
app.use(userRouter)
app.use(riderRouter)
app.use(adminRouter)
app.use(adminCreateOthers)

module.exports = app