import test from 'node:test'
import assert from 'node:assert'

//* La funcion que probare
const _json = [
	{
		module: "Diario",
		path: "/modules/diario/",
		poster: "/assets/images/diario-poster.png"
	}
]

const destino = _json

test('test de arraymodulo', () => {
	assert.equal(_json, destino, 'Curioso')
})