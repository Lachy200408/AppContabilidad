import { Menu } from '/modules/menu/scripts/Menu.js'
import { Diario } from '/modules/diario/scripts/Diario.js'

export class Modulos {
	static cargar (element) {
		//* El inicio es la carga del menu
		if (element.type === 'load') return Menu.init()

		//* Aquí se cargarán los modulos.
		//* Lo primero es remover el section principal.
		document.querySelector('.modulos').remove()

		switch (element.lastElementChild.lastElementChild.innerText) {
			case 'Diario' : {
				return Diario.init()
			}
		}
	}
}
