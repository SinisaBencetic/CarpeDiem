function createDBifMissing(tx) {
    tx.executeSql('DROP TABLE IF EXISTS task');
    tx.executeSql('CREATE TABLE IF NOT EXISTS task (id unique, lastExecutionDate)');    
}

function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}

function successCB() {
    alert("success!");
}

function GetTaskLastExecutionDate() {
    try {
        var db = window.openDatabase("carpediem", "1.0", "Carpe diem", 1000);
        if (db == undefined) {
            alert("No DB object created...");
            return undefined;
        }
        db.transaction(createDBifMissing, errorCB, successCB);
    } catch (e) {
        alert("Error during GetTaskLastExecutionDate() ..." + e.message);
    }            
}

