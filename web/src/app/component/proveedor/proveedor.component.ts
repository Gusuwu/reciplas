import { AfterViewInit,Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { Proveedor } from '../../modelo/proveedor';
import { ProveedorService } from '../../servicios/proveedor.service';


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit, AfterViewInit {
  columns: any[]=[];
  rows: any[]=[];

  datatableMessages: any = {
    emptyMessage: 'Sin datos para mostrar',
    totalMessage: 'registros',
    selectedMessage: ''
  };

  items : Proveedor[] = [];
  seleccionado = new Proveedor();

  label = '';

  columnas: string[] = ['Nombre', 'Telefono','Direccion', 'CUIT','acciones'];
  dataSource = new MatTableDataSource<Proveedor>();

  form = new FormGroup({});

  mostrarFormulario = false;

  constructor(
    private proveedorService: ProveedorService,
    private formBuilder: FormBuilder,
    public matDialog: MatDialog) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    
    this.form= this.formBuilder.group({
      ID_Proveedor: [''],
      Nombre: [''], 
      Telefono: [''],    
      Direccion: [''], 
      CUIT: [''],
    });

    this.actualizar();
  }

  actualizarTabla() {
    this.dataSource.data = this.items;
    this.dataSource.paginator = this.paginator;
  }

  actualizar(){
    this.proveedorService.get().subscribe(
      (producto) => {
        this.items = producto;
        this.actualizarTabla();
      }
    ) 
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  agregar() {
    this.label = 'Agregar proveedor'
    this.form.reset();
    this.seleccionado = new Proveedor();
    this.mostrarFormulario = true;
  }
  edit(seleccionado: Proveedor) {
    this.label = 'Editar proveedor';
    this.mostrarFormulario = true;
    this.seleccionado = seleccionado;
    this.form.setValue(seleccionado);
  }
  
  guardar() {
    if (!this.form.valid) {
      return;
    }

    Object.assign(this.seleccionado, this.form.value);
    
    if(this.seleccionado.ID_Proveedor) {
      this.proveedorService.put(this.seleccionado)
        .subscribe(() => {
          this.items = this.items.filter(x => x.ID_Proveedor !== this.seleccionado.ID_Proveedor);
          this.items.push(this.seleccionado);  
        });
    } else {
      this.proveedorService.post(this.seleccionado)
        .subscribe(() => {
          this.items = this.items.filter(x => x.ID_Proveedor !== this.seleccionado.ID_Proveedor);
          this.items.push(this.seleccionado);  
        });
    }
    this.mostrarFormulario = false;
    this.actualizar();
  }

  delete(seleccionado: Proveedor) {
    this.proveedorService.delete(seleccionado.ID_Proveedor).subscribe(
        (producto) => {
          this.actualizar();
        }
      ) 
  }


  cancelar(){
    this.mostrarFormulario = false;
  }

}
