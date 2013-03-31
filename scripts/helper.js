var taskId = "";
var taskDate = "";
function CreateDBifMissing(tx) {
    alert('CreateDBifMissing');
    //tx.executeSql('DROP TABLE IF EXISTS task');
    tx.executeSql('CREATE TABLE IF NOT EXISTS task (id unique, lastExecutionDate)');
}

function errorCB(err) {
    alert("Error processing SQL: " + err.code + err.message);
}

function successCB() {
    alert("success!");
}

function UpdateTaskDateSQL(tx) {
    try {
        alert(taskId + '|'+ taskDate);
        tx.executeSql('DELETE FROM task WHERE id="'+taskId.toString()+'"');
        tx.executeSql('INSERT INTO task (id, lastExecutionDate) VALUES("' + taskId.toString() + '","' + taskDate.toString() + '")');
    } catch (e) {
        throw('updateTaskDateSQL->' + e.message);
    }
}

function GetTaskDateSQL(tx) {
    try {
        tx.executeSql('SELECT lastExecutionDate FROM task WHERE id="' + taskId + '"', [], GetTaskDateResult, errorCB);
    } catch (e) {
        throw ('GetTaskDateSQL->' + e.message);
    }
}

function GetTaskDateResult(tx, results) {
    var len = results.rows.length;
    alert("DEMO table: " + len + " rows found.");    
    taskDate= results.rows.item(0).lastExecutionDate;
    alert(taskDate);    
}
    


function ExecuteTaskTransaction(transactionSQLCallback) {
    try {
        alert('ExecuteTaskTransaction start');
        var db = window.openDatabase("carpediem", "1.0", "Carpe diem", 1000);
        if (db == undefined) throw("No DB object created...");                    
        db.transaction(transactionSQLCallback, errorCB, successCB);        
    } catch (e) {
        alert("Error during ExecuteSQL() ..." + e.message);
    }            
}

function GetTaskDate(id) {
    alert('GetTaskDate');
    ExecuteTaskTransaction(CreateDBifMissing);
    taskId = id.toString();
    ExecuteTaskTransaction(GetTaskDateSQL);
    $('#' + id).val(taskDate);
}

function UpdateTaskDate(id) {
    alert('UpdateTaskDate');
    
    ExecuteTaskTransaction(CreateDBifMissing);
    taskId = id.toString();
    taskDate = $('#' + id).val().toString();
    ExecuteTaskTransaction(UpdateTaskDateSQL);
}

