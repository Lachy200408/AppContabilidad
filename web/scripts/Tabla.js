import { sortAsientos } from "./sortAsientos.js"
import { getTableBody } from "./tableBody.js"
import { globalObj } from "./globalObj.js"

export class Tabla {
	//* Elementos
	static html = document.querySelector('body>table>tbody')
	static customRows = [this.html.children[0], this.html.children[1], this.html.lastElementChild]

	//* Resetear valores
	static reset () {
		this.erase()
		this.customRows.forEach(item => this.html.append(item))
	}

	static partialReset () {
		this.erase()
		this.customRows.forEach((item, index) => {
			if (index === 2) return
			this.html.append(item)
		})
	}

	static erase () {
		this.html.innerHTML = ''
	}

	//* Insertar valores
	static insert (array, callback) {
		const sortedReg = sortAsientos([...array])
		
		this.partialReset()

		sortedReg.forEach(_asiento => {
			getTableBody(_asiento).forEach(row => this.html.append(row))
		})

		this.html.append(this.customRows[2])
		callback()
	}

	//* Calcular totales
	static calcTotales(array) {
		let debe = 0, haber = 0

		this.fila_totales.children[4].innerHTML = '$'+debe.toFixed(2)
		this.fila_totales.children[5].innerHTML = '$'+haber.toFixed(2)
	}

}