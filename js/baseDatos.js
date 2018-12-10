/**
 * Almacena una lista de usuarios
 */
function guardarUsuario(list){
  localStorage.setItem('Usuario', JSON.stringify(list));
}

/**
 * Almacena una lista de usuarios
 */
function saveToLocalStorage2(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

/**
 * inserta una tabla en el localStorage
 *
 * @param {*} tableName el nombre de la tabla para insertar
 * @param {*} object el objeto para insertar en la tabla.
 */
function insertToTable(tableName, object) {
  let tableData = JSON.parse(localStorage.getItem(tableName));

  if (!tableData) {
    tableData = [];
  }
  let primaryKey = tableData.length + 1;
  object.id = primaryKey;
  tableData.push(object);
  localStorage.setItem(tableName, JSON.stringify(tableData));
  console.log(tableData);
  return tableData;
}


/**
 * Borra un objeto específico de la tabla en localstorage
 *
 * @param tableName el nombre de la tabla para eliminar
 * @param ID del objeto que se va a eliminar
 */
function deleteFromTable(tableName, objectId) {
  let tableData = JSON.parse(localStorage.getItem(tableName));
  let usu = sessionStorage.getItem('UsuarioActivo');

  if (!tableData) {
    return false;
  }
  let newTableData = [];
  tableData.forEach((element) => {
    if ((element.id != objectId) && (usu == element.user)) {
      newTableData.push(element);
    }
  });

  localStorage.setItem(tableName, JSON.stringify(newTableData));
  return newTableData;
}

/**
 * optiene datos
 *
 * @param {*} tableName el nombre de la tabla para insertar
 */
function getTableData(tableName) {
  let tableData = JSON.parse(localStorage.getItem(tableName));

  if (!tableData) {
    tableData = [];
  }
  return tableData;
}
