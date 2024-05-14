import { modifyCuentas, handlerBalances, toggleHoja, limpiarHoja, descargarHoja } from "./handlers.js"
import { submitForm } from "./index.js"
import { globalObj } from "./globalObj.js"

//* Funciones de listeners

export function setListeners() {
	//* Colocar listener de formulario
	document.querySelector('body>form').addEventListener('submit', submitForm, false)
  //* Colocar listeners de botones
  document.querySelectorAll("fieldset button").forEach((btn) => {
    btn.addEventListener("click", modifyCuentas, false)
  })
  //* Colocar listeners de inputs numericos
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.addEventListener("input", handlerBalances, false)
    input.addEventListener("change", handlerBalances, false)
  })
	//* Colocar listener de boton de verHoja
	document.querySelector('body>button').addEventListener('click', toggleHoja, false)
	//* Colocar listener de boton de limpiarHoja
	document.querySelector('body>table>tbody>tr>td>button:first-child').addEventListener('click', limpiarHoja, false)
	//* Colocar listener de boton de descargarHoja
	document.querySelector('body>table>tbody>tr>td>button:nth-child(2)').addEventListener('click', descargarHoja, false)
	//* Colocar listener de boton de removeAsiento
	document.querySelectorAll('body>table>tbody button.btn-close')?.forEach(btn => {
		btn.addEventListener('click', globalObj.removeAsiento.handler, false)
	})
}

function removeListeners() {
	//* Quitar listener de formulario
	document.querySelector('body>form').removeEventListener('submit', submitForm)
  //* Quitar listeners de botones
  document.querySelectorAll("fieldset button").forEach((btn) => {
    btn.removeEventListener("click", modifyCuentas)
  })
  //* Quitar listeners de inputs numericos
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.removeEventListener("input", handlerBalances)
  })
	//* Quitar listener de boton de verHoja
	document.querySelector('body>button').removeEventListener('click', toggleHoja)
	//* Quitar listener de boton de limpiarHoja
	document.querySelector('body>table>tbody>tr>td>button:first-child').removeEventListener('click', limpiarHoja)
	//* Quitar listener de boton de descargarHoja
	document.querySelector('body>table>tbody>tr>td>button:nth-child(2)').addEventListener('click', descargarHoja)
	//* Remove listener de boton de removeAsiento
	document.querySelectorAll('body>table>tbody button.btn-close')?.forEach(btn => {
		btn.addEventListener('click', globalObj.removeAsiento.handler)
	})
}

 export function resetListeners() {
  removeListeners()
  setListeners()
}