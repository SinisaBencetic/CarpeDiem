//function UpdateTaskDate(id, date) {
//    ExecuteTaskTransaction(CreateDBifMissing);
//    taskId = id.toString();
//    taskDate = date.toString();
//    ExecuteTaskTransaction(UpdateTaskDateSQL);
//}

function GetTaskDateMilisec(taskDOMid) {
    var taskDate = $('#' + taskDOMid).val();
    if (taskDate == undefined || taskDate == 0) taskDate = new Date();    
    var taskMilisec = taskDate.getTime();
    alert(taskMilisec);
}

