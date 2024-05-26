import { Tbody } from "./Tbody.js"

export class Tabla {
	//* Elementos
	static html
	static customRows

	//* Inicializar
	static init () {
		this.html = document.querySelector('body>table>tbody')
		this.customRows = [this.html.children[0], this.html.children[1], this.html.lastElementChild]
	}

	static isNull () {
		return !(this.html && this.customRows)
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
	static insert (array, balances) {
		this.partialReset()
		Tbody.numOp.reset()

		array.forEach(_asiento => {
			Tbody.get(_asiento).forEach(row => this.html.append(row))
		})

		//* Situar los totales
		this.customRows[2].children[4].innerHTML = '$'+balances.debe.toFixed(2)
		this.customRows[2].children[5].innerHTML = '$'+balances.haber.toFixed(2)
		this.html.append(this.customRows[2])
	}
}
