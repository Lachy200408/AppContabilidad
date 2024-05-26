import { Tabla } from "./Tabla.js"
import { ArrayAsientos } from "./ArrayAsientos.js"
import { ArrayCuentas } from "./ArrayCuentas.js"
import { Session } from "./Session.js"

export class Reset {
	static hojaDiario () {
		Tabla.reset()
		ArrayAsientos.reset()
		ArrayCuentas.reset()
		Session.regs.reset()
	}
}