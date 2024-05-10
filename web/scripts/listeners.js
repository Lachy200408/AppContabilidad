import { modifyCuentas, handlerBalances, toggleHoja, limpiarHoja } from "./handlers.js"
import { submitForm } from "./index.js"

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
	document.querySelector('body>table>tbody>tr>td>button').addEventListener('click', limpiarHoja, false)
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
	//* Colocar listener de boton de limpiarHoja
	document.querySelector('body>table>tbody>tr>td>button').removeEventListener('click', limpiarHoja)
}

 export function resetListeners() {
  removeListeners()
  setListeners()
}