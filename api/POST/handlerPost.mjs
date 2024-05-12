export function handlerPost (req, res) {
	let body = ''
	
	req.on('data', chunk => {
		body += chunk
	})
	req.on('end', () => {
		body = body.toString()
		console.log(body)

		res.writeHead(200, {'Content-type': 'application/json; charset=utf-8'})
		res.end(JSON.stringify(body))
	})
}

//! Lo proximo es hacer la conversion a excel