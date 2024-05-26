import { setListeners } from "./listeners.js"
import { initValidations } from "./validations.js"
import { Tabla } from "./Tabla.js"
import { ArrayAsientos } from "./ArrayAsientos.js"
import { Session } from "./Session.js"
import { ArrayCuentas } from "./ArrayCuentas.js"

window.onload = () => {
	//* Recuperar la tabla cuando se recarga
	const sessionReg = Session.regs.get()
	if (sessionReg) {
		ArrayAsientos.fromSession(sessionReg)
		Tabla.insert([...ArrayAsientos.get()])
	}

  setListeners()
}

export function submitForm(event) {
  event.preventDefault()
  const form = document.querySelector("body>form")

	//* Tomar valores del formulario
	ArrayCuentas.load()
	const fecha = String(form.fecha.value)
  const detalle = form.detalle.value

	//* Validar
	if (initValidations(fecha, detalle, [...ArrayCuentas.get()])) return

	//* Formar el registro
	ArrayAsientos.insert(fecha, detalle, [...ArrayCuentas.get()])

	//* Guardar el registro
	Session.regs.save(ArrayAsientos.get().join(';'))

	//* Ordenarlo y llevarlo a la tabla
	Tabla.insert([...ArrayAsientos.get()], () => alert('Se ha registrado exitosamente.'))
}
