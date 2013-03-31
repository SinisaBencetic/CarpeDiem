function GetTaskLastExecutionDate() {
    //var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
    try {
        var db = window.openDatabase("carpediem", "1.0", "Carpe diem", 1000);
        if (db == undefined) {
            alert("No DB object created...");
            return undefined;
        }
    } catch (e) {
        alert("Error while accessing DB..."+e.message);
    }            
}