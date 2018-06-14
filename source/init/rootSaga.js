//Core   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import { all } from "redux-saga/effects"; //что делает all?

//Instruments
import { tasksWatchers } from "bus/tasks/saga";

export function* rootSaga () {
    yield all([
        tasksWatchers.watchCreateTaskAsync(),
        tasksWatchers.watchDeleteTaskAsync(),
        tasksWatchers.watchUpdateTaskAsync()
    ]);
}
