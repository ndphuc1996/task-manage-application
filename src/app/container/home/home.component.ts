import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, combineLatest, of } from "rxjs";
import {
  filter,
  map, switchMap, takeUntil, tap, withLatestFrom
} from "rxjs/operators";
import { Task } from "src/app/backend.service";
import { TaskService } from "src/app/store/services/task.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  filteredOptions: Observable<string[]>;
  filteredTasks$ = new BehaviorSubject<Task[]>(null);
  newTaskDescription: string;
  keywordSearch: string;
  testTasksData: Task[];
  private _destroy$ = new Subject<void>();
  private _searchKey$ = new Subject<string>();

  get tasks$(): Observable<Task[]> {
    return this._taskService?.tasks$;
  }

  constructor(private _taskService: TaskService, private _router: Router, private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dispatchGetTasks();
    this._listenTasksChange();
    this._listenSearchKeyChange();
    this.subscribeTasksForUnitTest();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  goToItems(id: number): void {
    this._router.navigateByUrl(`/detail/${id}`);
  }

  search(): void {
    this._searchKey$.next(this.keywordSearch);
  }

  addNewTask(newTaskDescription: string): void {
    if (!newTaskDescription) {
      return;
    }

    this._taskService.dispatchAddNewTask(newTaskDescription);
    this.newTaskDescription = "";
    this._searchKey$.next("");
    this.keywordSearch = "";
  }

  dispatchGetTasks(): void {
    this._taskService.dispatchGetTasks();
  }

  subscribeTasksForUnitTest(): void {
    // Get tasks for unit test;
    this._taskService.getTasks()
      .pipe(tap((value) => {
        if (value) {
          this.testTasksData = [...value]
        }
      }), takeUntil(this._destroy$))
      .subscribe()
  }

  private _listenTasksChange(): void {
    combineLatest([this.tasks$])
      .pipe(
        filter(([tasks]) => !!tasks?.length),
        map(([tasks]) => {
          this.filteredTasks$.next(tasks);
          this._cdr.detectChanges();
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  private _listenSearchKeyChange(): void {
    this._searchKey$
      .pipe(
        withLatestFrom(this.tasks$),
        switchMap(([keyword, tasks]) => {
          if (!keyword) {
            this.filteredTasks$.next(tasks);
            this._cdr.detectChanges();
            return of();
          }
          const filterTasks = tasks.filter((task) =>
            task.description
              ?.toLocaleLowerCase()
              ?.includes(keyword?.toLocaleLowerCase())
          );
          this.filteredTasks$.next(filterTasks);
          this._cdr.detectChanges();
          return of();
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }
}
