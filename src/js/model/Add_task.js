const uniqid = require('uniqid');

export default class Task {
    constructor() {
        this.taskList = [];
    }

    addItem(title, expireTime, priority, status = 'pending') {
        const item = {
            title,
            expireTime,
            priority,
            status,
            totalTime: (new Date().getTime() + expireTime), //calculating total time for countdown
            id: uniqid()
        }

        //pushing task item to task array
        this.taskList.push(item)

        return item
    }


    removeItem(id) {
        //finding index
        const index = this.taskList.findIndex((item) => item.id === id);

        //removing item
        this.taskList.splice(index, 1);
    }

    isExpire(totaltime) {
        const now = new Date().getTime();

        if (now > totaltime) {
            this.status = 'expired'
        }
    }


    editItem(id, newTitle) {
        //getting item from id
        const item = this.taskList.find((item) => item.id === id);

        //updating new title
        item.title = newTitle
    }

    updateStatus(id, newStatus) {
        //getting item from id
        const item = this.taskList.find((item) => item.id === id);

        //updating new status
        item.status = newStatus
    }


}