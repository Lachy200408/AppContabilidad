import { modifyCuentas, handlerBalances, toggleHoja } from "./handlers.js"

//* Funciones de listeners

export function setListeners() {
  //* Colocar listeners de botones
  document.querySelectorAll("fieldset button").forEach((btn) => {
    btn.addEventListener("click", modifyCuentas, false)
  })
  //* Colocar listeners de inputs numericos
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.addEventListener("input", handlerBalances, false)
    input.addEventListener("change", handlerBalances, false)
  })
	//* Listener de boton de verHoja
	document.querySelector('body>button').addEventListener('click', toggleHoja, false)
}

function removeListeners() {
  //* Quitar listeners de botones
  document.querySelectorAll("fieldset button").forEach((btn) => {
    btn.removeEventListener("click", modifyCuentas)
  })
  //* Quitar listeners de inputs numericos
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.removeEventListener("input", handlerBalances)
  })
	//* Listener de boton de verHoja
	document.querySelector('body>button').removeEventListener('click', toggleHoja)
}

 export function resetListeners() {
  removeListeners()
  setListeners()
}