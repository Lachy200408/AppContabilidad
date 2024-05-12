import { setListeners } from "./listeners.js"
import { getNumErrors } from "./validations.js"
import { getTableBody } from "./tableBody.js"
import { globalObj } from "./globalObj.js"

window.onload = () => {
	//* Recuperar la tabla cuando se recarga
	if (sessionStorage.getItem('registroGlobal')) {
		globalObj.resetRegGlobal()

		sessionStorage.getItem('registroGlobal').split(';').forEach(asientoString => {
			let asiento = [], arrayFila = []
			asientoString.split(',').forEach((value, index) => {
				arrayFila.push(value)
				if (arrayFila.length === 6) {
					asiento.push(arrayFila)
					arrayFila = []
				}
			})

			globalObj.registroGlobal.push([...asiento])

			const tabla = document.querySelector('body>table>tbody')
			let filaTotales = tabla.lastElementChild
			filaTotales.remove()

			getTableBody(asiento).forEach(row => {
				tabla.append(row)
			})

			tabla.append(filaTotales)
			calcTotales()
		})
	}

  setListeners()
}

export function submitForm(event) {
  event.preventDefault()
  const form = document.querySelector("body>form")

  //* Validar las fechas
  let numErrors = getNumErrors(form.fecha.value, 'fecha')
  if (numErrors > 0) return
  const fecha = String(form.fecha.value)

  //* Validar el detalle
  numErrors = getNumErrors(form.detalle.value, 'detalle')
  if (numErrors > 0) return
  const detalle = form.detalle.value

	//* Variable para validar los saldos
	let saldos = [
		globalObj.totalDebe,
		globalObj.totalHaber
	]

	//* Tomar valores de cuentas
  const arrayCuentas = Array.from(document.querySelector("body>form>fieldset>ul").children).map((li) => {
    const liArray = Array.from(li.children)
    const cuenta = liArray[0].value
		const folio = +liArray[1].lastElementChild.value

    let debe = +liArray[2].lastElementChild.value,
		haber = +liArray[3].lastElementChild.value

		saldos[0] += debe
		saldos[1] += haber

		console.log((saldos[0]===debe), (saldos[1]===haber), saldos, debe, haber)

		debe = (debe !== 0)? ((saldos[0]===debe)? '$' : '') + parseFloat(debe).toFixed(2) : ''
  	haber = (haber !== 0)? ((saldos[1]===haber)? '$' : '') + parseFloat(haber).toFixed(2) : ''
    
		const arraySubcuentas = Array.from(liArray[4].children[1].children).map((_li) => {
			const subcuenta = _li.children[0].value
			const parcial = '$' + parseFloat(_li.children[1].firstElementChild.value).toFixed(2)

			return {
				subcuenta: subcuenta,
				parcial: parcial,
			}
    })

    return {
      cuenta: cuenta,
			folio: folio,
      debe: debe,
      haber: haber,
      subcuentas: arraySubcuentas,
    }
  })

	//* Validar los saldos
	numErrors = getNumErrors(saldos, 'saldos')
	if (numErrors > 0) return

	//* Validar folios
	numErrors = getNumErrors(arrayCuentas, 'folios')
	if (numErrors > 0) return

	//* Validar saldos subcuentas
	numErrors = getNumErrors(arrayCuentas, 'saldosSubcuentas')
	if (numErrors > 0) return

	//* Formar el registro
	let asiento = []
	arrayCuentas.forEach((cuenta, index) => {
		const isDebt = cuenta.debe!==''
		let filaAsiento = new Array()

		if (index===0) filaAsiento.push(fecha)
		else filaAsiento.push('')
		
		filaAsiento.push(cuenta.cuenta)
		filaAsiento.push(cuenta.folio)
		filaAsiento.push('')
		
		if (isDebt) filaAsiento.push(cuenta.debe)
		else filaAsiento.push('')
		
		if (isDebt) filaAsiento.push('')
		else filaAsiento.push(cuenta.haber)

		asiento.push(filaAsiento)

		cuenta.subcuentas.forEach(subcuenta => {
			filaAsiento = []
			filaAsiento.push('')
			
			if (isDebt) filaAsiento.push(subcuenta.subcuenta)
			else filaAsiento.push(subcuenta.subcuenta)
			
			filaAsiento.push('')
			filaAsiento.push(subcuenta.parcial)
			filaAsiento.push('')
			filaAsiento.push('')

			asiento.push(filaAsiento)
		})
	})
	asiento.push(['',detalle,'','','',''])

	//* Llevarlo a la tabla
  const tabla = document.querySelector('body>table>tbody')
	let filaTotales = tabla.lastElementChild
	filaTotales.remove()

	getTableBody(asiento).forEach(row => {
		tabla.append(row)
	})

	tabla.append(filaTotales)
	alert('Se ha registrado exitosamente.')

	//* Guardar el registro
	globalObj.registroGlobal.push([...asiento])
	sessionStorage.setItem('registroGlobal', globalObj.registroGlobal.join(';'))
	calcTotales()
}

export function calcTotales() {
	let debe = 0, haber = 0

	globalObj.registroGlobal.forEach(asiento => {
		asiento.forEach(fila => {
			debe += (fila[4] !== '')? (fila[4].charAt(0) === '$')? parseFloat(fila[4].slice(1)) : parseFloat(fila[4]) : 0
			haber += (fila[5] !== '')? (fila[5].charAt(0) === '$')? parseFloat(fila[5].slice(1)) : parseFloat(fila[5]) : 0
		})
	})

	globalObj.setDebeHaber(debe, haber)

	const tabla = document.querySelector('body>table>tbody')
	tabla.lastElementChild.children[4].innerHTML = '$'+debe.toFixed(2)
	tabla.lastElementChild.children[5].innerHTML = '$'+haber.toFixed(2)
}
