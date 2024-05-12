import http from 'node:http'
import { handlerGet } from './GET/handlerGet.mjs'
import { handlerPost } from './POST/handlerPost.mjs'

const server = http.createServer(handlerServer)

const PORT = process.env.PORT ?? 8080
server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})

function handlerServer (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*')

	if (req.method === 'GET') handlerGet(req, res)
	if (req.method === 'POST') handlerPost(req, res)
}