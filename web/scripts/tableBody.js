import { globalObj } from "./globalObj.js"

export function getTableBody (registro) {
	let arrayTr = []

	//* Insertar la fila de numero de operaciones
	globalObj.removeAsiento.setClass()
	let firstLine = cells(globalObj.removeAsiento.button.outerHTML) + cells(`Operacion No.${globalObj.iterCantRegistros()}`) + cells('') + cells('') + cells('') + cells('')
	arrayTr.push(row(firstLine, true))

	let isDebt = false
	registro.forEach(fila => {
		isDebt = (fila[3]==='')? (fila[4]!=='') : isDebt

		const rowBody = fila.map((item, _index) => {
			//* Indentar las cuentas por naturaleza
			if (_index===1 && isDebt && fila[3]!=='') return cells(item, 3)
			else if (_index===1 && fila[5]!=='') return cells(item, 4)
			else if (_index===1 && !isDebt && fila[3]!=='') return cells(item, 5)

			//* Colocar el signo de peso
			else if (_index===3 && item!=='') return cells('$'+item)
			else if	((_index===4 || _index===5) &&
								globalObj.cantRegistros===2 && 
								item!=='' && 
								!(registro[0][4].includes('$') || registro[0][5].includes('$'))) return cells('$'+item)

			//* Caso default
			else return cells(item)
		}).join('\n')

		arrayTr.push(row(rowBody))
	})

	return arrayTr
}

function row (cells, newOp=false) {
	const row = document.createElement('tr')
	if (newOp) row.className = 'bg-info'
	row.innerHTML = cells
	return row
}

function cells (data, indent=0) {
	let prop = (indent!==0)? `ps-${indent}` : ''
	return `<td class="px-2 ${prop} border-1">${data}</td>`
}