var usuario = [];

/**
 * Guarda los usuarias a registrase
 */
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

/**
 *Valida si el usuario esta en la lista de usuarios
 guardados y lo loguea
 */
function validarUsu(username, pass){
	let logueado = false;
	let userData = JSON.parse(localStorage.getItem('Usuario'))
	console.log(userData);
	userData.forEach(user => {
			console.log('entro');
			if ((username == user.nomusu) && (pass == user.contra)) {
				console.log('logged in');
				logueado = true;
				return logueado;
				sessionStorage.setItem('UsuarioActivo', user.nomusu);
				window.open('Dashboard.html');
			}

			});
			if (!logueado){
				console.log('Username or Password invalid');
				window.alert("Usuario o Contraseña invalidos");
			}
			else {
				sessionStorage.setItem('UsuarioActivo', username);
				window.open('Dashboard.html');

				}

	}



function bindEvents() {
	jQuery('#btnLog').bind('click', botonLoguin);
	jQuery('#btnRegistro').bind('click', botonRegistrar);
}

/**
 * Realiza la funcion del boton registrar
 */
function botonRegistrar(element) {
    usuarios();
}

/**
 * Realiza la funcion del boton Loguin
 */
function botonLoguin(element) {
	var sUsername = '';
	var sPass = '';

	sUsername = document.getElementById('NomUsuario').value;
	sPass = document.getElementById('Contrasenna').value;

	validarUsu(sUsername, sPass);
}


bindEvents();
