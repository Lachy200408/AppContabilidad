import { modifyCuentas, handlerBalances } from "./handlers.js"

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
}

 export function resetListeners() {
  removeListeners()
  setListeners()
}