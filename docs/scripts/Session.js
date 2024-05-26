class SessionP {
	static regs = {
		save: function (value) {
			sessionStorage.setItem(this.key, value)
		},
		get: function () {
			return sessionStorage.getItem(this.key)
		},
		reset: function () {
			sessionStorage.removeItem(this.key)
		}
	}
}

export class Session extends SessionP {
	static regs = {
		key: 'registroGlobal',
		...super.regs
	}
}