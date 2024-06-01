import { Array } from "./Array.js"

export class ArrayModulos extends Array {
	static global = []

	static async load (callback=(a)=>{}) {
		await fetch('/modules/map.json')
					.then(res => res.json())
					.then(map => {
						map.forEach(obj => {
							const html = document.createElement('article')
							html.className = 'rounded-3 border border-1 shadow-sm module-art col-3 overflow-hidden card'
							html.innerHTML = `
								<img src="${obj.poster}" alt="${obj.module}" title="${obj.module}" class="card-img-top m-100 h-auto"/>
								<hgroup>
									<h1 class="text-center card-title">${obj.module}</h1>
								</hgroup>
							`
							html.pathToResources = obj.path

							this.global.push(html)
						})
					})
					.catch(err => {
						console.error(err.message)

						const html = document.createElement('article')
						html.className = 'alert alert-danger'
						html.role = 'alert'

						this.global.push(html)
					})

		callback([...this.global])
	}

	static async cargarModulo (element) {
		/*
		* Aquí se cargarán los modulos y se insertaran en el documento.
		* Lo primero es remover el section principal.
		*/
		document.querySelector('.modulos').remove()

		//* Se trae el html y los scripts
		await fetch(element.pathToResources + 'index.html')
					.then(res => res.text())
					.then(html => {
						const main = document.createElement('main'),
									script = document.createElement('script')
						
						script.src = element.pathToResources + 'scripts/index.js'
						script.type = 'module'

						main.innerHTML = html
						main.className = 'position-relative'
						main.append(script)

						document.body.append(main)
					})
	}
}