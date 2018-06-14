import { call, put } from 'redux-saga/effects';

//Instruments
import { api, token } from 'config/api';
import { tasksActions } from "bus/tasks/actions";
import { stateActions } from "bus/state/actions";
import { store } from 'init/store';

export function* callDeleteTaskWorker ({ payload: taskID }) {
    try {
        yield put(stateActions.isSpinning(true));
        yield put(stateActions.checkIsAllCompleted(store.getState().tasks.filter((task) => task.get('id') !== taskID).every((task) => task.get('completed') === true)));

        const responce = yield call(fetch, `${api}/${taskID}`, {
            method:  "DELETE",
            headers: {
                Authorization: token,
            },
        });

        if (responce.status !== 204) {
            throw new Error('delete task error!');
        }

        yield put(tasksActions.removeTask(taskID));
    } catch (error) {
        yield console.log(`callCreateTaskWorker error ${error}`);
    } finally {
        yield put(stateActions.isSpinning(false));
    }

}
