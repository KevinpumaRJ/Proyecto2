function editDatos(element) {
	let object = jQuery(element).data();
	loadDatos(object.id);
	console.log(object);
}

function loadDatos(object){
	let list = getTableData('Usuario');
	for (var i = 0; i < list.length; i++) {
		if (object == list[i].id) {
			jQuery("#inNomC").val(list[i].nombreCompleto);
			jQuery("#inVeloP").val(list[i].velocidadPromedio);
			jQuery("#DescPer").val(list[i].descripcionP);

		}
	}
	sessionStorage.setItem('idDatos', object);
}

function saveEditDatos(){
  debugger;
	let id = sessionStorage.getItem('idDatos');
	let nombre = document.getElementById('inNomC').value.trim();
	let velo = document.getElementById('inVeloP').value.trim();
	let descr = $('#DescPer').val();

	let list = getTableData('Usuario');
	for (var i = 0; i < list.length; i++) {
		if (id == list[i].id) {
			list[i].nombreCompleto = nombre;
			list[i].velocidadPromedio = velo;
			list[i].descripcionP = descr;
		}

	}
	saveToLocalStorage2('Usuario', list);
	location.reload(true);
}


function bindEvents() {
	jQuery('#btnGuardarConf').bind('click', botonGuardarConfiguracion);
}

function botonGuardarConfiguracion(element){
  saveEditDatos();
}


bindEvents();
