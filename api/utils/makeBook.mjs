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
		operacion.forEach(fila => {
			tableRows.push([...fila])
		})
	})

	sheet.addTable({
		name: 'Tabla-1',
		ref: 'A1',
		headerRow: true,
		totalsRow: true,
		style: {
			theme: 'TableStyleLight4',
			showLastColumn: true
		},
		columns: [
			{header: 'Fecha', key: 'fecha', name: 'Fecha', filterButton: true},
			{header: 'Cuenta y detalle', key: 'cuentaydetalle', name: 'Cuenta y detalle', filterButton: true},
			{header: 'Folio', key: 'folio', name: 'Folio', filterButton: true},
			{header: 'Parcial', key: 'parcial', name: 'Parcial', filterButton: true},
			{header: 'Debe', key: 'debe', name: 'Debe', filterButton: true, totalsRowFunction: 'sum'},
			{header: 'Haber', key: 'haber', name: 'Haber', filterButton: true, totalsRowFunction: 'sum'}
		],
		rows: tableRows
	})

	sheet.getColumn(1).width = 16
	sheet.getColumn(2).width = 32
	sheet.getColumn(3).width = 6
	sheet.getColumn(4).width = 16
	sheet.getColumn(5).width = 16
	sheet.getColumn(6).width = 16
	
	callback(workbook)
}