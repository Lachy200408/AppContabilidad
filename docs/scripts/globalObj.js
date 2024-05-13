export const globalObj = {
	registroGlobal: [],
	resetRegGlobal: () => {
		globalObj.registroGlobal = []
	},

	//* Valor de los inputs numéricos
	valorInputNum: '',
	setValorInputNum: (value) => {
		globalObj.valorInputNum = value
	},

	//* Cantidad de operaciones realizadas
	cantRegistros: 1,
	iterCantRegistros: () => {
		return globalObj.cantRegistros++
	},
	resetCantRegistros: () => {
		globalObj.cantRegistros = 1
	},

	//* Lista de cuentas y folios
	cuentaFolio: [],
	resetCuentaFolio: () => {
		globalObj.cuentaFolio = []
	},
	thereIsFolioRepeated: (arrayObj) => {
		const arrayAux = [...arrayObj]

		for (let i=0; i<arrayObj.length; i++) {
			const par = arrayObj[i]
			for (const j of arrayAux) {
				if (par.cuenta===j.cuenta && par.folio!==j.folio) {
					return `Escribiste la cuenta ${par.cuenta} con dos folios distintos. Arréglalo.`
				} 
				else if (par.cuenta!==j.cuenta && par.folio===j.folio) {
					return `Escribiste las cuentas ${par.cuenta} y ${j.cuenta} con el mismo folio. Arréglalo.`
				}
			}

			let hayCuenta = false
			for (const j of globalObj.cuentaFolio) {
				if (par.cuenta===j.cuenta && par.folio!==j.folio) {
					return `La cuenta ${par.cuenta} ya tiene el folio ${j.folio} en el diario.`
				} 
				else if (par.cuenta!==j.cuenta && par.folio===j.folio) {
					return `La cuenta ${j.cuenta} ya tiene el folio ${j.folio} en el diario.`
				}
				else if (par.cuenta===j.cuenta && par.folio===j.folio) {
					hayCuenta = true
					break
				}
			}
			if (!hayCuenta) globalObj.cuentaFolio.push(par)
			arrayAux.shift()
		}
		return 'ok'
	},

	//* Totales de debe y haber
	totalDebe: 0,
	totalHaber: 0,
	setDebeHaber: (debe, haber) => {
		globalObj.totalDebe = debe
		globalObj.totalHaber = haber
	},
	resetDebeHaber: () => {
		globalObj.totalDebe = 0
		globalObj.totalHaber = 0
	},

	//* GetArrayCuentas
	getArrayCuentas: () => {
		return Array.from(document.querySelector("body>form>fieldset>ul").children).map((li) => {
			const liArray = Array.from(li.children),
						cuenta = liArray[0].lastElementChild.value,
						folio = +liArray[1].lastElementChild.value

			let debe = +liArray[2].lastElementChild.value,
					haber = +liArray[3].lastElementChild.value
			
			const arraySubcuentas = Array.from(liArray[4].children[1].children).map((_li) => {
				const subcuenta = _li.children[0].value,
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
	},

	//* Get asiento
	getAsiento: (fecha, detalle, arrayCuentas) => {
		let asiento = []
		arrayCuentas.forEach((cuenta, index) => {
			const isDebt = cuenta.debe !== 0
			let filaAsiento = []

			filaAsiento.push(index===0? fecha : '')
			filaAsiento.push(cuenta.cuenta)
			filaAsiento.push(cuenta.folio)
			filaAsiento.push('')
			filaAsiento.push(isDebt? cuenta.debe : '')
			filaAsiento.push(!isDebt? cuenta.haber : '')
			asiento.push(filaAsiento)

			cuenta.subcuentas.forEach(subcuenta => {
				filaAsiento = []
				filaAsiento.push('')
				filaAsiento.push(subcuenta.subcuenta)
				filaAsiento.push('')
				filaAsiento.push(subcuenta.parcial)
				filaAsiento.push('')
				filaAsiento.push('')
				asiento.push(filaAsiento)
			})
		})
		asiento.push(['',detalle,'','','',''])
		return asiento
	}
}