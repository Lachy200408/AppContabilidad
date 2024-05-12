import exceljs from 'exceljs'

export async function makeBook (arrayOperaciones, callback) {
	const dataDate = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDay()
	)

	const workbook = new exceljs.Workbook()
	workbook.creator = 'AppContabilidad'
	workbook.lastModifiedBy = 'AppContabilidad'
	workbook.created = dataDate
	workbook.modified = dataDate
	workbook.lastPrinted = dataDate
	workbook.properties.date1904 = true
	workbook.calcProperties.fullCalcOnLoad = true

	const sheet = workbook.addWorksheet('Hoja - 1')

	//* Creo la tabla
	const tableRows = []
	arrayOperaciones.forEach(operacion => {
		tableRows.push([...operacion])
	})

	sheet.addTable({
		name: 'Tabla-1',
		ref: 'A1',
		headerRow: true,
		totalsRow: true,
		columns: [
			{header: 'Fecha', key: 'fecha', name: 'fecha', filterButton: true},
			{header: 'Cuenta y detalle', key: 'cuentaydetalle', name: 'cuentaydetalle', filterButton: true},
			{header: 'Folio', key: 'folio', name: 'folio', filterButton: true},
			{header: 'Parcial', key: 'parcial', name: 'parcial', filterButton: true},
			{header: 'Debe', key: 'debe', name: 'debe', filterButton: true, totalsRowFunction: 'sum'},
			{header: 'Haber', key: 'haber', name: 'haber', filterButton: true, totalsRowFunction: 'sum'}
		],
		rows: tableRows
	})
	
	callback(workbook)
}