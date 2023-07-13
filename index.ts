import dotenv from 'dotenv'
dotenv.config()
import app from "./server"

app.listen('8080',()=>console.log('listenning at port 8080'))