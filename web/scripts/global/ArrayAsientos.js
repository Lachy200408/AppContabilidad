import { Array } from "./Array.js"

export class ArrayAsientos extends Array {
	static global = []

	//* Evento para calcular los totales
	static regChange = new Event('regChange', {bubbles: false})

	static reset () {
		super.reset()
		this.dispatchChange()
	}

	static sort () {
		if (this.global.length <= 1) return

		const mesDias = {
			1: 31,
			2: 59,
			3: 90,
			4: 120,
			5: 151,
			6: 181,
			7: 212,
			8: 243,
			9: 273,
			10: 304,
			11: 334,
			12: 365
		}

		this.global.sort((asientoA, asientoB) => {
			let fechaA = 0,
					fechaB = 0

			asientoA[0][0].split('-').forEach((value, index) => {
				if (index===0) fechaA += +value*365
				if (index===1) fechaA += mesDias[+value]
				if (index===2) fechaA += +value
			})
			asientoB[0][0].split('-').forEach((value, index) => {
				if (index===0) fechaB += +value*365
				if (index===1) fechaB += mesDias[+value]
				if (index===2) fechaB += +value
			})

			return fechaA - fechaB
		})
	}

	static reorder (index, newIndex) {
		if (this.global.length <= 1) return
		if (newIndex === -1 || newIndex === this.global.length) return

		const fecha = this.global[index][0][0],
					newFecha = this.global[newIndex][0][0]

		if (fecha !== newFecha) return

		let arrAux = [], changed = false
		this.global.forEach((asiento, _index, arr) => {
			if (changed) {
				changed = false
				return
			}

			arrAux.push([...asiento])

			if ((_index === newIndex && newIndex === index-1) ||
					(_index === index && newIndex === index+1)) {
				arrAux.pop()
				arrAux.push([...arr[_index+1]])
				arrAux.push([...asiento])
				
				changed = true
				return
			}
		})

		if (arrAux.length !== this.global.length) {console.error('BAD: ', arrAux); return}

		this.global = [...arrAux]
		this.dispatchChange()
	}

	static insert (fecha, detalle, arrayCuentas) {
		let asiento = []

		arrayCuentas.forEach((cuenta, index) => {
			const isDebt = cuenta.debe !== 0

			asiento.push([
				index===0? fecha : '',
				cuenta.cuenta,
				cuenta.folio,
				'',
				isDebt? cuenta.debe : '',
				!isDebt? cuenta.haber : ''
			])

			cuenta.subcuentas.forEach(subcuenta => {
				asiento.push([
					'',
					subcuenta.subcuenta,
					'',
					subcuenta.parcial,
					'',
					''
				])
			})
		})
		asiento.push(['',detalle,'','','',''])
		
		this.global.push([...asiento])

		//* Ordenar el array
		this.sort()

		this.dispatchChange()
	}

	static fromSession (regstr) {
		this.reset()

		regstr.split(';').forEach(asientoString => {
			let asiento = [], arrayFila = []
			asientoString.split(',').forEach(value => {
				arrayFila.push(value)
				if (arrayFila.length === 6) {
					asiento.push(arrayFila)
					arrayFila = []
				}
			})

			this.push([...asiento])
		})

		this.sort()
		this.dispatchChange()
	}

	static remove (index) {
		this.global.splice(index, 1)

		this.dispatchChange()
	}

	static getBalances () {
		let debe = 0, haber = 0

		this.global.forEach(asiento => {
			asiento.forEach(fila => {
		
				debe += +fila[4]
				haber += +fila[5]
			})
		})

		return {debe, haber}
	}

	static dispatchChange () {
		//* Dispatch event
		window.dispatchEvent(this.regChange)
	}
}