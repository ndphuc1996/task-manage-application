import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BackendService, Task } from "src/app/backend.service";
import { TaskService } from "src/app/store/services/task.service";
import { HomeComponent } from "./home.component";
import { of } from "rxjs";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let actions: Actions;
  let element: HTMLElement;
  let dbgElement: DebugElement;
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [HomeComponent],
      providers: [TaskService, BackendService,
        provideMockStore(),
        provideMockActions(() => actions)
      ],

    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    dbgElement = fixture.debugElement.query(By.css("#new-task"));
    element = dbgElement.nativeElement;
    fixture.detectChanges();
  });

  it('call get task', (async () => {
    spyOn(component, 'dispatchGetTasks');
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.dispatchGetTasks).toHaveBeenCalled();
  }));

  it('call add new task', (async () => {
    spyOn(component, 'addNewTask');
    const button = fixture.debugElement.nativeElement.querySelector('#add-new-task');
    button.click();
    expect(component.addNewTask).toHaveBeenCalled();
  }));
  it('Check data in component when calling service', fakeAsync(() => {
      const service = TestBed.inject(TaskService);
      const response: Task[] = [
        {
          id: 0,
          description: "Install a monitor arm",
          assigneeId: 111,
          completed: false
        }
      ]

      spyOn(service, 'getTasks').and.returnValue(of(response))
      component.ngOnInit();
      tick();
      expect(component.testTasksData).toEqual(response);
    }));
});
