import { downloadBook } from "./downloadBook/downloadBook.mjs"

export function handlerPost (req, res) {
	if (req.url === '/downloadBook') downloadBook(req, res)
}
