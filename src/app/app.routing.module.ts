import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./container/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./container/detail/detail.module').then(m => m.DetailModule),
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule {}


