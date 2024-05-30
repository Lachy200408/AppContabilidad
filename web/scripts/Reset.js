import { Tabla } from "./Tabla.js"
import { ArrayAsientos } from "./ArrayAsientos.js"
import { ArrayCuentas } from "./ArrayCuentas.js"
import { Session } from "./Session.js"
import { Tbody } from "./Tbody.js"
import { CuentaFolio } from "./CuentaFolio.js"

export class Reset {
	static hojaDiario () {
		Tabla.reset()
		Tbody.numOp.reset()
		ArrayAsientos.reset()
		ArrayCuentas.reset()
		Session.regs.reset()
		CuentaFolio.reset()
	}
}