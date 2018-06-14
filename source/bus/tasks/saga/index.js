//Core
import { takeEvery } from "redux-saga/effects";

//Instruments
import { asyncTypes } from "./asyncTypes";
import { callCreateTaskWorker } from "./workers/createTask";
import { callDeleteTaskWorker } from "./workers/deleteTask";
import { callUpdateTaskWorker } from "./workers/updateTask";

export const tasksWatchers = Object.freeze({
    * watchCreateTaskAsync () {
        yield takeEvery(asyncTypes.CREATE_TASK_ASYNC, callCreateTaskWorker);
    },
    * watchDeleteTaskAsync () {
        yield takeEvery(asyncTypes.DELETE_TASK_ASYNC, callDeleteTaskWorker);
    },
    * watchUpdateTaskAsync () {
        yield takeEvery(asyncTypes.UPDATE_TASK_ASYNC, callUpdateTaskWorker);
    },
});
