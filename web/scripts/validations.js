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

function validateBalances(arrayCuentas) {
	const resultado = {
		igualdad: ''
	}

	let arrayBalances = [0,0]
	arrayCuentas.forEach(cuenta => {
		arrayBalances[0] += cuenta.debe
		arrayBalances[1] += cuenta.haber
	})

	if (arrayBalances[0] === arrayBalances[1]) resultado.igualdad = 'ok'
	else resultado.igualdad = 'El saldo del debe no cuadra con el haber.'

	return resultado
}

function validateFolios(arrayCuentas) {
	const aux = arrayCuentas.map(_cuenta => ({cuenta: _cuenta.cuenta, folio: _cuenta.folio}))

	let resultado = { message: globalObj.thereIsFolioRepeated([...aux]) }

	return resultado
}

function validateBalancesSub(arrayCuentas) {
	const resultado = {
		message: 'ok'
	}

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

function displayModal(text) {
  alert("Ha ocurrido un problema en su formulario:\n" + text)
}
 
function getErrors (item, concepto='') {
	let validacion
	if (concepto === 'detalle') validacion = validateDetail(item)
	else if (concepto === 'saldos') validacion = validateBalances(item)
	else if (concepto === 'folios') validacion = validateFolios(item)
	else if (concepto === 'saldosSubcuentas') validacion = validateBalancesSub(item)
	else validacion = validateDate(item)

	return validacion
}

export function initValidations (fecha, detalle, arrayCuentas) {
	let errors = [], validado = '', conceptos = ['', 'detalle', 'saldos', 'folios', 'saldosSubcuentas']

	conceptos.forEach(concepto => {
		if (concepto === '') validado = getErrors(fecha)
		else if (concepto === 'detalle') validado = getErrors(detalle, concepto)
		else validado = getErrors(arrayCuentas, concepto)

		Object.values(validado).forEach(value => {
			if (value!=='ok') errors.push(value)
		})
	})

	if (errors.join('')!=='') displayModal(errors.join('\n'))
	return errors.join('\n')
}