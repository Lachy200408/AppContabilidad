import { Handlers } from "./Handlers.js"

//* Funciones de listeners
export class Listeners {
	static set() {
		//* Colocar listener de formulario
		document.querySelector('body>form').addEventListener('submit', Handlers.form, false)
		//* Colocar listeners de botones
		document.querySelectorAll("fieldset button").forEach(btn => btn.addEventListener("click", Handlers.cuentas, false))
		//* Colocar listeners de inputs numericos
		document.querySelectorAll('input[type="number"]').forEach(input => input.addEventListener("input", Handlers.saldos, false))
		//* Colocar listener de boton de verHoja
		document.querySelector('.chHoja').addEventListener('click', Handlers.chHoja, false)
		//* Colocar listener de boton de limpiarHoja
		document.querySelector('.clHoja').addEventListener('click',  Handlers.clHoja, false)
		//* Colocar listener de boton de descargarHoja
		document.querySelector('.dlHoja').addEventListener('click', Handlers.dlHoja, false)
		//* Colocar listener de boton de remover asiento
		document.querySelectorAll('.rmBtn').forEach(btn => btn.addEventListener('click', Handlers.rmBtn, false))
		//* Colocar listener de los inputs de cuentas
		document.querySelectorAll('input[name="cuenta"]').forEach(inp => inp.addEventListener('change', Handlers.inCuenta, false))
	}

	static remove() {
		//* Quitar listener de formulario
		document.querySelector('body>form').removeEventListener('submit', Handlers.form)
		//* Quitar listeners de botones
		document.querySelectorAll("fieldset button").forEach(btn => btn.removeEventListener("click", Handlers.cuentas))
		//* Quitar listeners de inputs numericos
		document.querySelectorAll('input[type="number"]').forEach(input => input.removeEventListener("input", Handlers.saldos))
		//* Quitar listener de boton de verHoja
		document.querySelector('.chHoja').removeEventListener('click', Handlers.chHoja)
		//* Quitar listener de boton de limpiarHoja
		document.querySelector('.clHoja').removeEventListener('click',  Handlers.clHoja)
		//* Quitar listener de boton de descargarHoja
		document.querySelector('.dlHoja').removeEventListener('click', Handlers.dlHoja)
		//* Quitar listener de boton de remover asiento
		document.querySelectorAll('.rmBtn').forEach(btn => btn.removeEventListener('click', Handlers.rmBtn))
		//* Quitar listener de los inputs de cuentas
		document.querySelectorAll('input[name="cuenta"]').forEach(inp => inp.removeEventListener('change', Handlers.inCuenta))
	}

	static reset() {
		this.remove()
		this.set()
	}
}