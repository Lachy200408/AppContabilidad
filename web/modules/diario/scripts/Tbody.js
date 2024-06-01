export class Tbody {
	static rmBtn = {
		html: document.createElement('button'),
		initBtn: function () {
			this.html.className = 'btn btn-close p-2 mx-auto d-block rmBtn'
		}
	}

	static get (registro, numOp) {
		let arrayTr = []

		//* Insertar la fila de numero de operaciones
		this.rmBtn.initBtn()

		arrayTr.push(this.row(
			this.cells(this.rmBtn.html.outerHTML) + this.cells(`Operacion No.${numOp}`) + this.cells('') + this.cells('') + this.cells('') + this.cells(''),
			true
		))

		let isDebt = false
		registro.forEach((fila, index) => {
			isDebt = (fila[3]==='')? (fila[4]!=='') : isDebt

			const rowBody = fila.map((item, _index) => {
				//* Indentar las cuentas por naturaleza
				if (_index===1 && isDebt && fila[3]!=='') return this.cells(item, 3)
				else if (_index===1 && fila[5]!=='') return this.cells(item, 4)
				else if (_index===1 && !isDebt && fila[3]!=='') return this.cells(item, 5)

				//* Colocar el signo de peso
				else if (_index===3 && item!=='') return this.cells('$'+item)
				else if	((_index===4 || _index===5) &&
									numOp===1 && 
									item!=='' && 
									!((_index===4 && registro[0][4]!=='' && index!=0) ||
										(_index===5 && registro[0][5]!=='' && index!=0))) return this.cells('$'+item)

				//* Caso default
				else return this.cells(item)
			}).join('\n')

			arrayTr.push(this.row(rowBody))
		})

		return arrayTr
	}

	static row (cells, newOp=false) {
		const row = document.createElement('tr')
		if (newOp) row.className = 'bg-info'
		row.innerHTML = cells
		return row
	}

	static cells (data, indent=0) {
		let prop = (indent!==0)? `ps-${indent}` : ''
		return `<td class="px-2 ${prop} border-1">${data}</td>`
	}
}