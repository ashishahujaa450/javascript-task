import uniqid from 'uniqid';

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
      totalTime: new Date().getTime() + parseInt(expireTime),
      id: uniqid()
    };

    //pusshing item into task array
    this.taskList.push(item);

    return item;
  }

  deleteTask(id) {
    //getting indexo of item with same id
    const index = this.taskList.findIndex(item => item.id === id);

    //removing item from  list
    this.taskList.splice(index, 1);
  }

  updateTitle(id, newTitle) {
    //getting item
    const item = this.taskList.find(item => item.id === id);

    //updating new title
    item.title = newTitle;
  }

  updateStatus(id, newStatus) {
    const item = this.taskList.find(item => item.id === id);

    //updating new title
    item.status = newStatus;
  }

  getStatus(id) {
    const item = this.taskList.find(item => item.id === id);

    //if item is detlete than return undefined to clear interval for timer
    if (item) {
      return item.status;
    } else {
      return undefined;
    }
  }
}
