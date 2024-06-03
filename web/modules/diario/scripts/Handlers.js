import { Diario } from "./Diario.js"

class HandlerFunctions {
	//* Función controladoras del formulario
	static modifyCuentas (event) {
		event.preventDefault()

		const isCuenta = !String(event.target.id).includes("Sub")
		const itemKind = isCuenta ? "cuenta" : "subcuenta"

		//* Selecciono el elemento correcto dependiendo del boton
		const list = isCuenta
			? document.querySelector(".form-diario>fieldset>ul")
			: event.target.parentElement.children[1]

		//* Html de los items
		const htmlCuenta = `
			<fieldset class="btn-group mb-3 d-flex justify-content-end align-items-center gap-2 btn-reorder-container">
				<button class="btn bg-primary flex-grow-0 border border-1 rounded-3 btn-reorder-up" style="clip-path: polygon(0px 32px, 16px 0px, 32px 32px); width: 32px; height: 32px;"></button>
				<button class="btn bg-primary flex-grow-0 border border-1 rounded-3 btn-reorder-down" style="clip-path: polygon(0px 0px, 32px 0px, 16px 32px); width: 32px; height: 32px;"></button>
			</fieldset>
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
		html.className = itemKind + ((isCuenta)? " cuenta row list-unstyled mb-5 border-primary rounded-3 border p-3 shadow" : " list-unstyled")
		html.innerHTML = isCuenta? htmlCuenta : htmlSubCuenta

		if (event.target.innerText === "+") {
			list.appendChild(html)
		}
		else {
			const length = list.children.length

			//* Desactivar boton cuando queden dos cuentas y 0 subcuentas
			if ((length === 2 && isCuenta) || (length === 0 && !isCuenta)) return

			list.children[length - 1].remove()
		}

		//* Resetear los listeners
		Diario.Listeners.reset()
	}

	static reorderCuentas (event) {
		event.preventDefault()

		const li = event.target.parentElement.parentElement,
					ul = li.parentElement,
					movement = event.target.classList.contains('btn-reorder-up')? 'up' : 'down'
		let arrayLi = []

		//* Variable que indentifica si se produjo en cambio hacia abajo
		let isDown = false
		//* Tomar todos los li de la ul
		Array.from(ul.children).forEach((_li, index, arr) => {
			if (isDown) {
				isDown = false
				return
			}

			arrayLi.push(_li)

			if ((_li===li && index===0 && movement==='up') || (_li===li && index===arr.length-1 && movement==='down')) return
			
			if (_li===li && movement==='up') {
				arrayLi.pop()
				const auxLi = arrayLi[index-1]
				arrayLi[index-1] = li
				arrayLi.push(auxLi)

				return
			}
			
			if (_li===li && movement==='down') {
				arrayLi.pop()
				arrayLi.push(arr[index+1])
				arrayLi.push(li)
				isDown = true

				return
			}
		})

		ul.innerHTML = ''
		
		arrayLi.forEach(_li => ul.append(_li))
	}

	static limpiarForm () {
		document.querySelectorAll('form input').forEach(inp => inp.value = '')
		document.querySelector('textarea').value = ''
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
		const form = document.querySelector(".form-diario")

		//* Tomar valores del formulario
		Diario.ArrayCuentas.load()
		const fecha = String(form.fecha.value)
		const detalle = form.detalle.value

		//* Validar
		const err = Diario.Validations.init(
			fecha,
			detalle,
			[...Diario.ArrayCuentas.get()]
		)
		if (err) {
			alert('Ha ocurrido un problema: \n' + err)
			return
		}

		//* Formar el registro
		Diario.Asientos.insert(
			fecha,
			detalle,
			[...Diario.ArrayCuentas.get()]
		)

		alert('Se ha registrado exitosamente.')
	}

	//* Funciones controladoras de la hoja de la tabla
	static toggleHoja (event) {
		const boton = event.target
		boton.innerText = (boton.innerText === 'Ver Hoja')? 'Ver Formulario' : 'Ver Hoja'
		
		if (boton.innerText === 'Ver Formulario') document.querySelector('.limpiar-form').classList.add('d-none')
		else document.querySelector('.limpiar-form').classList.remove('d-none')

		const vistas = [document.querySelector('.form-diario'), document.querySelector('.hoja-diario')]
		vistas.forEach(vista => {
			if (vista.classList.contains('d-none')) vista.classList.remove('d-none')
			else vista.classList.add('d-none')
		})

		Diario.Listeners.reset()
	}

	static limpiarHoja() {
		Diario.Reset.hojaDiario()
	}

	static descargarHoja() {
		if (!Diario.Asientos.get().length>0) return
		
		fetch('https://api-app-contabilidad.onrender.com/downloadBook', {
			method: 'POST',
			body: Diario.Asientos.get().join(';')
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
		
		Diario.Asientos.remove(currentNumOp-1)
		Diario.CuentaFolio.remove([...Diario.Asientos.get()])
	}

	static reorderAsientos (event) {
		const index = +event.target.parentElement.parentElement.children[1].innerText.slice(-1),
					movement = event.target.classList.contains('btn-reorder-asiento-up')? 'up' : 'down'
		
		Diario.Asientos.reorder(index-1, (movement==='up')? index-2 : index)
	}

	static insertFolio (event) {
		const value = event.target.value,
					folio = Diario.CuentaFolio.getFolio(value)

		if (folio) event.target.parentElement.nextElementSibling.lastElementChild.value = folio
	}
}

export class Handlers extends HandlerFunctions{
	static form = super.submitForm
	static cuentas = super.modifyCuentas
	static reCuentas = super.reorderCuentas
	static limpiar = super.limpiarForm
	static saldos = super.handlerBalances
	static chHoja = super.toggleHoja
	static clHoja = super.limpiarHoja
	static dlHoja = super.descargarHoja
	static rmBtn = super.removeAsiento
	static reBtn = super.reorderAsientos
	static inFolio = super.insertFolio
}