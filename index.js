const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 5005

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World! Test ')
})

// availbale Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(` app listening on port http://localhost:${port}`)
});