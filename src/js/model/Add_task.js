import uniqid from 'uniqid';

export default class Task {
    constructor() {
        this.taskList = []
    }

    addItem(title, expireTime, priority, status = 'pending') {
        const item = {
            title,
            expireTime,
            priority,
            status,
            id: uniqid()
        }

        //pusshing item into task array
        this.taskList.push(item)

        return item;
    }

    deleteTask(id) {
        //getting indexo of item with same id
        const index = this.task.findIndex((item) => item.id === id)

        //removing item from  list
        this.taskList.splice(index, 1)
    }

    updateTitle(id, newTitle) {
        //getting item
        const item = this.task.find((item) => item.id === id);

        //updating new title
        item.title = newTitle;
    }

    updateStatus(id, newStatus) {
        const item = this.task.find((item) => item.id === id);

        //updating new title
        item.status = newStatus;

    }


}