/**
 * Almacena una lista de usuarios
 */
function guardarUsuario(list){
  localStorage.setItem('Usuario', JSON.stringify(list));
}

/**
 * Inserts any object to any table in localstorage
 *
 * @param {*} tableName the name of the table to insert into
 * @param {*} object the object to insert in the table
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
 * Deletes an specific object from the table in localstorage
 *
 * @param tableName the name of the table to delete from
 * @param objectId Id of the object to be deleted
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
 * Get data
 *
 * @param {*} tableName the name of the table to insert into
 */
function getTableData(tableName) {
  let tableData = JSON.parse(localStorage.getItem(tableName));

  if (!tableData) {
    tableData = [];
  }
  return tableData;
}
