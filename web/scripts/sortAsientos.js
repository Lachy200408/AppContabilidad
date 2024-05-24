export function sortAsientos (arrayOp) {
	mesDias = {
		1: 31,
		2: 59,
		3: 90,
		4: 120,
		5: 151,
		6: 181,
		7: 212,
		8: 243,
		9: 273,
		10: 304,
		11: 334,
		12: 365
	}

	arrayOp.sort((asientoA, asientoB) => {
		let fechaA = 0,
				fechaB = 0

		asientoA[0][0].split('-').forEach((value, index) => {
			if (index===0) fechaA += +value*365
			if (index===1) fechaA += mesDias[+value]
			if (index===2) fechaA += +value
		})
		asientoB[0][0].split('-').forEach((value, index) => {
			if (index===0) fechaB += +value*365
			if (index===1) fechaB += mesDias[+value]
			if (index===2) fechaB += +value
		})

		return fechaA - fechaB
	})

	return [...arrayOp]
}