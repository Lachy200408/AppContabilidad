import { CuentaFolio } from "./CuentaFolio.js"

export class Validations {
	static validateDate(fecha) {
		const ymd = fecha.split("-").map((num) => parseInt(num)),
					fechaActual = {
						year: new Date().getFullYear(),
						month: new Date().getMonth() + 1,
						day: new Date().getDate(),
					},
					resultado = {year: "ok", month: "ok", day: "ok"}

		if (ymd[0] < 2000 || ymd[0] > fechaActual.year) resultado.year = "El año está incorrecto"
		if (ymd[1] > fechaActual.month && ymd[0] >= fechaActual.year) resultado.month = "El mes está incorrecto"
		if (ymd[2] > fechaActual.day && ymd[1] >= fechaActual.month && ymd[0] >= fechaActual.year) resultado.day = "El día está incorrecto"

		return resultado
	}

	static validateDetail(detalle) {
		const resultado = {malRedaccion: "ok", inconsistencia: "ok"}

		if (!detalle.includes("egistrando")) resultado.malRedaccion = 'Los detalles están escritos incorrectamente. Debe iniciar con "Registrando".'
		if (!detalle.split(" ").length > 3) resultado.inconsistencia = "Argumenta un poco más los detalles."

		return resultado
	}

	static validateBalances(arrayCuentas) {
		const resultado = { igualdad: 'ok' }

		let arrayBalances = [0,0]
		arrayCuentas.forEach(cuenta => {
			arrayBalances[0] += cuenta.debe
			arrayBalances[1] += cuenta.haber
		})

		if (arrayBalances[0] !== arrayBalances[1]) resultado.igualdad = 'El saldo del debe no cuadra con el haber.'

		return resultado
	}

	static validateFolios(arrayCuentas) {
		const arrayPares = arrayCuentas.map(_cuenta => ({cuenta: _cuenta.cuenta, folio: _cuenta.folio})),
					arrayAux =	[...arrayPares],
					resultado = { message: 'ok' }

		for (let i=0; i<arrayPares.length; i++) {
			const par = arrayPares[i]
			for (const j of arrayAux) {
				if (par.cuenta===j.cuenta && par.folio!==j.folio) {
					resultado.message = `Escribiste la cuenta ${par.cuenta} con dos folios distintos. Arréglalo.`
				} 
				else if (par.cuenta!==j.cuenta && par.folio===j.folio) {
					resultado.message = `Escribiste las cuentas ${par.cuenta} y ${j.cuenta} con el mismo folio. Arréglalo.`
				}
			}

			for (const j of CuentaFolio.get()) {
				if (par.cuenta===j.cuenta && par.folio!==j.folio) {
					resultado.message = `La cuenta ${par.cuenta} ya tiene el folio ${j.folio} en el diario.`
				} 
				else if (par.cuenta!==j.cuenta && par.folio===j.folio) {
					resultado.message = `La cuenta ${j.cuenta} ya tiene el folio ${j.folio} en el diario.`
				}
				else if (par.cuenta===j.cuenta && par.folio===j.folio) {
					break
				}
			}
			if (resultado.message==='ok') CuentaFolio.push({...par})
			arrayAux.shift()
		}

		return resultado
	}

	static validateBalancesSub(arrayCuentas) {
		const resultado = { message: 'ok' }

		arrayCuentas.forEach(cuenta => {
			const saldo = (cuenta.debe !== 0)? cuenta.debe : cuenta.haber

			let totalParcial = 0
			cuenta.subcuentas.forEach(subcuenta => {
				totalParcial += subcuenta.parcial
			})

			if (saldo !== totalParcial && cuenta.subcuentas.length !== 0) resultado.message = `El saldo de las subcuentas de la cuenta: ${cuenta.cuenta} y el saldo de esta no son iguales.`
		})

		return resultado
	}
	
	static getErrors (item, concepto='') {
		let validacion
		if (concepto === 'detalle') validacion = this.validateDetail(item)
		else if (concepto === 'saldos') validacion = this.validateBalances(item)
		else if (concepto === 'folios') validacion = this.validateFolios(item)
		else if (concepto === 'saldosSubcuentas') validacion = this.validateBalancesSub(item)
		else validacion = this.validateDate(item)

		return validacion
	}

	static init (fecha, detalle, arrayCuentas) {
		let errors = [], validado = '', conceptos = ['', 'detalle', 'saldos', 'folios', 'saldosSubcuentas']

		conceptos.forEach(concepto => {
			if (concepto === '') validado = this.getErrors(fecha)
			else if (concepto === 'detalle') validado = this.getErrors(detalle, concepto)
			else validado = this.getErrors(arrayCuentas, concepto)

			Object.values(validado).forEach(value => {
				if (value!=='ok') errors.push(value)
			})
		})

		return errors.join('\n')
	}
}