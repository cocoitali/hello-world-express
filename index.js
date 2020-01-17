// const http = require('http') // don't need with express
const express = require('express')

// const hostname = '127.0.0.1' // don't need w/ express
const port = 3000

const racesRoutes = require('./races/racesRoutes')
const server = express()
// const server = http.createServer((req, res)=> {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", 'text/plain');
//     res.end('Hello World, from NodeJS');
// });
server.use('/races', racesRoutes);

server.use('/', () => {
    res.status(200).send('Hello from express')
})


server.listen(port, () => {
	console.log(`server listening on port ${port}`)
})
