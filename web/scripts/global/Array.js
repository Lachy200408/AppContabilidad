export class Array {
	static reset () {
		this.global = []
	}

	static get () {
		return [...this.global]
	}

	static push (value) {
		this.global.push(value)
	}
}