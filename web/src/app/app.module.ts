import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER,NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import {MatSelectModule } from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import { ProductoComponent } from './component/producto/producto.component';
import { AppConfigService } from './core/config.service';
import { HomeComponent } from './component/home/home.component';
import { MateriaPrimaComponent } from './component/materia-prima/materia-prima.component';
import { ProveedorComponent } from './component/proveedor/proveedor.component';
import { ClienteComponent } from './component/cliente/cliente.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductoComponent,
    MateriaPrimaComponent,
    ProveedorComponent,
    ClienteComponent],
  imports:
   [ BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatOptionModule,
    MatSelectModule,
    MatStepperModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatGridListModule,
    MatCheckboxModule,
    MatMenuModule,
    
  ],
  providers: [AppConfigService,
    { provide: APP_INITIALIZER, useFactory: loadConfig, deps: [AppConfigService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function loadConfig(config: AppConfigService) {
  return () => config.load();
}