import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { BackendService, Task, User } from "src/app/backend.service";
import * as fromTaskSelector from "../selectors/task.selector"
import * as fromTasksAction from "../actions/task.action"

@Injectable()
export class TaskService {
  constructor(private _backendService: BackendService, private _store: Store) {}

  get tasks$(): Observable<Task[]> {
    return this._store.select(fromTaskSelector.selectTasks);
  }

  get currentTasks$(): Observable<Task> {
    return this._store.select(fromTaskSelector.currentTask);
  }

  get user$(): Observable<User[]> {
    return this._store.select(fromTaskSelector.selectUsers);
  }

  get currentUser$(): Observable<User> {
    return this._store.select(fromTaskSelector.currentUser);
  }

  getTasks(): Observable<Task[]> {
    return this._backendService.tasks();
  }

  getUsers(): Observable<User[]> {
    return this._backendService.users();
  }

  completeTask(taskId: number): Observable<Task> {
    return this._backendService.complete(taskId, true);
  }

  assignTask(userId: number, taskId: number): Observable<Task> {
    return this._backendService.assign(taskId, userId);
  }

  addNewTask(description: string): Observable<Task> {
    return this._backendService.newTask({description});
  }

  dispatchGetTasks(): void {
    this._store.dispatch(fromTasksAction.loadTasks());
  }

  dispatchGetUsers(): void {
    this._store.dispatch(fromTasksAction.loadUsers());
  }

  dispatchSetCurrentTaskId(taskId: number): void {
    this._store.dispatch(fromTasksAction.setCurrentTaskId({taskId}));
  }

  dispatchCompleteTask(taskId: number): void {
    this._store.dispatch(fromTasksAction.completeTask({taskId}));
  }

  dispatchAddNewTask(taskDescription: string): void {
    this._store.dispatch(fromTasksAction.addNewTask({taskDescription}));
  }

  dispatchAssignTask(userId: number, taskId: number): void {
    this._store.dispatch(fromTasksAction.assignTask({userId, taskId}));
  }
}
