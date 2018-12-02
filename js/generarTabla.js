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
	let tableData = JSON.parse(localStorage.getItem(tableName));
	let usu = sessionStorage.getItem('UsuarioActivo');
	for (let i = 0; i < length; i++) {
		if (tableData[i].user == usu){
			listRides.push(tableData);
		}
	}
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

	let rides = insertToTable('rides', ride);

	verficarRideUsuario('rides', rides);
	//generarTabla('rides', rides);

}

function verficarRideUsuario(tableName, tableData){
		let usu = sessionStorage.getItem('UsuarioActivo');
		usu.forEach(ride => {
			if (usu == ride.user){
					generarTabla(nomTabla, tableData);
			}
		});
}

/**
 * Renders an HTML table dinamically
 *
 * @param tableName
 * @param tableData
 */
function generarTabla(tableName, tableData) {
	let table = jQuery(`#${tableName}_table`);
	// loop through all the items of table and generates the html
	let rows = "";
	tableData.forEach((rides, index) => {
		let row = `<tr><td>${rides.nom}</td><td>${rides.lugSalida}</td><td>${rides.lugDestino}</td>
		<td>${rides.des}</td><td>${rides.horaInicio}</td><td>${rides.horaLlegada}</td><td>${rides.dias}</td>`;
		row += `<td> <a onclick="editEntity(this)" data-id="${rides.id}" data-entity="${tableName}" class="link edit">Edit</a>  |  <a  onclick="deleteEntity(this);" data-id="${rides.id}" data-entity="${tableName}" class="link delete">Delete</a>  </td>`;
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

function loadTableData(tableName) {
	generarTabla(tableName, getTableData(tableName));
}


/**
 * Binds the different events to the different elements of the page
 */
function bindEvents() {
	jQuery('#btnGuardar').bind('click', (element) => {
		guardarRide(obtenerDias());
	});
}

bindEvents();
