export function getArrayOp (body) {
	body = body.toString()
	let arrayOperaciones = []

	//* Conformo el array de la request
	body.split(';').forEach((asientoString, index) => {
		let asiento = [['',`Operación - No.${index+1}`,'','','','']],
				arrayFila = []
		asientoString.split(',').forEach(value => {
			arrayFila.push(value)
			if (arrayFila.length === 6) {
				asiento.push(arrayFila)
				arrayFila = []
			}
		})
		arrayOperaciones.push(asiento)
	})
	
	return arrayOperaciones
}