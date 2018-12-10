/**
 * Funcion para modificar los datos de usuario
 */
function saveEditDatos(){
  debugger;
	let id = sessionStorage.getItem('UsuarioActivo');
	let nombre = document.getElementById('inNomC').value.trim();
	let velo = document.getElementById('inVeloP').value.trim();
	let descr = $('#DescPer').val();

	let list = getTableData('Usuario');
	for (var i = 0; i < list.length; i++) {
		if (id == list[i].nomusu) {
			list[i].nombreCompleto = nombre;
			list[i].velocidadPromedio = velo;
			list[i].descripcionP = descr;
		}

	}
	saveToLocalStorage2('Usuario', list);
	location.reload(true);
}

/**
 * Realiza la funcion de los botones
 */
function bindEvents() {
	jQuery('#btnGuardarConf').bind('click', botonGuardarConfiguracion);
}

/**
 * Llama la funcion saveEditDatos
 */
function botonGuardarConfiguracion(element){
  saveEditDatos();
}


bindEvents();
