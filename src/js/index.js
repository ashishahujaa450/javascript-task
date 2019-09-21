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


        //counter
        countDownTimer(todoItem.id, todoItem.totalTime)
    } else {
        alert('please enter correct value')
    }

}



//event goes here
domData.taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});






/**
 * countdown timer 
 */

const countDownTimer = (elementId, countDownDate) => {
    //get elm
    let elm;

    if (elementId) {
        elm = document.querySelector(`#${elementId} p.priority > span.time`)
    }


    var interval = setInterval(() => {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        elm.innerHTML = hours + "h " +
            minutes + "m " + seconds + "s ";

        // If the count down is over, write some text 
        if (distance < 0) {
            //clearinterval
            clearInterval(interval);

            //getting current status
            const currentStatus = state.todoList.getStatus(elementId);

            //change task status to expire
            state.todoList.updateStatus(elementId, 'expired')

            //update ui
            addTaskView.taskExpiredRenderUi(elementId, currentStatus, state.todoList.getStatus(elementId));

            elm.innerHTML = 'Task Expired!'

        }
    }, 1000);



}