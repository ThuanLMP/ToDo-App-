import { SET_TASK_NAME, SET_TASK_DESCRIPTION, ADD_TASK, UPDATE_LIST_TASK, UPDATE_SHOW_LIST, UPDATE_EDIT_FORM, SET_TASK, UPDATE_TASK_IN_LIST, SET_TASK_EDIT_NAME,SET_TASK_EDIT_DESCRIPTION, SET_TASK_DEADLINE, SET_TASK_EDIT_DEADLINE } from './constants'



export const setTaskName = payload => ({
    type: SET_TASK_NAME,
    payload
})
export const setTaskDescription = payload => ({
    type: SET_TASK_DESCRIPTION,
    payload
})

export const setTaskDeadline = payload => ({
    type: SET_TASK_DEADLINE,
    payload
})

export const addTask = payload => ({
    type: ADD_TASK,
    payload
})

export const updateListTask = payload => ({
    type: UPDATE_LIST_TASK,
    payload
})

export const updateShowList = payload => ({
    type: UPDATE_SHOW_LIST,
    payload
})

export const updateEditForm = payload => ({
    type: UPDATE_EDIT_FORM,
    payload
})

export const setTask = payload => ({
    type: SET_TASK,
    payload
})

export const updateTaskInList = payload => ({
    type: UPDATE_TASK_IN_LIST,
    payload
})

export const setTaskEditName = payload => ({
    type: SET_TASK_EDIT_NAME,
    payload
})

export const setTaskEditDescription = payload => ({
    type: SET_TASK_EDIT_DESCRIPTION,
    payload
})
export const setTaskEditDeadline = payload => ({
    type: SET_TASK_EDIT_DEADLINE,
    payload
})