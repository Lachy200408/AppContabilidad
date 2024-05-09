import { setListeners } from "./listeners.js"
import { getNumErrors } from "./validations.js"

window.onload = () => {
  const form = document.querySelector("body>form")

  form.addEventListener("submit", submitForm, false)

  setListeners()
}

function submitForm(event) {
  event.preventDefault()
  const form = document.querySelector("body>form")

  //* Validar las fechas
  let numErrors = getNumErrors(form.fecha.value)
  if (numErrors > 0) return
  const fecha = String(form.fecha.value)

  //* Validar el detalle
  numErrors = getNumErrors(form.detalle.value)
  if (numErrors > 0) return
  const detalle = form.detalle.value

  //* Validar las cuentas con las de la base de datos de la API

	//* Tomar valores de cuentas
  const arrayCuentas = Array.from(document.querySelector("body>form>fieldset>ul").children).map((li) => {
    const liArray = Array.from(li.children)
    const cuenta = liArray[0].value

    let debe = liArray[1].lastElementChild.value,
		haber = liArray[2].lastElementChild.value

		debe = (debe !== '')? '$' + parseFloat(debe).toFixed(2) : ''
  	haber = (haber !== '')? '$' + parseFloat(haber).toFixed(2) : ''
    
		const arraySubcuentas = Array.from(liArray[3].children[1].children).map((_li) => {
			const subcuenta = _li.children[0].value
			const parcial = '$' + parseFloat(_li.children[1].firstElementChild.value).toFixed(2)

			return {
				subcuenta: subcuenta,
				parcial: parcial,
			}
    })

    return {
      cuenta: cuenta,
      debe: debe,
      haber: haber,
      subcuentas: arraySubcuentas,
    }
  })

  console.log(arrayCuentas);
}
