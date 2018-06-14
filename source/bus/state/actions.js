import { types } from "./types";

export const stateActions = Object.freeze({
    searchTaskName: (taskName) => ({
        type:    types.SEARCH_TASK_NAME,
        payload: taskName,
    }),
    newTaskName: (taskName) => ({
        type:    types.NEW_TASK_NAME,
        payload: taskName,
    }),
    editTaskName: (taskName) => ({
        type:    types.EDIT_TASK_NAME,
        payload: taskName,
    }),
    editorID: (taskID) => ({
        type:    types.EDITOR_ID,
        payload: taskID,
    }),
    isAllCompleted: (isCompleted) => ({
        type:    types.IS_ALL_COMPLETED,
        payload: isCompleted,
    }),
    checkIsAllCompleted: (isCompleted) => ({
        type:    types.CHECK_IS_ALL_COMPLETED,
        payload: isCompleted,
    }),
    isSpinning: (isSpinning) => ({
        type:    types.IS_SPINNING,
        payload: isSpinning,
    }),
});
