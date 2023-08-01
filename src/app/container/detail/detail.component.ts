import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable, Subject } from "rxjs";
import {
  filter,
  map,
  startWith,
  takeUntil,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { Task, User } from "src/app/backend.service";
import { TaskService } from "src/app/store/services/task.service";

@Component({
  selector: "detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit, OnDestroy {
  control = new FormControl("");
  filteredStreets: Observable<string[]>;
  assigneeName: string;
  filteredOptions$: Observable<any[]>;
  private _destroy$ = new Subject<void>();

  get currentTask$(): Observable<Task> {
    return this._taskService.currentTasks$;
  }

  get currentUser$(): Observable<User> {
    return this._taskService.currentUser$;
  }

  get users$(): Observable<User[]> {
    return this._taskService.user$;
  }
  constructor(
    private _route: ActivatedRoute,
    private _taskService: TaskService,
    private _cdr: ChangeDetectorRef
  ) {
    this._taskService.dispatchGetTasks();
    this._taskService.dispatchGetUsers();
  }

  ngOnInit(): void {
    this._listenRouteParamsChange();
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(""),
      withLatestFrom(this.users$),
      map(([keywordSearch, users]) => this._filter(keywordSearch, users))
    );
    this._listenCurrentUserChange();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  completeTask(taskId: number): void {
    this._taskService.dispatchCompleteTask(taskId);
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent, taskId: number): void {
    const userId = event.option.id;
    this._taskService.dispatchAssignTask(+userId, taskId);
  }

  private _listenCurrentUserChange(): void {
    this.currentUser$
      .pipe(
        filter((user) => !!user),
        tap((user) => {
          this.assigneeName = user.name;
          this._cdr.detectChanges();
        }, takeUntil(this._destroy$))
      )
      .subscribe();
  }

  private _listenRouteParamsChange(): void {
    this._route.params
      .pipe(
        tap((params: Params) => {
          if (params?.id) {
            this._taskService.dispatchSetCurrentTaskId(params?.id);
          }
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  private _filter(value: string, users: User[]): User[] {
    const filterValue = this._normalizeValue(value);
    return users?.filter((user) =>
      this._normalizeValue(user.name).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, "");
  }
}
