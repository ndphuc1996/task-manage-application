import { createSelector } from "@ngrx/store";
import * as fromTasks from "../reducer/task.reducer";

interface AppState {
  tasks: fromTasks.TaskState;
}

export const selectTasksState = createSelector(
  (state: AppState) => state,
  (value) => value.tasks
);
export const selectTasks = createSelector(
  selectTasksState,
  (selectTasksState) => selectTasksState?.tasks
);

export const currentTaskId = createSelector(
  selectTasksState,
  (state) => state.currentTaskId
);

export const currentTask = createSelector(
  selectTasks,
  currentTaskId,
  (tasks, id) => tasks?.find((task) => task.id === +id)
);

export const selectUsers = createSelector(
    selectTasksState,
    (state) => state.users
  );

export const currentUser = createSelector(
    selectUsers,
    currentTask,
    (users, task) => users?.find((user) => user.id === +task?.assigneeId)
  );
