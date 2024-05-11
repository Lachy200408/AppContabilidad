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
	setCuentaFolio: (value) => {
		globalObj.cuentaFolio = value
	},
	resetCuentaFolio: () => {
		globalObj.cuentaFolio = []
	}
}