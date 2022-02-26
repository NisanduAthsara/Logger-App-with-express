const express = require('express')
const morgan = require('morgan')
const {v4:uuidv4} = require('uuid')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000

morgan.token('id',function getId(req){
    return req.id
})

morgan.token('user',(req,res,param)=>{
    return 'userToken'
})

app.use(assignId)

let acessLog = fs.createWriteStream(path.join(__dirname,'data.log'),{flags:'a'})

app.use(morgan(':id :user :method :status :url :http-version'))
app.use(morgan(':id :user :method :status :url :http-version',{stream:acessLog}))

app.get('/',(req,res)=>{
    res.send('Margon App')
})

function assignId(req,res,next){
    req.id = uuidv4()
    next()
}

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})