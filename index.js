const express = require('express');
const STRINGS = require('./constants');
const app = express();
var cors = require('cors')

app.use(cors());

//sending random string from data
app.get('/getString', (req, res) => {
    let randomWord = STRINGS[Math.floor(Math.random() * STRINGS.length)];
    res.send({ code: "200", message: 'expected output sent', data: randomWord })
})

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}!`)
});
