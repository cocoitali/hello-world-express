// const http = require('http') // don't need with express
const express = require('express')

// const hostname = '127.0.0.1' // don't need w/ express
const port = 3000

const server = express()
// const server = http.createServer((req, res)=> {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", 'text/plain');
//     res.end('Hello World, from NodeJS');
// });
server.use('/', (req, res) => {
    res.status(200).send('Hello from express app running')
})

const hobbits = [
    {
        id: 1,
        name: 'Samwise Gamgee'
    },
    {
        id: 2,
        name: 'Frodo Baggins'
    }
]
let nextId = 3

server.get('/', (req, res) => {
	//request handler, also middleware
	res.send('Hello world form Express')
})

server.get('/hobbits', (req, res) => {
    console.log(req.query)
	// query string parameters get added to req.query
	const sortField = req.query.sortby || 'id'
	// const hobbits = [
	// 	{
	// 		id: 1,
	// 		name: 'Samwise Gamgee'
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Frodo Baggins'
	// 	}
    // ]
    // let nextId = 3

	// apply the sorting
	const response = hobbits.sort((a, b) =>
		a[sortField] < b[sortField] ? -1 : 1
	)

	res.status(200).json(response)
})

server.options('/hobbits', (req, res) => {
    const hobbit = req.body;
    hobbit.id = nextId++

    hobbits.push(hobbit);

    res.status(201).json(hobbits);
})

server.delete('hobbits/:id', (req, res) => {
	const id = req.params.id
	console.log(req.params)
	res
		.status(200)
		.json({
			url: `/hobbits/${id}`,
			operations: `DELETE for hobbit with id ${id}`
		})
})

server.listen(port, () => {
	console.log(`server listening on port ${port}`)
})
