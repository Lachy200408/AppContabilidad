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
					return `La cuenta ${par.cuenta} tiene dos folios distintos.`
				} 
				else if (par.cuenta!==j.cuenta && par.folio===j.folio) {
					return `La cuenta ${par.cuenta} y ${j.cuenta} tienen el mismo folio.`
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