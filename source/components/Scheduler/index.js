// Core
import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';

//Instruments
import Styles from "./styles.m.css";
import { tasksActions } from "bus/tasks/actions";
import { tasksActionsAsync } from "bus/tasks/saga/asyncActions";
import { stateActions } from "bus/state/actions";

//Components
import Task from "components/Task";
import Spinner from "components/Spinner";

//Assets
import Checkbox from "../../theme/assets/Checkbox";

const mapState = (state) => {
    return {
        tasks: state.tasks,
        state: state.state,
    };
};

const mapDispatch  = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                createTask:          tasksActions.createTask,
                createTaskAsync:     tasksActionsAsync.createTaskAsync,
                updateTaskAsync:     tasksActionsAsync.updateTaskAsync,
                searchTaskName:      stateActions.searchTaskName,
                newTaskName:         stateActions.newTaskName,
                isAllCompleted:      stateActions.isAllCompleted,
                checkIsAllCompleted: stateActions.checkIsAllCompleted,
            },
            dispatch,
        ),
    };
};

@connect(mapState, mapDispatch)
export default class Scheduler extends Component {
    constructor () {
        super();

        this.createToDo = ::this._createToDo; //completed
        this.changeSearchNamePart = ::this._changeSearchNamePart; //completed
        this.changeNewTaskName = ::this._changeNewTaskName; //completed
    }

    _changeSearchNamePart = (event) => {
        const value = event.target.value;

        this.props.actions.searchTaskName(value);
    };

    _changeNewTaskName = (event) => {
        const value = event.target.value;

        if (value.split('').length > 50) {
            return false;
        }

        this.props.actions.newTaskName(value);
    };

    _createToDo = (event) => {
        event.preventDefault();
        const newTaskName = this.props.state.get('newTaskName');

        if (!newTaskName) {
            alert("Введите название новой задачи!");

            return;
        }

        this.props.actions.createTaskAsync(newTaskName);
        this.props.actions.newTaskName(''); //reset input value

        return false;
    };

    _filterTasks = (tasks) => {
        return tasks.map((toDo) => (
            <Task
                isCompleted = { toDo.get('completed') }
                isFavorite = { toDo.get('favorite') }
                key = { toDo.get('id') }
                taskID = { toDo.get('id') }
                taskName = { toDo.get('message') }
            />
        ));
    };

    _makeAllTasksCompleted = () => {
        this.props.tasks.forEach((task) => {
            if (task.get('completed') === false) {
                this.props.actions.updateTaskAsync(task.get('id'), task.get('message'), true, task.get('favorite'));
            }
        });

        this.props.actions.isAllCompleted(true);
    };

    _isSearchTaskNameEqual = (task) => {
        const searchTaskName = this.props.state.get('searchTaskName');

        if (searchTaskName) {
            return searchTaskName.split('').join() === task.get('message').split('').slice(0, searchTaskName.split('').length).join();
        }

        return true;
    };

    render () {
        const { tasks, state } = this.props;

        const favoritesTasks = tasks.filter((task) => task.get('favorite') === true && task.get('completed') === false && this._isSearchTaskNameEqual(task));
        const filteredFavoriteTasks = this._filterTasks(favoritesTasks);

        const usualTasks = tasks.filter((task) => task.get('favorite') !== true && task.get('completed') === false && this._isSearchTaskNameEqual(task));
        const filteredUsualTasks = this._filterTasks(usualTasks);

        const completedTasks = tasks.filter((task) => task.get('completed') === true && this._isSearchTaskNameEqual(task));
        const filteredCompletedTasks = this._filterTasks(completedTasks);

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>
                            Планировщик задач
                        </h1>
                        <input
                            type = 'text'
                            value = { state.get('searchTaskName') }
                            onChange = { this.changeSearchNamePart }
                        />
                    </header>

                    <section>
                        <form>
                            <input
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                value = { state.get('newTaskName') }
                                onChange = { this.changeNewTaskName }
                            />
                            <button onClick = { this.createToDo }>Добавить задачу</button>
                        </form>
                        <div>
                            <ul>
                                <div>
                                    <FlipMove>
                                        { filteredFavoriteTasks }
                                        { filteredUsualTasks }
                                        { filteredCompletedTasks }
                                    </FlipMove>
                                </div>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { state.get('isAllCompleted') }
                            color1 = { 'var(--paletteColor5)' }
                            color2 = { 'var(--paletteColor2)' }
                            onClick = { this._makeAllTasksCompleted }
                        />
                        <span className = { Styles.completeAllTasks }>Все задачи выполнены</span>
                    </footer>
                </main>
                <div>
                    <Spinner spin = { this.props.state.get('isSpinning') } />
                </div>
            </section>
        );
    }
}
