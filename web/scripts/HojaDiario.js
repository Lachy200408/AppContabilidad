import { Tabla } from "./Tabla.js"
import { globalObj } from "./globalObj.js"
import { calcTotales } from "./index.js"

export class HojaDiario {
	static limpiarHoja() {
		Tabla.reset()
		globalObj.resetAll()
		sessionStorage.clear()
		calcTotales()
	}

	static descargarHoja() {
		if (!globalObj.registroGlobal.length>0) return
		
		fetch('https://api-app-contabilidad.onrender.com/downloadBook', {
			method: 'POST',
			body: globalObj.registroGlobal.join(';')
		})
		.then(res => res.blob())
		.then(dataBlob => {
			const url = URL.createObjectURL(dataBlob)

			const a = document.createElement('a')
			a.href = url
			a.download = 'Diario.xlsx'
			a.click()
			
			URL.revokeObjectURL(url)
		})
	}
}