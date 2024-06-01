import { Diario } from "./Diario.js"

export class Reset {
	static hojaDiario () {
		Diario.Tabla.reset()
		Diario.Asientos.reset()
		Diario.ArrayCuentas.reset()
		Diario.CuentaFolio.reset()
	}
}