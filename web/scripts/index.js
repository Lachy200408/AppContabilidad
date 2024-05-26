import { Listeners } from "./Listeners.js"
import { Tabla } from "./Tabla.js"
import { ArrayAsientos } from "./ArrayAsientos.js"
import { Session } from "./Session.js"

//* Event listener de iniciar la aplicacion
window.addEventListener('load', function () {
	//* Inicializar la tabla
	Tabla.init()

	//* Recuperar la tabla cuando se recarga
	const sessionReg = Session.regs.get()
	if (sessionReg) ArrayAsientos.fromSession(sessionReg)

  Listeners.set()
}, false)

//* Event listener de refrescar la tabla
window.addEventListener('regChange', function () {
	if (!Tabla.isNull()) {
		//* Refrescar la tabla
		Tabla.insert([...ArrayAsientos.get()], ArrayAsientos.getBalances())
		
		//* Resetear los listeners
		Listeners.reset()
		
		//* Guardar registro
		Session.regs.save(ArrayAsientos.get().join(';'))
	}
}, false)
