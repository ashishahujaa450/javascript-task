import {
    domData
} from './base';

//getting add task form queries
export const getQuery = () => {
    return {
        taskTitle: domData.taskTitle.value,
        taskExpireTime: domData.taskExpiration.value,
        taskPriority: domData.taskPriority.value
    }
}


//validating add items inputs

export const validateQuery = (title, expiretime, taskPriority) => {
    if (title && expiretime && taskPriority) {
        return true;
    } else {
        return false;
    }
}


//clearing task form inputs
export const clearInput = () => {
    domData.taskTitle.value = '';
}

//rendering task into ui
export const renderTask = (task) => {
    console.log(task);

    let statusMarkup;
    switch (task.status) {

        case 'completed':
            statusMarkup = statusMarkup = `<p> <span class="badge badge-primary">${task.status}</span></p>`;
            break;

        case 'expired':
            statusMarkup = `<p> <span class="badge badge-dark">${task.status}</span></p>`;
            break;

        default:
            statusMarkup = `<p> <span class="badge badge-info">${task.status}</span></p>`;
    }

    const markup = `
    <div class="card w-100 mb-5 shadow-lg ${task.priority}-priority" id="${task.id}">
        <div class="card-body">

            <div class="card-header-wrapper d-flex justify-content-between mb-3">
                <input type="text" class="form-control task-title border-0" value="${task.title}">
                <span class="lnr lnr-pencil"></span>
            </div>

            ${statusMarkup}

            <p class="priority"> <span class="lnr lnr-clock"></span> <span class="time"></span></p>

            <button type="button" class="btn btn-warning complete-task mr-3">Complete</button><button type="button" class="btn btn-danger delete-task">Delete</button>
        </div>
    </div>
    `;


    domData.taskListWrapper.insertAdjacentHTML('beforeend', markup)

}


export const countdown = (minutes, seconds, id) => {
    // Fetch the display element
    var el = document.querySelector(`#${id} .time`);

    // Set the timer
    var interval = setInterval(function () {
        if (seconds == 0) {
            if (minutes == 0) {
                (el.innerHTML = "STOP!");

                clearInterval(interval);
                return;
            } else {
                minutes--;
                seconds = 60;
            }
        }

        if (minutes > 0) {
            var minute_text = minutes + (minutes > 1 ? ' minutes' : ' minute');
        } else {
            var minute_text = '';
        }

        var second_text = seconds > 1 ? '' : '';
        el.innerHTML = minute_text + ' ' + seconds + ' ' + second_text + '';
        seconds--;
    }, 1000);
}