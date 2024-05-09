import { resetListeners } from "./listeners.js"

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
						class="col-lg-6 form-control form-text"
					/>
					<label class="form-label text-secondary">
						Debitando:
						<input
							type="number"
							name="debe"
							id="debe"
							placeholder="$0.00"
							step="0.01"
							class="col-md-3 form-control"
						/>
					</label>
					<label class="form-label text-secondary">
						Acreditando:
						<input
							type="number"
							name="haber"
							id="haber"
							placeholder="$0.00"
							step="0.01"
							class="col-md-3 form-control"
						/>
					</label>

					<details class="row-cols-2">
						<summary class="form-text">Subcuentas</summary>
						<ul class="col-12"></ul>

						<button
							name="newSubCuenta"
							id="newSubCuenta"
							class="btn btn-secondary col-2 m-2"
						>
							+
						</button>
						<button
							name="removeSubCuenta"
							id="removeSubCuenta"
							class="btn btn-secondary col-2 m-2"
						>
							-
						</button>
					</details>
	`
  const htmlSubCuenta = `
		<input type="text" list="subcuentas" required class="form-control"/>

		<label class="form-label">
			Parcial: 
			<input type="number" name="parcial" id="parcial" required class="form-control"/>
		</label>
	`
  const html = document.createElement("li")
  html.className = itemKind + " list-unstyled"
  html.innerHTML = isCuenta ? htmlCuenta : htmlSubCuenta

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

let valor = ''
export function handlerBalances(event) {
  const input = event.target  
	
	//* Validar entrada
	if (input.value === "" && valor.length !== 1) input.value = valor
	valor = input.value
	//* Resetear el contiguo
	let element = input.parentElement
	if (element.innerText === "Parcial:") return
	element =
		element.innerText === "Acreditando:"
			? element.previousElementSibling
			: element.nextElementSibling
	element = element.lastElementChild.value = ""
}