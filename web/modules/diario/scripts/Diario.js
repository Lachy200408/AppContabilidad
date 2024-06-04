//* Clases globales

import { Global } from "/scripts/global/Global.js"

//* Clases locales 

import { Tabla } from "./Tabla.js"
import { Listeners } from "./Listeners.js"
import { Handlers } from "./Handlers.js"
import { ArrayCuentas } from "./ArrayCuentas.js"
import { Reset } from "./Reset.js"
import { Validations } from "./Validations.js"
import { Modal } from "./Modal.js"

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
	static CuentaFolio = Global.CuentaFolio
	static Validations = Validations
	static Modal = Modal
	/*
	* Esta es la funcion que inicializa el modulo Diario
	*/
	static async init () {
		//* Cargo y muestro el html
		await fetch('../index.html')
					.then(res => res.text())
					.then(html => {
						const main = document.createElement('main')
						main.className = 'position-relative'
						main.innerHTML = html
						document.body.append(main)
					})
					
		//* Iniciar los datos y el formulario
		this.Tabla.init()
		this.Listeners.set()
		this.Tabla.actualizar()

		//* Event listener de actualizar la tabla
		window.addEventListener('regChange', this.Tabla.actualizar, false)
	}
}