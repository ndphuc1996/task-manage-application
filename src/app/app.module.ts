import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BackendService} from './backend.service';
import { AppRoutingModule } from './app.routing.module';
import { StoreModule } from '@ngrx/store';
import { TaskService } from './store/services/task.service';
import * as fromTasks from './store/reducer/task.reducer'
import * as fromTasksEffect from './store/effects/task.effect'
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({'tasks': fromTasks.taskReducer}),
    EffectsModule.forRoot([fromTasksEffect.TaskEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),

  ],
  providers: [BackendService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
