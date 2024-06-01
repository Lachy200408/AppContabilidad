import { Global } from "/scripts/Global.js"
import { Tabla } from "./Tabla.js"
import { Listeners } from "./Listeners.js"
import { Handlers } from "./Handlers.js"
import { ArrayCuentas } from "./ArrayCuentas.js"
import { Reset } from "./Reset.js"
import { CuentaFolio } from "./CuentaFolio.js"
import { Validations } from "./Validations.js"

export class Diario {
	/*
	* Estas son referencias para que la clase Diario
	* actúe de controlador de las demás clases.
	* Diario provee una interfaz para trabajar con las
	* otras clases.
	*/
	static Tabla = Tabla
	static Listeners = Listeners
	static Handlers = Handlers
	static ArrayCuentas = ArrayCuentas
	static Asientos = Global.ArrayAsientos
	static Reset = Reset
	static CuentaFolio = CuentaFolio
	static Validations = Validations
}