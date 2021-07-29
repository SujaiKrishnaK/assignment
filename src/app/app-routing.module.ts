import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MidSectionComponent } from './mid-section/mid-section.component';
import { SideBarComponent } from './side-bar/side-bar.component';

const routes: Routes = [
  {
    path: '',
    component: SideBarComponent,
     children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'mid-section', component: MidSectionComponent }
]
  }]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
