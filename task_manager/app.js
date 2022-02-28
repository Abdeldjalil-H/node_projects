const express = require('express')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const app = express()
const tasks = require('./routes/tasks')
app.use(express.static('./public'))

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (err) {
        console.log(`server fail to start...`)
        console.log(err)
    }
}

start()