// Core
import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

//Instruments
import Styles from "./styles.m.css";
import { tasksActions } from "bus/tasks/actions";
import { tasksActionsAsync } from "bus/tasks/saga/asyncActions";
import { stateActions } from "bus/state/actions";

//Assets
import Edit from "../../theme/assets/Edit";
import Checkbox from "../../theme/assets/Checkbox";
import Remove from "../../theme/assets/Remove";
import Star from "../../theme/assets/Star";


const mapState = (state) => {
    return {
        state: state.state,
    };
};

const mapDispatch  = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                updateTask:      tasksActions.updateTask,
                removeTask:      tasksActions.removeTask,
                updateTaskAsync: tasksActionsAsync.updateTaskAsync,
                deleteTaskAsync: tasksActionsAsync.deleteTaskAsync,
                disableEditing:  stateActions.disableEditing,
                editTaskName:    stateActions.editTaskName,
                editorID:        stateActions.editorID,
            },
            dispatch,
        ),
    };
};

@connect(mapState, mapDispatch)
export default class Task extends Component {
    componentDidUpdate () {
        this.taskInput.focus();
        const val = this.taskInput.value;

        this.taskInput.value = '';
        this.taskInput.value = val;
    }

    _changeEditState = () => {
        if (this.props.state.get('editorID')) {
            this.props.actions.editTaskName('');
            this.props.actions.editorID('');

            return false;
        }

        this.props.actions.editTaskName(this.props.taskName);
        this.props.actions.editorID(this.props.taskID);
    };

    _removeTask = () => {
        this.props.actions.deleteTaskAsync(this.props.taskID);
    };

    _updateTask = (event) => {
        const eventKey = event.key;
        const { taskName, taskID, isCompleted, isFavorite } = this.props;

        if (eventKey === "Enter" && this.props.state.get('editTaskName') !== taskName) {
            this.props.actions.updateTaskAsync(taskID, this.props.state.get('editTaskName'), isCompleted, isFavorite);

            this.props.actions.editTaskName('');
            this.props.actions.editorID('');

            return false;
        }
        if (eventKey === "Escape") {
            this.props.actions.editTaskName('');
            this.props.actions.editorID('');

            return false;
        }
    };

    _changeNewName = (event) => {
        const value = event.target.value;

        if (value.split('').length > 50) {
            return false;
        }

        this.props.actions.editTaskName(value);
    };

    _changeCompleted = () => {
        const { taskName, taskID, isCompleted, isFavorite } = this.props;

        this.props.actions.updateTaskAsync(taskID, taskName, !isCompleted, isFavorite);
    };

    _changeFavorite = () => {
        const { taskName, taskID, isCompleted, isFavorite } = this.props;

        this.props.actions.updateTaskAsync(taskID, taskName, isCompleted, !isFavorite);
    };

    render () {
        const {
            isFavorite,
            isCompleted,
        } = this.props;

        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <div className = { Styles.complete }>
                        <Checkbox
                            checked = { isCompleted }
                            color1 = { 'var(--paletteColor3)' }
                            color2 = { 'var(--paletteColor2)' }
                            onClick = { this._changeCompleted }
                        />
                    </div>
                    <input
                        disabled = { this.props.state.get('editorID') !== this.props.taskID }
                        ref = { (input) => { this.taskInput = input; } }
                        type = { 'text' }
                        value = { this.props.state.get('editorID') === this.props.taskID ? this.props.state.get('editTaskName') : this.props.taskName }
                        onChange = { this._changeNewName }
                        onKeyDown = { this._updateTask }
                    />
                </div>
                <div className = { Styles.actions }>
                    <div className = { Styles.setPriority }>
                        <Star
                            checked = { isFavorite }
                            color1 = { 'var(--paletteColor3)' }
                            onClick = { this._changeFavorite }
                        />
                    </div>
                    <div className = { Styles.edit }>
                        <Edit color1 = { 'var(--paletteColor3)' } onClick = { this._changeEditState } />
                    </div>
                    <Remove onClick = { this._removeTask } />
                </div>
            </li>
        );
    }
}
