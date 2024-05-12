const jsonPrueba = [
	{
		cuenta: 'Efectivo en caja',
		folio: 2
	},
	{
		cuenta: 'Ventas',
		folio: 3
	}
]

const globalObj = {
	cuentaFolio: [
		{
			cuenta: 'Efectivo en banco',
			folio: 1
		},
		{
			cuenta: 'Efectivo en caja',
			folio: 2
		}
	],
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

function validateFolios(arrayCuentas) {
	let aux = arrayCuentas.map(_cuenta => {
		return {cuenta: _cuenta.cuenta, folio: _cuenta.folio}
	})

	let resultado = { message: globalObj.thereIsFolioRepeated(aux) }

	return resultado
}

let prueba = validateFolios(jsonPrueba)
console.log(prueba)