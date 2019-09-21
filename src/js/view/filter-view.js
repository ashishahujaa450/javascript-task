import {
    domData
} from './base';

//get filter query
export const getFilter = () => {
    return domData.taskFilter.value
}


//hide all cards
export const hideCard = (card) => {
    Array.from(card).forEach((elm) => {
        elm.style.display = 'none';
    })
}


//show all cards
export const showCard = (card) => {
    Array.from(card).forEach((elm) => {
        elm.style.display = 'block';
    })
}


//show only completed
export const showCompleted = (card) => {
    Array.from(card).forEach((elm) => {
        elm.parentElement.parentElement.parentElement.style.display = 'block'
    })
}

//show only expired
export const showExpired = (card) => {
    Array.from(card).forEach((elm) => {
        elm.parentElement.parentElement.parentElement.style.display = 'block'
    })
}