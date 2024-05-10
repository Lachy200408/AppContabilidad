import { setListeners } from "./listeners.js"
import { getNumErrors } from "./validations.js"
import { getArrayReg } from "./regs.js"

window.onload = () => {
  const form = document.querySelector("body>form")

  form.addEventListener("submit", submitForm, false)

  setListeners()
}

function submitForm(event) {
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
	let saldos = [0,0]

	//* Tomar valores de cuentas
  const arrayCuentas = Array.from(document.querySelector("body>form>fieldset>ul").children).map((li) => {
    const liArray = Array.from(li.children)
    const cuenta = liArray[0].value
		const folio = +liArray[1].lastElementChild.value

    let debe = +liArray[2].lastElementChild.value,
		haber = +liArray[3].lastElementChild.value

		saldos[0] += debe
		saldos[1] += haber

		debe = (debe !== '')? '$' + parseFloat(debe).toFixed(2) : ''
  	haber = (haber !== '')? '$' + parseFloat(haber).toFixed(2) : ''
    
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

	getArrayReg(fecha, arrayCuentas, detalle).forEach(row => {
  	document.querySelector('body>table').append(row)
	})
	alert('Se ha registrado exitosamente.')
}
