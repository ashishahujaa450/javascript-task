import {
    domData
} from './base';



// getting query
export const getQuery = () => {
    return {
        taskTitle: domData.taskTitle.value,
        taskExpireTime: domData.taskTime.value,
        taskPriority: domData.taskPriority.value
    }
}


//validating data
export const validateTask = (taskObj) => {
    if (taskObj.taskTitle && taskObj.taskExpireTime && taskObj.taskPriority) {
        return true;
    } else {
        return false;
    }
}

//clearing input fields
export const clearFields = () => {
    domData.taskTitle.value = '';
    domData.taskTitle.focus()

}

//render task into ui
export const renderTask = (taskObj) => {
    let status;

    switch (taskObj.status) {
        case 'completed':
            status = `<p> <span class="badge badge-primary" id="s-completed">${taskObj.status}</span></p>`
            break;

        case 'expired':
            status = `<p> <span class="badge badge-primary" id="s-expired">${taskObj.status}</span></p>`
            break;

        default:
            status = `<p> <span class="badge badge-primary" id="s-pending">${taskObj.status}</span></p>`
    }



    const markup = `
    <div class="card w-100 mb-5 shadow-lg ${taskObj.priority}-priority" id="${taskObj.id}">
        <div class="card-body">

            <div class="card-header-wrapper d-flex justify-content-between mb-3">
                <input type="text" class="form-control task-title border-0" disabled value="${taskObj.title}">
                <span class="lnr lnr-pencil edit p-2"></span>
            </div>

            ${status}

            <p class="priority"> <span class="lnr lnr-clock"></span> <span class="time"></span></p>

            <button type="button" class="btn btn-warning complete-task mr-3">Complete</button><button type="button" class="btn btn-danger delete-task">Delete</button>
        </div>
    </div>
    `

    //append markup
    domData.taskListWrapper.insertAdjacentHTML('beforeend', markup);
}


//task expired update ui
export const taskExpiredRenderUi = (expireElmId, currentStatus, newStatus) => {
    //update status id
    updateStatusId(expireElmId, currentStatus, newStatus)

}

const updateStatusId = (elmParent, currentStatus, newStatus) => {
    console.log(elmParent, currentStatus, newStatus)
    const elm = document.querySelector(`#${elmParent} span#s-${currentStatus}`);

    elm.setAttribute('id', `s-${newStatus}`)

    //update status text
    elm.innerHTML = `${newStatus}`
}