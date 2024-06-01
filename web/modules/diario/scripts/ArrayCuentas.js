import { Array } from "/scripts/Array.js"

export class ArrayCuentas extends Array {
	static global = []

	static load () {
		this.global = window.Array.from(document.querySelector("body>form>fieldset>ul").children).map((li) => {
			const liArray = window.Array.from(li.children),
						cuenta = liArray[0].lastElementChild.value,
						folio = +liArray[1].lastElementChild.value, 
						debe = +liArray[2].lastElementChild.value,
						haber = +liArray[3].lastElementChild.value
			
			const arraySubcuentas = window.Array.from(liArray[4].children[1].children).map((_li) => {
				const subcuenta = _li.children[0].firstElementChild.value,
							parcial = +_li.children[1].firstElementChild.value

				return {
					subcuenta: subcuenta,
					parcial: parcial,
				}
			})

			return {
				cuenta: cuenta,
				folio: folio,
				debe: debe,
				haber: haber,
				subcuentas: arraySubcuentas,
			}
		})
	}
}