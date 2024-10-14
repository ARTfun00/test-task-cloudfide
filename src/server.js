const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})




app.listen(3000)

// handler of unhandledRejection or system interruptions of sever
// TODO: potentially other logging mechanism could be used here
process.on('unhandledRejection', error => {
    console.error('server unhandledRejection:', error?.message);
    console.error(error);
}); 
