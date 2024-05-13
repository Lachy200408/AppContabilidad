import { setListeners } from "./listeners.js"
import { initValidations } from "./validations.js"
import { globalObj } from "./globalObj.js"
import { sortAndPrintTable } from "./sortAndPrintTable.js"

window.onload = () => {
	//* Recuperar la tabla cuando se recarga
	if (sessionStorage.getItem('registroGlobal')) {
		globalObj.resetRegGlobal()

		sessionStorage.getItem('registroGlobal').split(';').forEach(asientoString => {
			let asiento = [], arrayFila = []
			asientoString.split(',').forEach(value => {
				arrayFila.push(value)
				if (arrayFila.length === 6) {
					asiento.push(arrayFila)
					arrayFila = []
				}
			})

			globalObj.registroGlobal.push([...asiento])
		})
		
		sortAndPrintTable([...globalObj.registroGlobal])
		calcTotales()
	}

  setListeners()
}

export function submitForm(event) {
  event.preventDefault()
  const form = document.querySelector("body>form")

	//* Tomar valores del formulario
  const arrayCuentas = globalObj.getArrayCuentas()
  const fecha = String(form.fecha.value)
  const detalle = form.detalle.value

	//* Validar
	if (initValidations(fecha, detalle, arrayCuentas)) return

	//* Formar el registro
	const asiento = globalObj.getAsiento(fecha, detalle, arrayCuentas)

	//* Guardar el registro
	globalObj.registroGlobal.push([...asiento])
	sessionStorage.setItem('registroGlobal', globalObj.registroGlobal.join(';'))
	calcTotales()

	//* Ordenarlo y llevarlo a la tabla
	sortAndPrintTable([...globalObj.registroGlobal], () => {
		alert('Se ha registrado exitosamente.')
	})
}

export function calcTotales() {
	let debe = 0, haber = 0

	globalObj.registroGlobal.forEach(asiento => {
		asiento.forEach(fila => {
			debe += (fila[4] !== '')? +fila[4] : 0
			haber += (fila[5] !== '')? +fila[5] : 0
		})
	})

	globalObj.setDebeHaber(debe, haber)

	const tabla = document.querySelector('body>table>tbody')
	tabla.lastElementChild.children[4].innerHTML = '$'+debe.toFixed(2)
	tabla.lastElementChild.children[5].innerHTML = '$'+haber.toFixed(2)
}
