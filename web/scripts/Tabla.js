import { ArrayAsientos } from "./ArrayAsientos.js"
import { Tbody } from "./Tbody.js"

export class Tabla {
	//* Elementos
	static html
	static customRows

	static init () {
		this.html = document.querySelector('body>table>tbody')
		this.customRows = [this.html?.children[0], this.html?.children[1], this.html?.lastElementChild]
	}

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
	static insert (array, callback=()=>{}) {
		this.partialReset()

		array.forEach(_asiento => {
			Tbody.get(_asiento).forEach(row => this.html.append(row))
		})

		this.html.append(this.customRows[2])
		callback()
	}

	//* Calcular totales
	static calcTotales() {
		const {debe, haber} = ArrayAsientos.getBalances()

		this.fila_totales.children[4].innerHTML = '$'+debe.toFixed(2)
		this.fila_totales.children[5].innerHTML = '$'+haber.toFixed(2)
	}
}

//* Event listener de calcular los totales
window.addEventListener('regChange', Tabla.calcTotales, false)
