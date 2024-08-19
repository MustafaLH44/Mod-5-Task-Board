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
    function createTaskCard(task) {
        const card = $('<div class="task-card"></div>');
        card.attr('data-id', task.id);
        card.append(`<h3>${task.title}</h3>`);
        card.append(`<p>Due Date: ${task.dueDate}</p>`);
        card.append(`<p>${task.taskDescription}</p>`);
        
        // Add a delete button to the card
        const deleteButton = $('<button class="delete-task">Delete</button>');
        deleteButton.on('click', handleDeleteTask);
        card.append(deleteButton);
        
        // Make the card draggable
        card.draggable({
            revert: "invalid",
            start: function (event, ui) {
                $(this).addClass('dragging');
            },
            stop: function (event, ui) {
                $(this).removeClass('dragging');
            }
        });
        
        return card;
    }


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
    function handleDeleteTask(event) {
        const taskId = $(this).closest('.task-card').data('id');
        
        // Retrieve tasks from localStorage
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        // Filter out the deleted task
        tasks = tasks.filter(task => task.id !== taskId);
        
        // Save the updated tasks array back to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        renderTaskList(); // Re-render the task list
    }
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    function handleDrop(event, ui) {
        const taskId = ui.helper.data('id');
        const newStatus = $(this).data('status'); // Get the new status from the droppable container
        
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = tasks.find(task => task.id === taskId);
        
        if (task) {
            task.status = newStatus; // Update task status
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTaskList(); // Re-render the task list
        }
    }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $('#save-task').on('click', handleAddTask);
    
    // Initialize datepicker
    $('#task-Due-Date').datepicker({
        changeMonth: true,
        changeYear: true,
    });
    
    // Make task lanes droppable
    $('.task-lane').droppable({
        accept: '.task-card',
        drop: handleDrop
    });

    // Render tasks on page load
    renderTaskList();
});
