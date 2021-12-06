import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './component/cliente/cliente.component';
import { HomeComponent } from './component/home/home.component';
import { MateriaPrimaComponent } from './component/materia-prima/materia-prima.component';
import { ProductoComponent } from './component/producto/producto.component';
import { ProveedorComponent } from './component/proveedor/proveedor.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'producto', component: ProductoComponent},
  { path: 'materia-prima', component: MateriaPrimaComponent},
  { path: 'cliente', component: ClienteComponent},
  { path: 'proveedor', component: ProveedorComponent},

  ]
  ;

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static forRoot(routes: Routes) {
    throw new Error('Method not implemented.');
  }
}

