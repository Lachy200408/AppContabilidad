import { Array } from "./Array.js"

export class ArrayAsientos extends Array {
	//* Evento para calcular los totales
	static regChange = new Event('regChange', {bubbles: false})

	static reset () {
		super.reset()
		this.dispatchChange()
	}

	static sort () {
		if (this.global.length <= 1) return

		mesDias = {
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