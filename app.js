// Define UI var
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

// Load all event listners
function loadEventListeners(){


    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);

    //Remove task
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup',filterTask);

}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
        // Create li element 
        const li = document.createElement('li');
        li.className = 'collection-item';

        // Create text node and append to li
        li.appendChild(document.createTextNode(task));

        console.log(li, '----');
        
        // create a new link element 
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>'

        // Append the link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);

    })
}

function addTask(e){

    console.log(taskInput.value);

    if(taskInput.value == '' ) {
        alert('Add a task');
    }

    // Create li element 
    const li = document.createElement('li');
    li.className = 'collection-item';

    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    console.log(li, '----');
    
    // create a new link element 
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'

    // Append the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    //store in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    console.log('added to local', task);
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }   else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        // console.log(e.target.parentElement.classList('delete-item'));
        if(confirm('Are you Sure')) {
            e.target.parentElement.parentElement.remove();

            //remove task from localstorage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem){ 
    console.log(task);
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }   else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent == task){
            tasks.splice(index,1)
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(){
    // taskList.innerHTML = '';

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTaskFromLocalStorage()

}

function clearTaskFromLocalStorage(){
    localStorage.clear();
}

function filterTask(e){
    const text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll('.collection-item').forEach( function(task){
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1 ){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

