import { createAction, props } from '@ngrx/store';
import { Task, User } from 'src/app/backend.service';

export const loadTasks = createAction('[Tasks] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{tasks: Task[]}>()
);

export const loadTasksError = createAction('[Tasks] Load Task Failed', props<{ error: string }>());

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Tasks] Load Users Success',
  props<{users: User[]}>()
);

export const loadUsersError = createAction('[Tasks] Load Users Failed', props<{ error: string }>());

export const setCurrentTaskId = createAction(
  '[Tasks] Set Current Task Id',
  props<{taskId: number}>()
);

export const completeTask = createAction(
  '[Tasks] Complete Task',
  props<{taskId: number}>()
);

export const completeTaskSuccess = createAction(
  '[Tasks] Complete Task Success',
  props<{updatedTask: Task}>()
);

export const completeTaskFailed= createAction('[Tasks] Complete Task Failed', props<{ error: string }>());


export const addNewTask = createAction(
  '[Tasks] Add New Task',
  props<{taskDescription: string}>()
);

export const addNewTaskSuccess = createAction(
  '[Tasks] Add New Task Success',
  props<{task: Task}>()
);

export const addNewTaskFailed= createAction('[Tasks] Add New Task Failed', props<{ error: string }>());

export const assignTask = createAction(
  '[Tasks] Assign Task',
  props<{userId: number, taskId: number}>()
);

export const assignTaskSuccess = createAction(
  '[Tasks] Assign Task Success',
  props<{updatedTask: Task}>()
);

export const assignTaskFailed= createAction('[Tasks] Assign Task Failed', props<{ error: string }>());

