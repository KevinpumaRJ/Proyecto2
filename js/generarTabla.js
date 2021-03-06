'use strict';

/**
 * Funcion para obtener los dias marcados en un checkboxs
 */
function obtenerDias(){
	let listDias = [];
	let checkBoxs = document.getElementsByClassName('checks')
	for (let i = 0; i < 7; i++) {
		if (checkBoxs[i].checked == true){
			listDias.push(checkBoxs[i].value);
		}
	}
	return guardarRide(listDias);
}

/**
 * Funcion para obtener los rides de un usuario determinado
 */
function obtenerRides(){
	let listRides = [];
	let tableData = JSON.parse(localStorage.getItem('rides_table'));
	let usu = sessionStorage.getItem('UsuarioActivo');
	tableData.forEach(ride => {
		if (usu == ride.user){
			listRides.push(ride);

		}
	});
	console.log(listRides);
	generarTabla('rides_table', listRides);
	return listRides;
	//loadTableData('rides_table', listRides);
}

/**
 * Funcion para guardar los rides
 */
function guardarRide(dia) {
	let nom = document.getElementById('nomR').value;
	let lugSalida = document.getElementById('lSalida').value;
	let lugDestino = document.getElementById('lDestino').value;
	let des = $('#Desc').val();
	let horaInicio = document.getElementById('hSalida').value;
	let horaLlegada = document.getElementById('hLlegada').value;
	let dias = dia;
	let user = sessionStorage.getItem('UsuarioActivo');


	let ride = {
		nom,
		lugSalida,
		lugDestino,
		des,
		horaInicio,
		horaLlegada,
		dias,
		user
	};


	let rides = insertToTable('rides_table', ride);
	let ridess = insertToTable('ridesG_table', ride);


	loadTableData('rides_table', obtenerRides());

	generarTablaGlobal('ridesG_table', ridess);
	//obtenerRides();


}

/**
 * Genera una tabla dinamica html para un usuario
 *
 * @param tableName
 * @param tableData
 */
function generarTabla(tableName, tableData) {
	let table = jQuery(`#${tableName}`);

	let rows = "";
	tableData.forEach((rides, index) => {
		let row = `<tr><td>${rides.nom}</td><td>${rides.lugSalida}</td><td>${rides.lugDestino}</td>
		<td>${rides.des}</td><td>${rides.horaInicio}</td><td>${rides.horaLlegada}</td><td>${rides.dias}</td><td>${rides.user}</td>`;
		row += `<td> <a onclick="edit(this);" data-id="${rides.id}" data-entity="${tableName}" class="btn btn-primary" data-toggle="modal" data-target="#emodal">Edit</a>  |  <a onclick="deleteEntity(this);" data-id="${rides.id}" data-entity="${tableName}" class="btn btn-primary link delete">Delete</a>  </td>`;
		rows += row + '</tr>';
	});
	table.html(rows);

}


/**
 * Genera una tabla dinamica html para un usuario global
 *
 * @param tableName
 * @param tableData
 */
function generarTablaGlobal(tableName, tableData) {
	let table = jQuery(`#${tableName}`);

	let rows = "";
	tableData.forEach((rides, index) => {
		let row = `<tr><td>${rides.nom}</td><td>${rides.lugSalida}</td><td>${rides.lugDestino}</td>
		<td>${rides.des}</td><td>${rides.horaInicio}</td><td>${rides.horaLlegada}</td><td>${rides.dias}</td><td>${rides.user}</td>`;
		row += `<td> <a onclick="cDatos(this);" data-id="${rides.user}" data-entity="${tableName}" class="btn btn-primary" data-toggle="modal" data-target="#pmodal"> Ver detalles </a>  </td>`;
		rows += row + '</tr>';
	});
	table.html(rows);

}


/**
 *Llama los id para sarcar los datos
 */
function editEntity(element) {
	debugger;
	const dataObj = jQuery(element).data();
	editElement(dataObj.entity, dataObj.id);
}

/**
 * Llama a siertas funciones para realizar el procedimiento de eliminar
 */
function deleteEntity(element) {
	const dataObj = jQuery(element).data();
	const newEntities = deleteFromTable(dataObj.entity, dataObj.id);
	generarTabla(dataObj.entity, newEntities);
}

/**
 * Genera una tabla predeterminada
 */
function loadTableData(tableName, list) {
	generarTabla(tableName, list);

}

/**
 * Genera una tabla predeterminada
 */
function loadTableDataG(tableName, list) {
	generarTablaGlobal(tableName, list);

}

/**
 * Funcion para buscar rides de usuario
 */
function buscarRide(){
	debugger;
	let newTable = [];
	let tableData = JSON.parse(localStorage.getItem('rides_table'));
	let salida = document.getElementById('inSalida').value;
	let llegada = document.getElementById('inDest').value;
	tableData.forEach(ride => {
		if ((salida == ride.lugSalida) && (llegada == ride.lugDestino)){
				newTable.push(ride);
		}
	});
	console.log(newTable);
	loadTableData('rides_table', newTable);
	//location.reload(true);
	//generarTabla('rides_table', newTable);
}

/**
 * fucion para buscar rides globales
 */
function buscarRideGlobal(){
	debugger;
	let newTable = [];
	let tableData = JSON.parse(localStorage.getItem('ridesG_table'));
	let salida = document.getElementById('inSalidaG').value;
	let llegada = document.getElementById('inDestG').value;
	tableData.forEach(ride => {
		if ((salida == ride.lugSalida) && (llegada == ride.lugDestino)){
				newTable.push(ride);
		}
	});
	console.log(newTable);
	loadTableDataG('ridesG_table', newTable);
	//location.reload(true);
	//generarTabla('rides_table', newTable);
}

/**
 * funcion para llamar los datos
 */
function edit(element) {
	let object = jQuery(element).data();
	loadRide(object.id);
	console.log(object);
}

/**
 * funcion para cargar datos de usuario
 */
function loadRide(object){
	let list = getTableData('rides_table');
	for (var i = 0; i < list.length; i++) {
		if (object == list[i].id) {
			jQuery("#enomR").val(list[i].nom);
			jQuery("#elSalida").val(list[i].lugSalida);
			jQuery("#elDestino").val(list[i].lugDestino);
			jQuery("#eDesc").val(list[i].des);
			jQuery("#ehSalida").val(list[i].horaInicio);
			jQuery("#ehLlegada").val(list[i].horaLlegada);
		}
	}
	sessionStorage.setItem('idCarrera', object);
}

/**
 * funcion para editar y guardar los datos
 */
function saveEdit(){
	let id = sessionStorage.getItem('idCarrera');
	let nombre = document.getElementById('enomR').value.trim();
	let salida = document.getElementById('elSalida').value.trim();
	let destino = document.getElementById('elDestino').value.trim();
	let descripcion = $('#Desc').val();
	let hSalida = document.getElementById('ehSalida').value.trim();
	let hDestino = document.getElementById('ehLlegada').value.trim();

	let list = getTableData('rides_table');
	for (var i = 0; i < list.length; i++) {
		if (id == list[i].id) {
			list[i].nom = nombre;
			list[i].lugSalida = salida;
			list[i].lugDestino = destino;
			list[i].des = descripcion;
			list[i].hSalida = hSalida;
			list[i].hDestino = hDestino;
		}

	}
	saveToLocalStorage2('rides_table', list);
	location.reload(true);
}

/**
 * funcion para llamar los datos de un usuario
 */
function cDatos(element) {
	let object = jQuery(element).data();
	cBDatos(object.id);
	console.log(object);
}

/**
 * funcion para cargar los datos de un usuario
 */
function cBDatos(object){
	let list = getTableData('Usuario');
	for (var i = 0; i < list.length; i++) {
		if (object == list[i].nomusu) {
			jQuery("#pnomR").val(list[i].nombreCompleto);
			jQuery("#pvelo").val(list[i].velocidadPromedio);
			jQuery("#pdesc").val(list[i].descripcionP);
		}
	}
	sessionStorage.setItem('idDatosP', object);
}

/**
 * funcion que carga generarTablaGlobal
 */
function loadTableDataa(tableName) {
	generarTablaGlobal(tableName, getTableData(tableName));
}

/**
 * Enlaza los diferentes eventos a los diferentes elementos de la página.
 */
function bindEvents() {
	jQuery('#btnGuardar').bind('click', (element) => {
		guardarRide(obtenerDias());
	});

	jQuery('#btnBusTabla').bind('click', botonBuscar);

	jQuery('#btneGuardar').bind('click', (element) => {
		saveEdit();
	});

	jQuery('#btnBusTablaG').bind('click', botonBuscarGlobal);
}

/**
 * llama la funcion buscarRide
 */
function botonBuscar(element){
	buscarRide();
}

/**
 * llama la funcion buscarRideGlobal
 */
function botonBuscarGlobal(element){
	buscarRideGlobal();
}

bindEvents();
