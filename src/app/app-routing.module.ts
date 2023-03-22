import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AuthGuard } from './Auth.service';
import { ListComponent } from './list/list.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path: 'dashboard', component: ListComponent, canActivate: [AuthGuard]},
  {path: 'add', component: AddItemComponent, canActivate: [AuthGuard]},
  {path: 'report', component:ReportComponent,canActivate: [AuthGuard]},
  {path: 'category', component:AddCategoryComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
