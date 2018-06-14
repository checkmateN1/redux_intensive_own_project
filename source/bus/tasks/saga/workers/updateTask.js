import { call, put } from 'redux-saga/effects';

//Instruments
import { api, token } from 'config/api';
import { tasksActions } from "bus/tasks/actions";
import { stateActions } from "bus/state/actions";
import { store } from 'init/store';

export function* callUpdateTaskWorker ({ payload }) {
    try {
        yield put(stateActions.isSpinning(true));

        const { taskID, newTaskName, completed, favorite } = payload;

        if (!completed) {
            yield put(stateActions.isAllCompleted(false));
        } else {
            yield put(stateActions.checkIsAllCompleted(store.getState().tasks.filter((task) => task.get('id') !== taskID).every((task) => task.get('completed') === true)));
        }

        const responce = yield call(fetch, `${api}`, {
            method:  "PUT",
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{
                id:      taskID,
                message: newTaskName,
                completed,
                favorite,
            }]),
        });

        const { data: task, message } = yield call([responce, responce.json]);

        if (responce.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.updateTask(task));
    } catch (error) {
        yield console.log(`callCreateTaskWorker error ${error}`);
    } finally {
        yield put(stateActions.isSpinning(false));
    }

}
