let cantRegistros = 1

export function getTableBody (registro) {
	let arrayTr = []

	let firstLine = cells('') + cells(`Operacion No.${cantRegistros++}`) + cells('') + cells('') + cells('') + cells('')
	arrayTr.push(row(firstLine, true))

	let isDebt = false
	registro.forEach(fila => {
		isDebt = (fila[3]==='')? (fila[4]!=='') : isDebt

		const rowBody = fila.map((item, _index) => {
			if (_index===1 && isDebt && fila[3]!=='') return cells(item, 3)
			else if (_index===1 && fila[5]!=='') return cells(item, 4)
			else if (_index===1 && !isDebt && fila[3]!=='') return cells(item, 5)
			else return cells(item)
		}).join('\n')

		arrayTr.push(row(rowBody))
	})

	return arrayTr
}

function row (cells, newOp = false) {
	const row = document.createElement('tr')
	if (newOp) row.className = 'bg-info'
	row.innerHTML = cells
	return row
}

function cells (data, indent=0) {
	let prop = (indent!==0)? `ps-${indent}` : ''
	return `<td class="px-2 ${prop} border-1">${data}</td>`
}

export function reset() {
	cantRegistros = 1
}