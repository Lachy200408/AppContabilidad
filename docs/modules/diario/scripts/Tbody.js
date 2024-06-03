class Button {
	constructor (className) {
		this.html = document.createElement('button')
		this.html.className = className
		this.html.style.width = '32px'
		this.html.style.height = '32px'
		
		if (className.slice(-3) === 'Btn') return
		if (className.slice(-2) === 'up') this.html.style.clipPath = 'polygon(0px 32px, 16px 0px, 32px 32px)'
		else this.html.style.clipPath = 'polygon(0px 0px, 32px 0px, 16px 32px)'
	}
}

export class Tbody {
	static rmBtn = new Button('btn btn-close mx-auto d-block rmBtn')

	static reBtn = {
		up: new Button('btn bg-white flex-grow-0 mx-auto d-block btn-reorder-asiento-up'),
		down: new Button('btn bg-white flex-grow-0 mx-auto d-block btn-reorder-asiento-down')
	}

	static get (registro, numOp) {
		let arrayTr = []

		//* Insertar la fila de numero de operaciones

		arrayTr.push(this.row(
			this.cells(this.rmBtn.html.outerHTML) +
			this.cells(`Operacion No.${numOp}`) +
			this.cells('') +
			this.cells('') +
			this.cells(this.reBtn.up.html.outerHTML) +
			this.cells(this.reBtn.down.html.outerHTML),
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