'use strict';


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
	//loadTableData('rides_table', listRides);
}

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


	obtenerRides();


}

/**
 * Renders an HTML table dinamically
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

function editEntity(element) {
	debugger;
	const dataObj = jQuery(element).data();
	editElement(dataObj.entity, dataObj.id);
}

function deleteEntity(element) {
	const dataObj = jQuery(element).data();
	const newEntities = deleteFromTable(dataObj.entity, dataObj.id);
	generarTabla(dataObj.entity, newEntities);
}

function loadTableData(tableName, list) {
	generarTabla(tableName, list);

}

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
	//generarTabla('rides_table', newTable);
}

function edit(element) {
	let object = jQuery(element).data();
	loadRide(object.id);
	console.log(object);
}

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

function loadTableDataa(tableName) {
	generarTabla(tableName, getTableData(tableName));
}

/**
 * Binds the different events to the different elements of the page
 */
function bindEvents() {
	jQuery('#btnGuardar').bind('click', (element) => {
		guardarRide(obtenerDias());
	});

	jQuery('#btnBusTabla').bind('click', botonBuscar);

	jQuery('#btneGuardar').bind('click', (element) => {
		saveEdit();
	});
}

function botonBuscar(element){
	buscarRide();
}

bindEvents();
