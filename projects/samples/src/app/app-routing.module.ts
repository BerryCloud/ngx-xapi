import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XapiCourseComponent } from './xapi-course/xapi-course.component';
import { AppComponent } from './app.component';
import { SamplesComponent } from './samples.component';

const routes: Routes = [
  {
    path: '',
    component: SamplesComponent,
  },
  {
    path: 'xapi-course',
    component: XapiCourseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
