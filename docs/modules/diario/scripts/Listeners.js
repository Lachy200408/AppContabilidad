import { Diario } from "./Diario.js"

//* Funciones de listeners
export class Listeners {
	static set() {
		//* Colocar listener de formulario
		document.querySelector('.form-diario').addEventListener('submit', Diario.Handlers.form, false)
		//* Colocar listeners de botones
		document.querySelectorAll("fieldset button").forEach(btn => btn.addEventListener("click", Diario.Handlers.cuentas, false))
		//* Colocar listeners de inputs numericos
		document.querySelectorAll('input[type="number"]').forEach(input => input.addEventListener("input", Diario.Handlers.saldos, false))
		//* Colocar listener de boton de verHoja
		document.querySelector('.chHoja').addEventListener('click', Diario.Handlers.chHoja, false)
		//* Colocar listener de boton de limpiarHoja
		document.querySelector('.clHoja').addEventListener('click',  Diario.Handlers.clHoja, false)
		//* Colocar listener de boton de descargarHoja
		document.querySelector('.dlHoja').addEventListener('click', Diario.Handlers.dlHoja, false)
		//* Colocar listener de boton de remover asiento
		document.querySelectorAll('.rmBtn').forEach(btn => btn.addEventListener('click', Diario.Handlers.rmBtn, false))
		//* Colocar listener de los inputs de cuentas
		document.querySelectorAll('input[name="cuenta"]').forEach(inp => inp.addEventListener('blur', Diario.Handlers.inCuenta, false))
	}

	static remove() {
		//* Quitar listener de formulario
		document.querySelector('.form-diario').removeEventListener('submit', Diario.Handlers.form)
		//* Quitar listeners de botones
		document.querySelectorAll("fieldset button").forEach(btn => btn.removeEventListener("click", Diario.Handlers.cuentas))
		//* Quitar listeners de inputs numericos
		document.querySelectorAll('input[type="number"]').forEach(input => input.removeEventListener("input", Diario.Handlers.saldos))
		//* Quitar listener de boton de verHoja
		document.querySelector('.chHoja').removeEventListener('click', Diario.Handlers.chHoja)
		//* Quitar listener de boton de limpiarHoja
		document.querySelector('.clHoja').removeEventListener('click',  Diario.Handlers.clHoja)
		//* Quitar listener de boton de descargarHoja
		document.querySelector('.dlHoja').removeEventListener('click', Diario.Handlers.dlHoja)
		//* Quitar listener de boton de remover asiento
		document.querySelectorAll('.rmBtn').forEach(btn => btn.removeEventListener('click', Diario.Handlers.rmBtn))
		//* Quitar listener de los inputs de cuentas
		document.querySelectorAll('input[name="cuenta"]').forEach(inp => inp.removeEventListener('blur', Diario.Handlers.inCuenta))
	}

	static reset() {
		this.remove()
		this.set()
	}
}