import { Diario } from "./Diario.js"

//* Inicializar la tabla y los listeners
Diario.Tabla.init()
Diario.Listeners.set()

//* Event listener de refrescar la tabla
window.addEventListener('regChange', function () {
	if (!Diario.Tabla.isNull()) {
		//* Refrescar la tabla
		Diario.Tabla.insert(
			[...Diario.Asientos.get()],
			Diario.Asientos.getBalances()
		)
		
		//* Resetear los listeners
		Diario.Listeners.reset()
	}
}, false)
