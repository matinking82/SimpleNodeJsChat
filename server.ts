import express from 'express'
import morgan from 'morgan'
import authenticationRouter from './routers/Authentication'
import messagesRouter from './routers/messages'
import { protect } from './utils/jwt'
const app = express()

//middlewares
//app.use(morgan)
app.use(express.json())

//routers
app.get('/', (req, res) => {
    res.send('welcome to my chat </br>/user for signup, /user/signin for signin , /messages for send and read messages')
})
app.use('/user', authenticationRouter)
app.use('/messages', protect, messagesRouter)

export default app