// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskArray=[];

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timestamp = new Date().getTime(); // Current timestamp
    const randomNumber = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
    const uniqueId = timestamp + '-' + randomNumber; // Combine timestamp and random number
    return uniqueId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {


}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const localStorageData=JSON.parse(localStorage.getItem('tasks'));
    for (const task of localStorageData) {
        if(task.status==='To-Do'){
            let toDoDiv=$('div');
            toDoDiv.html(task.title)
            console.log(toDoDiv)
            $('#todo-cards').append(toDoDiv)
        }
    }
}
$(function () {
    $('#task-Due-Date').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const taskObject={
        title:$('#task-Title').val(),
        dueDate:$('#task-Due-Date').val(),
        taskDescription:$('#task-Description').val(),
        status: 'To-Do'
    }
    taskArray.push(taskObject);
    localStorage.setItem('tasks',JSON.stringify(taskArray));
    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    const addBtn=$('#save-task').on('click', handleAddTask)

});
