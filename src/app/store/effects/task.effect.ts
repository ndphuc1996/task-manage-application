import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { TaskService } from "../services/task.service";
import { Injectable } from "@angular/core";
import * as fromTasksAction from "../actions/task.action"
import { EMPTY } from "rxjs";
@Injectable()
export class TaskEffect {
  constructor(
    private _actions$: Actions,
    private _taskService: TaskService
  ) {}

  loadTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromTasksAction.loadTasks),
      switchMap(() =>
        this._taskService.getTasks().pipe(
          map((tasks) => ( fromTasksAction.loadTasksSuccess({tasks})))
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromTasksAction.loadUsers),
      switchMap(() =>
        this._taskService.getUsers().pipe(
          map((users) => ( fromTasksAction.loadUsersSuccess({users})))
        )
      )
    )
  );

  completeTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromTasksAction.completeTask),
      switchMap((action) =>
        this._taskService.completeTask(action.taskId).pipe(
          map((updatedTask) => ( fromTasksAction.completeTaskSuccess({updatedTask}))),
          catchError((error) => {
            fromTasksAction.completeTaskFailed({error: error.message});
            return EMPTY;
          })
        )
      ),
    )
  );

  addNewTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromTasksAction.addNewTask),
      switchMap((action) =>
        this._taskService.addNewTask(action.taskDescription).pipe(
          map((task) => ( fromTasksAction.addNewTaskSuccess({task})))
        )
      )
    )
  );

  assignTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromTasksAction.assignTask),
      switchMap((action) =>
        this._taskService.assignTask(action.userId, action.taskId).pipe(
          map((updatedTask) => ( fromTasksAction.assignTaskSuccess({updatedTask})))
        )
      )
    )
  );
}
