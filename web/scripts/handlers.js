import { resetListeners } from "./listeners.js"
import { calcTotales } from "./index.js"
import { globalObj } from "./globalObj.js"

export function modifyCuentas(event) {
  event.preventDefault()

  const isCuenta = !String(event.target.id).includes("Sub")
  const itemKind = isCuenta ? "cuenta" : "subcuenta"

  //* Selecciono el elemento correcto dependiendo del boton
  const list = isCuenta
    ? document.querySelector("body>form>fieldset>ul")
    : event.target.parentElement.children[1]

  //* Html de los items
  const htmlCuenta = `
		<input
			type="text"
			list="cuentas"
			required
			class="mb-2 form-control form-text"
			placeholder="Cuenta..."
		/>
		<label for="folio" class="col-md-3 mb-2 form-label text-secondary">
			Folio:
			<input type="number" name="folio" id="folio" required class="form-control" min="1" step="1">
		</label>
		<label class="col-md-3 mb-2 form-label text-secondary">
			Debitando:
			<input
				type="number"
				name="debe"
				id="debe"
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
				id="haber"
				placeholder="$0.00"
				step="0.01"
				class="form-control"
			/>
		</label>

		<details class="container-md">
			<summary class="form-text">Subcuentas</summary>
			<ul class="container-md"></ul>

			<button name="newSubCuenta" id="newSubCuenta" class="btn btn-secondary px-4 m-2">+</button>
			<button name="removeSubCuenta" id="removeSubCuenta" class="btn btn-secondary px-4 m-2">-</button>
		</details>
	`
  const htmlSubCuenta = `
		<input type="text" list="subcuentas" required class="form-control" placeholder="Subcuenta..."/>

		<label class="form-label text-secondary">
			Parcial: 
			<input type="number" name="parcial" id="parcial" required class="form-control" placeholder="$0.00"/>
		</label>
	`
  const html = document.createElement("li")
  html.className = itemKind + isCuenta? " list-unstyled row" : " list-unstyled"
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
  resetListeners()
}

export function handlerBalances(event) {
  const input = event.target  
	
	//* Validar entrada
	if (input.value === "" && globalObj.valorInputNum.length !== 1) input.value = globalObj.valorInputNum
	globalObj.setValorInputNum(input.value)
	//* Resetear el contiguo
	let element = input.parentElement
	if (element.innerText === "Parcial:" || element.innerText === "Folio:") return
	element =	(element.innerText === "Acreditando:")? element.previousElementSibling : element.nextElementSibling
	element = element.lastElementChild.value = ""
}

export function toggleHoja(event) {
	const boton = event.target
	boton.innerText = (boton.innerText === 'Ver Hoja')? 'Ver Formulario' : 'Ver Hoja'
	
	const vistas = [document.querySelector('body>form'), document.querySelector('body>table')]
	vistas.forEach(vista => {
		if (vista.classList.contains('d-none')) vista.classList.remove('d-none')
		else vista.classList.add('d-none')
	})

	resetListeners()
}

export function limpiarHoja() {
	const tabla = document.querySelector('body>table>tbody')
	const arrayAux = [
		tabla.children[0],
		tabla.children[1],
		tabla.lastElementChild
	]
	
	tabla.innerHTML = ''
	arrayAux.forEach(item => {
		tabla.append(item)
	})

	globalObj.resetCantRegistros()
	globalObj.resetRegGlobal()
	sessionStorage.clear()
	calcTotales()
}
