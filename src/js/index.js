import {
    domData
} from './view/base'

//model 
import Task from './model/Add_task'


//view
import * as AddTaskView from './view/add_taskView';





//app state
const state = {};






// main app controller starts here



/**
 * window events goes here
 */
window.addEventListener('load', (e) => {
    //creating new task object and push it into state of app
    state.todoList = new Task();
})


/**
 * add task controller
 */
domData.addTaskFrom.addEventListener('submit', (e) => {
    e.preventDefault();

    addTask();
})

//add task function
const addTask = () => {
    //get query from ui
    const todoData = AddTaskView.getQuery();

    //check for query validator
    if (AddTaskView.validateQuery(todoData.taskTitle, todoData.taskExpireTime, todoData.taskPriority)) {
        //create todo item and push it into state
        const todoItem = state.todoList.addItem(todoData.taskTitle, todoData.taskExpireTime, todoData.taskPriority);


        //ready ui for changes
        AddTaskView.clearInput();

        //update ui
        AddTaskView.renderTask(todoItem);

        //use timer
        AddTaskView.countdown(todoItem.expireTime, 0, todoItem.id)
    } else {
        alert('Please enter correct data');
    }
}