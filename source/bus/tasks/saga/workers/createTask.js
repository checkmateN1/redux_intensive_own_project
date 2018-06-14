import { call, put } from "redux-saga/effects";

//Instruments
import { api, token } from "config/api";
import { tasksActions } from "bus/tasks/actions";
import { stateActions } from "bus/state/actions";

export function* callCreateTaskWorker ({ payload: taskName }) {
    try {
        yield put(stateActions.isSpinning(true));
        yield put(stateActions.isAllCompleted(false));

        const responce = yield call(fetch, `${api}`, {
            method:  "POST",
            headers: {
                Authorization:  token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: taskName }),
        });

        const { data: task, message } = yield call([responce, responce.json]);

        if (responce.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.createTask(task));
    } catch (error) {
        yield console.log(`callCreateTaskWorker error ${error}`);
    } finally {
        yield put(stateActions.isSpinning(false));
    }
}
