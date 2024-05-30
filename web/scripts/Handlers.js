import { Listeners } from "./Listeners.js"
import { ArrayCuentas } from "./ArrayCuentas.js"
import { Validations } from "./Validations.js"
import { ArrayAsientos } from "./ArrayAsientos.js"
import { Tbody } from "./Tbody.js"
import { Reset } from "./Reset.js"
import { CuentaFolio } from "./CuentaFolio.js"

class HandlerFunctions {
	//* Función controladoras del formulario
	static modifyCuentas (event) {
		event.preventDefault()

		const isCuenta = !String(event.target.id).includes("Sub")
		const itemKind = isCuenta ? "cuenta" : "subcuenta"

		//* Selecciono el elemento correcto dependiendo del boton
		const list = isCuenta
			? document.querySelector("body>form>fieldset>ul")
			: event.target.parentElement.children[1]

		//* Html de los items
		const htmlCuenta = `
			<label class="form-label text-primary">
				Cuenta:
				<input name="cuenta" type="text" list="cuentas" required class="mb-2 form-control form-text" placeholder="Cuenta..."/>
			</label>
			<label for="folio" class="col-md-3 mb-2 form-label text-secondary">
				Folio:
				<input type="number" name="folio" required class="form-control" min="1" step="1">
			</label>
			<label class="col-md-3 mb-2 form-label text-secondary">
				Debitando:
				<input
					type="number"
					name="debe"
					placeholder="$0.00"
					step="0.01"
					class="form-control"
				/>
			</label>
			<label class="col-md-3 mb-2 form-label text-secondary">
				Acreditando:
				<input
					type="number"
					name="haber"
					placeholder="$0.00"
					step="0.01"
					class="form-control"
				/>
			</label>

			<details class="container-md">
				<summary class="text-primary">Subcuentas</summary>
				<ul class="container-md"></ul>

				<button name="newSubCuenta" id="newSubCuenta" class="btn btn-secondary px-4 m-2">+</button>
				<button name="removeSubCuenta" id="removeSubCuenta" class="btn btn-secondary px-4 m-2">-</button>
			</details>
		`
		const htmlSubCuenta = `
			<label class="form-label text-secondary">
				Subcuenta:
				<input name="subcuenta" type="text" list="subcuentas" required class="form-control" placeholder="Subcuenta..."/>
			</label>

			<label class="form-label text-secondary">
				Parcial: 
				<input type="number" name="parcial" required class="form-control" placeholder="$0.00" step="0.1"/>
			</label>
		`
		const html = document.createElement("li")
		html.className = itemKind + ((isCuenta)? " list-unstyled row mb-5 border-primary rounded-3 border-1 border-bottom border-end border-start border-top p-2" : " list-unstyled")
		html.innerHTML = isCuenta? htmlCuenta : htmlSubCuenta

		if (event.target.innerText === "+") {
			list.appendChild(html)
		} else {
			const length = list.children.length

			//* Desactivar boton cuando queden dos cuentas y 0 subcuentas
			if ((length === 2 && isCuenta) || (length === 0 && !isCuenta)) return

			list.children[length - 1].remove()
		}

		//* Resetear los listeners
		Listeners.reset()
	}

	static handlerBalances (event) {
		const input = event.target
		
		let element = input.parentElement
		if (element.innerText === "Parcial:" || element.innerText === "Folio:") return
		element =	(element.innerText === "Acreditando:")? element.previousElementSibling : element.nextElementSibling
		element = element.lastElementChild.value = ""
	}

	static submitForm (event) {
		event.preventDefault()
		const form = document.querySelector("body>form")

		//* Tomar valores del formulario
		ArrayCuentas.load()
		const fecha = String(form.fecha.value)
		const detalle = form.detalle.value

		//* Validar
		const err = Validations.init(fecha, detalle, [...ArrayCuentas.get()])
		if (err) {
			alert('Ha ocurrido un problema: \n' + err)
			return
		}

		//* Formar el registro
		ArrayAsientos.insert(fecha, detalle, [...ArrayCuentas.get()])

		alert('Se ha registrado exitosamente.')
	}


	//* Funciones controladoras de la hoja de la tabla
	static toggleHoja (event) {
		const boton = event.target
		boton.innerText = (boton.innerText === 'Ver Hoja')? 'Ver Formulario' : 'Ver Hoja'
		
		const vistas = [document.querySelector('body>form'), document.querySelector('body>table')]
		vistas.forEach(vista => {
			if (vista.classList.contains('d-none')) vista.classList.remove('d-none')
			else vista.classList.add('d-none')
		})

		Listeners.reset()
	}

	static limpiarHoja() {
		Reset.hojaDiario()
	}

	static descargarHoja() {
		if (!ArrayAsientos.get().length>0) return
		
		fetch('https://api-app-contabilidad.onrender.com/downloadBook', {
			method: 'POST',
			body: ArrayAsientos.get().join(';')
		})
		.then(res => res.blob())
		.then(dataBlob => {
			const url = URL.createObjectURL(dataBlob)

			const a = document.createElement('a')
			a.href = url
			a.download = 'Diario.xlsx'
			a.click()
			
			URL.revokeObjectURL(url)
		})
	}

	static removeAsiento (event) {
		const btn = event.target,
					textOperacion = btn.parentElement.nextElementSibling.innerText,
					currentNumOp = textOperacion.charAt(textOperacion.length-1)
		
		ArrayAsientos.remove(currentNumOp-1)
		Tbody.numOp.value--
		CuentaFolio.remove([...ArrayAsientos.get()])
	}

	static insertCuenta (event) {
		const value = event.target.value,
					folio = CuentaFolio.getFolio(value)

		if (folio) event.target.parentElement.nextElementSibling.lastElementChild.value = folio
	}
}

export class Handlers extends HandlerFunctions{
	static form = this.submitForm
	static cuentas = this.modifyCuentas
	static saldos = this.handlerBalances
	static chHoja = this.toggleHoja
	static clHoja = this.limpiarHoja
	static dlHoja = this.descargarHoja
	static rmBtn = this.removeAsiento
	static inCuenta = this.insertCuenta
}