/**
 * Almacena una lista de usuarios
 */
function guardarUsuario(list){
  localStorage.setItem('Usuario', JSON.stringify(list));

}
