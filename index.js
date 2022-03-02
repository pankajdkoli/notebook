const connectTomMongo = require('./db');
const express = require('express')


connectTomMongo();
const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.send('Hello World! Test ')
})

// availbale Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})