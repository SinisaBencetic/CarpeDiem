var taskId = "";
var taskDate = "";
function CreateDBifMissing(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS task');
    tx.executeSql('CREATE TABLE IF NOT EXISTS task (id unique, lastExecutionDate)');
    //var id = 1;
    //var date = new Date().getTime();
    //var date = 'dummy';
    //if (transaction == undefined) throw ('empty transaction!');
    //if (id == undefined) throw ('task id empty!');

    //tx.executeSql('INSERT INTO task (id, lastExecutionDate) VALUES(1,"dummy")');
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
        alert('updateTaskDateSQL->' + e.message);
    }
}


function ExecuteTaskTransaction(transactionSQL) {
    try {
        var db = window.openDatabase("carpediem", "1.0", "Carpe diem", 1000);
        if (db == undefined) throw("No DB object created...");                    
        db.transaction(transactionSQL, errorCB, successCB);        
    } catch (e) {
        alert("Error during ExecuteSQL() ..." + e.message);
    }            
}

