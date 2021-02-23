const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express()


const PORT = config.get('port') || 5000


app.use(express.json({extended: true, limit: '50mb'}))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}))
app.use(bodyParser.json())
app.use(bodyParser({limit: '50mb'}));


app.use('/api/hero', require('./routes/hero.routes'))


async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started... on port ${PORT}`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()

