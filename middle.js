// Express if for Connection
const express = require('express');
const app = express();


const requestTime = function (req, res, next) {
    req.requestTime = Date.now()
    next()
}

app.use(requestTime)

app.get('/', (req, res) => {
    let responseText = 'Your Data is End to End Encrypted'
    responseText += `<small> Requested At: ${res.requestTime}</small>`
    res.send(responseText)
})

app.listen(3000)
console.log(`Port is running on ${3000}`)