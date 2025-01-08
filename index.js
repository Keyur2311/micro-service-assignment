const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
const connectDB = require('./config/db')

connectDB()


const userRoutes = require('./routes/userRoutes');