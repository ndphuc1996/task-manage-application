import { Action, createReducer, on } from '@ngrx/store';
import { Task, User } from 'src/app/backend.service';
import * as fromTasksAction from '../actions/task.action'

export const tasksFeatureKey = 'tasks';

export interface TaskState {
  tasks: Task[];
  currentTaskId: number,
  users: User[];
}

const initialState: TaskState = {
  tasks: null,
  currentTaskId: 0,
  users: null,
};

export const taskReducer = createReducer(
  initialState,
  on(fromTasksAction.loadTasksSuccess, (state, {tasks}) => {
    return { ...state, tasks };
  }),
  on(fromTasksAction.setCurrentTaskId, (state, {taskId}) => {
    return { ...state, currentTaskId: taskId };
  }),
  on(fromTasksAction.loadUsersSuccess, (state, {users}) => {
    return { ...state, users };
  }),

  on(fromTasksAction.completeTaskSuccess, (state, {updatedTask}) => {
    const updatedTasks = state?.tasks?.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    })
    return { ...state, tasks: [...updatedTasks]};
  }),

  on(fromTasksAction.addNewTaskSuccess, (state, {task}) => {
    return { ...state, tasks: [...state.tasks, task]};
  }),

  on(fromTasksAction.assignTaskSuccess, (state, {updatedTask}) => {
    const updatedTasks = state?.tasks?.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    })
    return { ...state, tasks: [...updatedTasks]};
  }),
);

