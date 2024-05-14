import { globalObj } from "./globalObj.js"
import { getTableBody } from "./tableBody.js"
import { resetListeners } from "./listeners.js"

export async function sortAndPrintTable (arrayFilas, callback=()=>{}) {
	arrayFilas.sort((asientoA, asientoB) => {
		let fechaA = 0,
				fechaB = 0,
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

	ordenarPonerEnTabla([...arrayFilas])
	resetListeners()
	callback()
}

function ordenarPonerEnTabla (sortedReg) {
	const tabla = document.querySelector('body>table>tbody'),
				filaTotales = tabla.lastElementChild,
				firstRow = tabla.children[0],
				secondRow = tabla.children[1]

	//* Resetear la tabla
	filaTotales.remove()
	firstRow.remove()
	secondRow.remove()
	tabla.innerHTML = ''
	tabla.append(firstRow)
	tabla.append(secondRow)

	//* Resetear valores
	globalObj.resetRegGlobal()
	globalObj.resetCantRegistros()

	sortedReg.forEach(_asiento => {
		globalObj.registroGlobal.push([..._asiento])
		getTableBody(_asiento).forEach(row => tabla.append(row))
	})
	
	tabla.append(filaTotales)
}