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

    //set local storage
    this.setStorage()

    return item;
  }

  deleteTask(id) {
    //getting indexo of item with same id
    const index = this.taskList.findIndex(item => item.id === id);

    //removing item from  list
    this.taskList.splice(index, 1);

    //set local storage
    this.setStorage()
  }

  updateTitle(id, newTitle) {
    //getting item
    const item = this.taskList.find(item => item.id === id);

    //updating new title
    item.title = newTitle;

    //set local storage
    this.setStorage()
  }

  updateStatus(id, newStatus) {
    const item = this.taskList.find(item => item.id === id);

    //updating new title
    item.status = newStatus;

    //set local storage
    this.setStorage()
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

  //get count for chart creation

  getCount(status) {
    let taskCount = 0;

    this.taskList.forEach((elm) => {
      if (elm.status === status) {
        taskCount += 1;
      }
    })

    return taskCount;
  }

  //local storage for presist data
  setStorage() {
    localStorage.setItem('task', JSON.stringify(this.taskList))
  }

  getStorage() {
    const storage = JSON.parse(localStorage.getItem('task'))

    if (storage)
      this.taskList = storage;
  }
}