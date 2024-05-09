import { setListeners } from "./listeners.js"
import { validateDate, validateDetail, displayModal } from "./validations.js"

window.onload = () => {
  const form = document.querySelector("body>form")

  form.addEventListener("submit", submitForm, false)

  setListeners()
}

function submitForm(event) {
  event.preventDefault()
  const form = document.querySelector("body>form")

  //* Validar las fechas
  const validacionFecha = validateDate(String(form.fecha.value))
  let errores = Object.values(validacionFecha).filter(
    (message) => message !== "ok"
  )
  if (errores.length !== 0) {
    displayModal(errores.join("\n"))
    return
  }
  const fecha = String(form.fecha.value)

  //* Validar el detalle
  const validacionDetalle = validateDetail(form.detalle.value)
  errores = Object.values(validacionDetalle).filter(
    (message) => message !== "ok"
  )
  if (errores.length !== 0) {
    displayModal(errores.join("\n"))
    return
  }
  const detalle = form.detalle.value

  //* Validar las cuentas con las de la base de datos de la API

	//* Tomar valores de cuentas
  const arrayCuentas = Array.from(
    document.querySelector("body>form>fieldset>ul").children
  ).map((li) => {
    const liArray = Array.from(li.children)
    const cuenta = liArray[0].value

    const debe = '$' + parseFloat(liArray[1].lastElementChild.value).toFixed(2)
    const haber = '$' + parseFloat(liArray[2].lastElementChild.value).toFixed(2)
    
		const arraySubcuentas = Array.from(liArray[3].children[1].children).map(
      (_li) => {
        const subcuenta = _li.children[0].value
        const parcial = '$' + parseFloat(_li.children[1].firstElementChild.value).toFixed(2)

        return {
          subcuenta: subcuenta,
          parcial: parcial,
        }
      }
    )

    return {
      cuenta: cuenta,
      debe: debe,
      haber: haber,
      subcuentas: arraySubcuentas,
    }
  })

  console.log(arrayCuentas);
}
