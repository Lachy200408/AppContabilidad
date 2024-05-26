import { Tabla } from "./Tabla.js"
import { ArrayAsientos } from "./ArrayAsientos.js"
import { ArrayCuentas } from "./ArrayCuentas.js"
import { Session } from "./Session.js"
import { Tbody } from "./Tbody.js"
import { Validations } from "./Validations.js"

export class Reset {
	static hojaDiario () {
		Tabla.reset()
		Tbody.numOp.reset()
		ArrayAsientos.reset()
		ArrayCuentas.reset()
		Session.regs.reset()
		Validations.cuentaFolio.reset()
	}
}