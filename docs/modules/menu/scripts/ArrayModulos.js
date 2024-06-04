import { Array } from "../../../scripts/global/Array"

export class ArrayModulos extends Array {
	static global = []

	static async load (callback=(a)=>{}) {
		this.reset()

		await fetch('/modules/map.json')
					.then(res => res.json())
					.then(map => {
						map.forEach(obj => {
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
}