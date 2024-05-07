window.onload = () => {
	startForm()
}

function startForm () {
	const form = document.querySelector('body>form')
	
	form.addEventListener('submit', submitForm, false)
	
	setListeners()
}


//* Funciones de handlers


function submitForm (event) {
	event.preventDefault()
	const form = document.querySelector('body>form')

	//* Validar las fechas
	const validacionFecha = validateDate(String(form.fecha.value))
	let errores = Object.values(validacionFecha).filter(message => message !== 'ok')
	if (errores.length !== 0) {
		displayModal(errores.join('\n'))
		return
	}
	const fecha = String(form.fecha.value)

	//* Validar el detalle
	const validacionDetalle = validateDetail(form.detalle.value)
	errores = Object.values(validacionDetalle).filter(message => message !== 'ok')
	if (errores.length !== 0) {
		displayModal(errores.join('\n'))
		return
	}
	const detalle = form.detalle.value
	
	//* Validar las cuentas con las de la base de datos de la API
	const arrayCuentas = Array.from(document.querySelector('body>form>fieldset>ul').children).map(li => {
		const liArray = Array.from(li.children)
		const cuenta = liArray[0].value
		const debe = liArray[1].lastElementChild.value
		const haber = liArray[2].lastElementChild.value
		const arraySubcuentas = Array.from(liArray[3].children[1].children).map(_li => {
			const subcuenta = _li.children[0].value
			const parcial = _li.children[1].firstElementChild.value

			return {
				subcuenta: subcuenta,
				parcial: parcial
			}
		})

		return {
			cuenta: cuenta,
			debe: debe,
			haber: haber,
			subcuentas: arraySubcuentas
		}
	})

	//* Exportar el registro
	const xmlArrayCuentas = arrayCuentas.map(_cuenta => {
		const xmlSubcuentas = _cuenta.subcuentas.map(_subcuenta => {
			return `
				<subcuenta>
					<nombre>${_subcuenta.subcuenta}</nombre>
					<parcial>${_subcuenta.parcial}</parcial>
				</subcuenta>
			`
		}).join('')

		return `
			<cuenta>
				<nombre>${_cuenta.cuenta}</nombre>
				<debe>${_cuenta.debe}</debe>
				<haber>${_cuenta.haber}</haber>
				${xmlSubcuentas}
			</cuenta>
		`
	}).join('')

	const xml = `
		<xml version="1.1" ?>
		<tabla>
			<fecha>${fecha}</fecha>
			${xmlArrayCuentas}
			<detalle>${detalle}</detalle>
		</tabla>
	`
	downloadReg(xml)
}

function modifyCuentas (event) {
	event.preventDefault()

	const isCuenta = !String(event.target.id).includes('Sub')
	const itemKind = (isCuenta)? 'cuenta' : 'subcuenta'

	//* Selecciono el elemento correcto dependiendo del boton
	const list = (isCuenta)? document.querySelector('body>form>fieldset>ul') : event.target.parentElement.children[1]

	//* Html de los items
	const htmlCuenta = `
		<input type="text" list="cuentas" class="cuenta" required/>
		<label>
			Debitando:
			<input type="number" name="debe" id="debe" placeholder="$0.00" step="0.01"/>
		</label>
		<label>
			Acreditando:
			<input type="number" name="haber" id="haber" placeholder="$0.00" step="0.01"/>
		</label>

		<details>
			<summary>Subcuentas</summary>
			<ul>
			</ul>

			<button name="newSubCuenta" id="newSubCuenta">+</button>
			<button name="removeSubCuenta" id="removeSubCuenta">-</button>
		</details>
	`
	const htmlSubCuenta = `
		<input type="text" list="subcuentas" required/>

		<label>
			Parcial: 
			<input type="number" name="parcial" id="parcial" required/>
		</label>
	`
	const html = document.createElement('li')
	html.className = itemKind
	html.innerHTML = (isCuenta)? htmlCuenta : htmlSubCuenta

	if (event.target.innerHTML === '+') {
		list.appendChild(html)
	}
	else {
		const length = list.children.length

		//* Desactivar boton cuando queden dos cuentas y 0 subcuentas
		if((length === 2 && isCuenta) || (length === 0 && !isCuenta)) return
		
		list.children[length-1].remove()
	}

	//* Resetear los listeners
	resetListeners()
}

function handlerBalances (event) {
	const input = event.target

	//* Validar entrada
	if (!input.value) input.value = ''

	//* Resetear el contiguo
	let element = input.parentElement
	if (element.innerText === 'Parcial: ') return
	element = ((element.innerText === 'Acreditando: ')? element.previousElementSibling : element.nextElementSibling)
	element = element.lastElementChild.value = ''
}


//* Funciones de listeners


function setListeners () {
	//* Colocar listeners de botones
	document.querySelectorAll('fieldset button').forEach((btn) => {
		btn.addEventListener('click', modifyCuentas, false)
	})
	//* Colocar listeners de inputs numericos
	document.querySelectorAll('input[type="number"]').forEach((input) => {
		input.addEventListener('input', handlerBalances, false)
	})
}

function removeListeners () {
	//* Quitar listeners de botones
	document.querySelectorAll('fieldset button').forEach((btn) => {
		btn.removeEventListener('click', modifyCuentas)
	})
	//* Quitar listeners de inputs numericos
	document.querySelectorAll('input[type="number"]').forEach((input) => {
		input.removeEventListener('input', handlerBalances)
	})
}

function resetListeners () {
	removeListeners()
	setListeners()
}


//* Funciones de validacion


function validateDate (fecha) {
	const ymd = fecha.split('-')
	const resultado = {
		year: '',
		month: '',
		day: ''
	}

	if (parseInt(ymd[0]) < 2000 ||
			parseInt(ymd[0]) > 2024) resultado.year = 'El año está incorrecto'
	else resultado.year = 'ok'

	if (parseInt(ymd[1]) > 12 ||
			parseInt(ymd[1]) < 1) resultado.month = 'El mes está incorrecto'
	else resultado.month = 'ok'

	if (parseInt(ymd[2]) > 31 ||
			parseInt(ymd[2]) < 1 ||
			(parseInt(ymd[2]) > 28 && parseInt(ymd[1]) !== 2) || //* Febrero
			(parseInt(ymd[2]) > 30 && parseInt(ymd[1]) !== 1) ||
			(parseInt(ymd[2]) > 30 && parseInt(ymd[1]) !== 3) ||
			(parseInt(ymd[2]) > 30 && parseInt(ymd[1]) !== 5) ||
			(parseInt(ymd[2]) > 30 && parseInt(ymd[1]) !== 7) ||
			(parseInt(ymd[2]) > 30 && parseInt(ymd[1]) !== 8) ||
			(parseInt(ymd[2]) > 30 && parseInt(ymd[1]) !== 10) ||
			(parseInt(ymd[2]) > 30 && parseInt(ymd[1]) !== 12)) resultado.day = 'El día está incorrecto'
	else resultado.day = 'ok'

	return resultado
}

function validateDetail (detalle) {
	const resultado = {
		malRedaccion: '',
		inconsistencia: ''
	}

	if (detalle.includes('egistrando')) resultado.malRedaccion = 'ok'
	else resultado.malRedaccion = 'Los detalles están escritos incorrectamente. Debe iniciar con "Registrando".'

	if (detalle.split(' ').length > 5) resultado.inconsistencia = 'ok'
	else resultado.inconsistencia = 'Argumenta un poco más los detalles.'

	return resultado
}

function displayModal (text) {
	alert('Ha ocurrido un problema en su formulario:\n'+text)
}


//* Funciones de exportacion

let cantReg = 1
function downloadReg (text, fileName = 'Sin-titulo') {
	const blob = new Blob([text], { type: 'text/plain' })
	const url = URL.createObjectURL(blob)

	const a = document.createElement('a')
	a.href = url
	a.download = `${fileName}${cantReg++}.xml`
	a.style.display = 'none'

	document.body.appendChild(a)
	a.click()
	
	document.body.removeChild(a)
	URL.revokeObjectURL(url)
}