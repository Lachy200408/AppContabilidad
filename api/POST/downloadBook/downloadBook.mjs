import { makeBook } from "../../utils/makeBook.mjs"
import { getArrayOp } from "../../utils/getArrayOp.mjs"

export function downloadBook (req, res) {
	let body = ''
	req.on('data', chunk => {
		body += chunk
	})
	req.on('end', () => {
		let arrayOperaciones = getArrayOp(body)
		
		//* Crear el libro y enviarlo
		makeBook(arrayOperaciones, async (_workbook) => {
			res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
			res.setHeader("Content-Disposition", "attachment; filename=Diario.xlsx")

			await _workbook.xlsx.write(res)

			res.status = 200
			res.end()
		})
	})
}