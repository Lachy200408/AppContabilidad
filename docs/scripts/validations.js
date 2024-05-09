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

  if (detalle.split(" ").length > 5) resultado.inconsistencia = "ok"
  else resultado.inconsistencia = "Argumenta un poco más los detalles."

  return resultado
}

function displayModal(text) {
  alert("Ha ocurrido un problema en su formulario:\n" + text)
}

export function getNumErrors (item) {
	let validacion
	if (item.includes(' ')) validacion = validateDetail(item)
	else validacion = validateDate(item)

	let errores = Object.values(validacion).filter(
    (message) => message !== "ok"
  )

	if (errores.length != 0) displayModal(errores.join(''))
	return errores.length
}