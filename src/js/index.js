import {
    domData
} from './view/base';

//import model
import Task from './model/Task';

//import view
import * as addTaskView from './view/task-view';
import * as filterView from './view/filter-view';
import * as searchView from './view/search-view';
import * as chartView from './view/pie-view';

/**
 * state
 */

const state = {};

/**
 * window event goes here
 */

window.addEventListener('load', e => {
    //initialize task into state
    state.todoList = new Task();
});

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
        const todoItem = state.todoList.addItem(
            taskItem.taskTitle,
            taskItem.taskExpireTime,
            taskItem.taskPriority
        );

        //ready ui for chagnes
        addTaskView.clearFields();

        //update ui
        addTaskView.renderTask(todoItem);

        //counter
        countDownTimer(todoItem.id, todoItem.totalTime);
    } else {
        alert('please enter correct value');
    }
};

//edit controller
const editTitle = e => {
    //get clicked item id
    const itemId = e.target.parentElement.parentElement.parentElement.id;

    //enable input edit
    const titleInput = document.querySelector(`#${itemId} input.task-title`);

    titleInput.disabled = false;
    titleInput.focus();

    //action on pressing 'enter'
    titleInput.addEventListener('keypress', e => {
        if (e.keyCode === 13) {
            state.todoList.updateTitle(itemId, titleInput.value);

            //again disable input
            titleInput.disabled = true;
        }
    });
};

//complete task controller
const completeTask = e => {
    //get clicked item id
    const itemId = e.target.parentElement.parentElement.id;

    //get current status
    const currentStatus = state.todoList.getStatus(itemId);

    //change status into state
    state.todoList.updateStatus(itemId, 'completed');

    //update ui
    addTaskView.updateStatusId(
        itemId,
        currentStatus,
        state.todoList.getStatus(itemId)
    );
};

//delete task controller
const deleteTask = e => {
    //get clicked item id
    const itemId = e.target.parentElement.parentElement.id;

    //remove item from state
    state.todoList.deleteTask(itemId);

    //remove item form ui
    const element = document.querySelector(`#${itemId}`);
    element.parentElement.removeChild(element);
};

// task filter controller goes here
const taskFilter = (e) => {
    //get selected query
    const query = filterView.getFilter();

    //accessint all cards here so that they will not change order
    const allCard = document.querySelectorAll('div.card');
    const cardCompleted = document.querySelectorAll('#s-completed');
    const cardExpired = document.querySelectorAll('#s-expired');

    //filter with status
    switch (query) {
        case 'completed':
            filterView.hideCard(allCard);
            filterView.showCompleted(cardCompleted);
            break;

        case 'expired':
            filterView.hideCard(allCard);
            filterView.showExpired(cardExpired);
            break;

        default:
            filterView.showCard(allCard);
    }
}


// search task controller
const taskSearch = (e) => {
    //get search keyword
    const searchKeyWord = e.target.value.toLowerCase();


    //do search
    const idArr = searchView.searchTask(state.todoList.taskList, searchKeyWord)

    //show result
    searchView.renderResult(idArr)
}


//chart show controller
const showData = (e) => {
    domData.chartContainer.style.display = 'block'
    chartView.drawChart(state.todoList.getCount('completed'), state.todoList.getCount('expired'), state.todoList.getCount('pending'))
}



//event goes here
domData.taskForm.addEventListener('submit', e => {
    e.preventDefault();
    addTask();
});


/**
 * filter process starts here
 */
domData.taskFilter.addEventListener('change', (e) => {
    taskFilter(e);
})

/**
 * search process start here
 */

domData.searchFilter.addEventListener('keyup', (e) => {
    taskSearch(e);
})




/**
 * task list wrapper event with event delegation
 */
domData.taskListWrapper.addEventListener('click', e => {
    //edit controller here
    if (e.target.matches('span.edit, span.edit *')) {
        //edit title controller
        editTitle(e);
    }

    //complete task event here
    if (e.target.matches('button.complete-task, button.complete-task *')) {
        //complete controller
        completeTask(e);
    }

    //delete task event here
    if (e.target.matches('button.delete-task, button.delete-task')) {
        //delete controller
        deleteTask(e);
    }
});


/**
 * chart show event goes here
 */

domData.showData.addEventListener('click', showData);




/**
 * countdown timer
 */

const countDownTimer = (elementId, countDownDate) => {
    //get elm
    let elm;

    if (elementId) {
        elm = document.querySelector(`#${elementId} p.priority > span.time`);
    }

    const interval = setInterval(() => {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        if (state.todoList.getStatus(elementId)) {
            let status = state.todoList.getStatus(elementId);

            // Time calculations for days, hours, minutes and seconds
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            elm.innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's ';

            // If the count down is over, write some text
            if (distance < 0) {
                //clearinterval
                clearInterval(interval);

                //getting current status
                const currentStatus = state.todoList.getStatus(elementId);

                //change task status to expire
                state.todoList.updateStatus(elementId, 'expired');

                //update ui
                addTaskView.taskExpiredRenderUi(
                    elementId,
                    currentStatus,
                    state.todoList.getStatus(elementId)
                );

                elm.innerHTML = 'Task Expired!';
            } else if (status === 'completed') {
                elm.innerHTML = 'Task Completed!';
                //clearinterval
                clearInterval(interval);
            }
        } else {
            //clearinterval
            clearInterval(interval);
        }
    }, 1000);
};