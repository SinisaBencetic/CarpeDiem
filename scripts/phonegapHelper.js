﻿function createDBifMissing(tx) {
    tx.executeSql('DROP TABLE IF EXISTS task');
    tx.executeSql('CREATE TABLE IF NOT EXISTS task (id unique, lastExecutionDate)');    
}

function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}

function successCB() {
    alert("success!");
}

function updateTaskDate(tx) {
    var id = 1;
    var date = new Date().getTime();
    if (transaction == undefined) throw ('empty transaction!');
    if (id == undefined) throw ('task id empty!');
    
    tx.executeSql('INSERT INTO task (id, lastExecutionDate) VALUES(id,date)');
}

function GetTaskLastExecutionDate() {
    try {
        var db = window.openDatabase("carpediem", "1.0", "Carpe diem", 1000);
        if (db == undefined) {
            alert("No DB object created...");
            return undefined;
        }
        db.transaction(createDBifMissing, errorCB, successCB);
        db.transaction(updateTaskDate, errorCB, successCB);
    } catch (e) {
        alert("Error during GetTaskLastExecutionDate() ..." + e.message);
    }            
}
