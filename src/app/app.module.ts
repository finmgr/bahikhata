import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MaterialModule} from './material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from'@angular/common/http';
import { AddItemComponent } from './add-item/add-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReportComponent } from './report/report.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { LoginHomeComponent } from './login-home/login-home.component';
import { RegisterHomeComponent } from './register-home/register-home.component';
import { MyHttpInterceptor } from './http-interceptor.service';
import { BottomSheetOverviewSheet } from './bottom-sheet-overview-sheet/bottom-sheet-overview-sheet.component';
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddItemComponent,
    ReportComponent,
    AddCategoryComponent,
    LoginHomeComponent,
    RegisterHomeComponent,
    BottomSheetOverviewSheet
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MyHttpInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
