//* Clases globales

import { Modulos } from "/scripts/Modulos.js"

//* Clases locales

import { ArrayModulos } from "./ArrayModulos.js"
import { Handlers } from "./Handlers.js"

export class Menu {
	/*
	* Referencias a las clases internas
	*/
	static Modulos = ArrayModulos
	static Handlers = Handlers
	/*
	* Inicializador del modulo
	*/
	static async init () {
		//* Creo y cargo el html
		const section = document.createElement('section')
		section.className = "container-fluid d-grid modulos position-relative align-items-center row-cols-lg-4 row-cols-md-1"
		document.body.append(section)

		//* Luego cargo el menu de modulos
		this.Handlers.loadMenu()

		//* Coloco los listeners
		window.addEventListener('click', (event) => {
			if (event.target.parentElement.localName === 'article') return Modulos.cargar(event.target.parentElement)
			if (event.target.classList.contains('btn-menu')) return this.Handlers.toMenu()
		}, false)
	}
}