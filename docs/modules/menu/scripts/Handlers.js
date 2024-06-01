import { Menu } from "./Menu.js"

class HandlerFunctions {
	static backToMenu () {
		if (document.body.querySelector('section')) return

		const section = document.createElement('section')
		section.className = "container-fluid d-grid modulos position-relative align-items-center row-cols-lg-4 row-cols-md-1"

		this.loadMenu()

		document.querySelector('main').remove()
		document.body.append(section)
	}

	static loadMenu () {
		Menu.Modulos.load(array => {
			array.forEach(article => {
				document.querySelector('.modulos').append(article)
			})
		})
	}
}

export class Handlers extends HandlerFunctions {
	static toMenu = super.backToMenu
	static loadMenu = super.loadMenu
}