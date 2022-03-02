const connectTomMongo = require('./db');
const express = require('express')


connectTomMongo();
const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.send('Hello World! Test ')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})