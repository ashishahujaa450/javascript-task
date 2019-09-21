import {
    domData
} from './base';


import {
    hideCard
} from './filter-view';

//search func
export const searchTask = (taskListArr, searchQuery) => {
    let searchArrId = [];

    taskListArr.forEach((elm) => {
        if (elm.title.toLowerCase().indexOf(searchQuery) !== -1) {
            searchArrId.push(elm.id)
        }
    })

    return searchArrId;
}


//render result
export const renderResult = (arr) => {
    const allCard = document.querySelectorAll('div.card')
    hideCard(allCard)

    arr.forEach((elm) => {
        document.querySelector(`#${elm}`).style.display = 'block'
    })
}