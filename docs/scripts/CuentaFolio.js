import { Array } from "./Array.js"

export class CuentaFolio extends Array{
	static global = []

	static push (par) {
		let hayCuenta = false

		this.global.forEach(_par => {
			if (
				_par.cuenta === par.cuenta &&
				_par.folio === par.folio
			) hayCuenta = true
		})

		if (!hayCuenta) this.global.push({...par})
	}

	static remove (array) {
		let arrayPares = [...this.global], indices = []

		array.forEach(asiento => {
			asiento.forEach(fila => {
				if (!indices.includes(fila[2]) && fila[2]!=='') indices.push(fila[2])
			})
		})

		arrayPares.forEach(_par => {
			if (indices.includes(_par.folio)) return
			else {
				const _index = this.global.findIndex(obj => obj.folio === _par.folio)
				this.global.splice(_index, 1)
			}
		})

		console.log(this.global, indices)
	}
}