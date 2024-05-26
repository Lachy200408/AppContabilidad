export const globalObj = {
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
	}
}
