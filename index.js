require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')



const config = require('./config/key')
const app = express()

//MIDDLEWARE DECLARATIONS
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())


//MOGODB CONNECTION
const connect = mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
                .then(() => console.log('mogodb connected successfully'))
                .catch(err => console.log('error connecting to database', err.message))
                

//ROUTES WILL GO IN HERE
app.use('/users', require('./routes/userRoutes/userRouter'))
app.use('/api', require('./routes/productRoutes/productRouter'))
app.use('/api', require('./routes/categoryRoutes/categoryRouter'))







//LISTENING TO THE SERVER
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`app started on  port ${port} `))