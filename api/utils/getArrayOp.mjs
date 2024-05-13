export function getArrayOp (body) {
	body = body.toString()
	let arrayOperaciones = []

	//* Conformo el array de la request
	body.split(';').forEach((asientoString, index) => {
		let asiento = [['',`Operación - No.${index+1}`,'','','','']],
				arrayFila = []
		asientoString.split(',').forEach(value => {
			if (arrayFila.length===2 && value!=='') value = +value
			if (arrayFila.length===4 && value!=='') value = +value
			if (arrayFila.length===5 && value!=='') value = +value

			arrayFila.push(value)
			if (arrayFila.length === 6) {
				asiento.push(arrayFila)
				arrayFila = []
			}
		})

		let isDebt = false
		asiento = asiento.map(fila => {
			isDebt = (fila[4]!=='')? true : (fila[5]!=='')? false : isDebt
			return fila.map((value, index) => {
				if (index===1) {
				 if (fila[3]!=='' && isDebt) return '  '+value
				 if (fila[5]!=='') return '    '+value
				 if (fila[3]!=='' && !isDebt) return '      '+value
				}
				return value
			})
		})

		arrayOperaciones.push(asiento)
	})
	
	return arrayOperaciones
}