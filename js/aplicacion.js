var usuario = [];

function usuarios() {
	var nombre = document.getElementById('Nombre').value;
	var apellido1 = document.getElementById('Apellido1').value;
	var apellido2 = document.getElementById('Apellido2').value;
  var cell = document.getElementById('Tell').value;
	var nomusu = document.getElementById('NomUsuario').value;
	var contra = document.getElementById('Contrasenna').value;

	var user = {
		nombre,
		apellido1,
		apellido2,
    cell,
    nomusu,
    contra
	};
	console.log('Usuario Registrado');
	usuario.push(user);
	guardarUsuario(usuario);
}

function bindEvents() {
	jQuery('#btnRegistro').bind('click', botonRegistrar);
}

function botonRegistrar(element) {
    usuarios();
}

bindEvents();
