import {
    domData
} from './view/base'


//import model
import
Task
from './model/Add_task'


//import view
import * as addTaskView from './view/add_taskView'




/**
 * state
 */

const state = {

}



/**
 * window event goes here
 */

window.addEventListener('load', (e) => {
    //initialize task into state
    state.todoList = new Task()

})






/**
 * add task controller
 */

//add task func here
const addTask = () => {
    //1 get query
    const taskItem = addTaskView.getQuery();

    // validate query
    if (addTaskView.validateTask(taskItem)) {
        //create todo item and push it into state
        const todoItem = state.todoList.addItem(taskItem.taskTitle, taskItem.taskExpireTime, taskItem.taskPriority);

        //ready ui for chagnes
        addTaskView.clearFields();

        console.log(todoItem);
        //update ui
        addTaskView.renderTask(todoItem)
    } else {
        alert('please enter correct value')
    }

}



//event goes here
domData.taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});