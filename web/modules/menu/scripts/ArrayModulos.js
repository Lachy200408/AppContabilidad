import { Array } from "/scripts/global/Array.js"

export class ArrayModulos extends Array {
	static global = []
	static map = []

	static async load (callback=(a)=>{}) {
		this.reset()

		if (this.map.length === 0) {
			this.map = await fetch('/modules/map.json').then(res => res.json()).then(map => map)
		}
			
		this.map.forEach(obj => {
			const html = document.createElement('article')
			html.className = 'rounded-3 border border-1 shadow module-art col-3 overflow-hidden card col-12 col-sm-4 '
			html.innerHTML = `
				<img src="${obj.poster}" alt="${obj.module}" title="${obj.module}" class="card-img-top m-100 h-auto"/>
				<hgroup class="py-4 bg-primary">
					<h1 class="text-center card-title text-white user-select-none">${obj.module}</h1>
				</hgroup>
			`
			html.pathToResources = obj.path

			this.global.push(html)
		})

		callback([...this.global])
	}
}