import { globalObj } from "./globalObj.js"

//* Funciones de validacion

function validateDate(fecha) {
  const ymd = fecha.split("-").map((num) => parseInt(num))
  
	const fechaActual = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  }
  const resultado = {
    year: "",
    month: "",
    day: "",
  }

  if (ymd[0] < 2000 || ymd[0] > fechaActual.year) resultado.year = "El año está incorrecto"
  else resultado.year = "ok"

  if (ymd[1] > fechaActual.month && ymd[0] >= fechaActual.year) resultado.month = "El mes está incorrecto"
  else resultado.month = "ok"

  if (ymd[2] > fechaActual.day && ymd[1] >= fechaActual.month) resultado.day = "El día está incorrecto"
  else resultado.day = "ok"

  return resultado
}

function validateDetail(detalle) {
  const resultado = {
    malRedaccion: "",
    inconsistencia: "",
  }

  if (detalle.includes("egistrando")) resultado.malRedaccion = "ok"
  else resultado.malRedaccion = 'Los detalles están escritos incorrectamente. Debe iniciar con "Registrando".'

  if (detalle.split(" ").length > 3) resultado.inconsistencia = "ok"
  else resultado.inconsistencia = "Argumenta un poco más los detalles."

  return resultado
}

function validateBalances(arrayBalances) {
	const resultado = {
		igualdad: ''
	}

	if (arrayBalances[0] === arrayBalances[1]) resultado.igualdad = 'ok'
	else resultado.igualdad = 'El saldo del debe no cuadra con el haber.'

	return resultado
}

function validateFolios(arrayCuentas) {
	let aux = arrayCuentas.map(_cuenta => {
		return {cuenta: _cuenta.cuenta, folio: _cuenta.folio}
	})

	let resultado = { message: globalObj.thereIsFolioRepeated(aux) }

	return resultado
}

function validateBalancesSub(arrayCuentas) {
	const resultado = {
		message: 'ok'
	}

	arrayCuentas.forEach(cuenta => {
		const saldo = (cuenta.debe !== '$0.00')? parseFloat(cuenta.debe.slice(1)) : parseFloat(cuenta.haber.slice(1))

		let totalParcial = 0
		cuenta.subcuentas.forEach(subcuenta => {
			totalParcial += parseFloat(subcuenta.parcial.slice(1))
		})

		if (saldo !== totalParcial && cuenta.subcuentas.length !== 0) resultado.message = `El saldo de las subcuentas de la cuenta: ${cuenta.cuenta} y el saldo de esta no son iguales.`
	})

	return resultado
}

function displayModal(text) {
  alert("Ha ocurrido un problema en su formulario:\n" + text)
}

export function getNumErrors (item, concepto) {
	let validacion
	if (concepto === 'detalle') validacion = validateDetail(item)
	else if (concepto === 'saldos') validacion = validateBalances(item)
	else if (concepto === 'folios') validacion = validateFolios(item)
	else if (concepto === 'saldosSubcuentas') validacion = validateBalancesSub(item)
	else validacion = validateDate(item)

	let errores = Object.values(validacion).filter(
    (message) => message !== "ok"
  )

	if (errores.length != 0) displayModal(errores.join(''))
	return errores.length
}