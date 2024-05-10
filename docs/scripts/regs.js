let cantRegistros = 1

export function getArrayReg (fecha, arrayCuentas, detalle) {
	let arrayRegistros = []

	let firstLine = cells('') + cells(`Operacion No.${cantRegistros++}`) + cells('') + cells('') + cells('') + cells('')
	arrayRegistros.push(row(firstLine, true))

	arrayCuentas.forEach((cuenta, index) => {
		const isDebt = cuenta.debe!=='$0.00'

		let body = (index===0)? cells(fecha) : cells('')
		body += (isDebt)? cells(cuenta.cuenta) : cells(cuenta.cuenta, 4)
		body += cells(cuenta.folio)
		body += cells('')
		body += (isDebt)? cells(cuenta.debe) : cells('')
		body += (isDebt)? cells('') : cells(cuenta.haber)

		arrayRegistros.push(row(body))

		cuenta.subcuentas.forEach(subcuenta => {
			body = cells('')
			body += (isDebt)? cells(subcuenta.subcuenta, 3) : cells(subcuenta.subcuenta, 5)
			body += cells('')
			body += cells(subcuenta.parcial)
			body += cells('') + cells('')

			arrayRegistros.push(row(body))
		})
	})

	let _body = cells('') + cells(detalle) + cells('') + cells('') + cells('') + cells('')
	arrayRegistros.push(row(_body))

	return arrayRegistros
}

function row (cells, newOp = false) {
	const row = document.createElement('tr')
	if (newOp) row.className = 'bg-info'
	row.innerHTML = cells
	return row
}

function cells (data, indent=0) {
	let prop = (indent!==0)? `ps-${indent}` : ''
	return `<td class="px-2 ${prop}">${data}</td>`
}