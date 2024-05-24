import { setListeners } from "./listeners.js"
import { initValidations } from "./validations.js"
import { globalObj } from "./globalObj.js"
import { sortAndPrintTable } from "./sortAsientos.js"
import { Tabla } from "./Tabla.js"

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
		Tabla.calcTotales([...globalObj.registroGlobal])
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
	if (initValidations(fecha, detalle, [...arrayCuentas])) return

	//* Formar el registro
	const asiento = globalObj.getAsiento(fecha, detalle, arrayCuentas)

	//* Guardar el registro
	globalObj.registroGlobal.push([...asiento])
	sessionStorage.setItem('registroGlobal', globalObj.registroGlobal.join(';'))

	//* Ordenarlo y llevarlo a la tabla
	Tabla.insert([...globalObj.registroGlobal], () => alert('Se ha registrado exitosamente.'))
	Tabla.calcTotales([...globalObj.registroGlobal])
}
