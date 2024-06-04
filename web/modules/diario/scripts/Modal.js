export class Modal {
	static display (subject, message, error_sucess) {
		const html = document.createElement('div')

		html.innerHTML = `
			<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="staticBackdropLabel">${subject}</h5>
							<button type="button" class="btn-close close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body alert-${error_sucess}">${message}</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary close-modal" data-bs-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
			<button type="button" class="btn btn-primary position-absolute visually-hidden display-modal" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
		`

		document.body.append(html)
		document.querySelector('.display-modal').click()

		//* Truco para eliminar el html del DOM
		function closeModal () {
			document.querySelectorAll('.close-modal').forEach(btn => btn.removeEventListener('click', closeModal))
			html.remove()
		}
		document.querySelectorAll('.close-modal').forEach(btn => btn.addEventListener('click', closeModal, false))
	}

	static error (subject, message) {
		return this.display(subject, message, 'danger')
	}

	static sucess (subject, message) {
		return this.display(subject, message, 'sucess')
	}
}