const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const colors = require('colors');

const app = require('./app')

// db connection ----------
mongoose.connect(process.env.LOCAL_DB).then(() => {
    console.log(`Database Connect `.red.bold)
})
// server ---------
const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})