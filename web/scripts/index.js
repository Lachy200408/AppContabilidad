import { Menu } from "./Menu.js"

//* Event listener de iniciar la aplicacion
window.addEventListener('load', function () {
	/*
	* Lo primero que se realiza es la carga del map.json de los modulos
	* para renderizar la cantidad de modulos que tiene la aplicacion.
	*/

	Menu.Modulos.load(array => {
		array.forEach(article => {
			document.querySelector('.modulos').append(article)
		})
	})
}, false)

//* Recogedor de clicks para los eventos
window.addEventListener('click', (event) => {
	if (event.target.parentElement.localName === 'article') return Menu.Modulos.cargarModulo(event.target.parentElement)
	if (event.target.classList.contains('btn-menu')) return 
}, false)
