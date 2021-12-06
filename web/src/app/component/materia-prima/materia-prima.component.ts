import { AfterViewInit,Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { MateriaPrima } from 'src/app/modelo/materia-prima';
import { MateriaPrimaService } from 'src/app/servicios/materia-prima.service';
import { Proveedor } from 'src/app/modelo/proveedor';
import { ProveedorService } from 'src/app/servicios/proveedor.service';


@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.scss']
})
export class MateriaPrimaComponent implements OnInit, AfterViewInit {
  columns: any[]=[];
  rows: any[]=[];

  datatableMessages: any = {
    emptyMessage: 'Sin datos para mostrar',
    totalMessage: 'registros',
    selectedMessage: ''
  };

  items : MateriaPrima[] = [];
  seleccionado = new MateriaPrima();
  proveedores : Proveedor[] = [];

  label = '';

  columnas: string[] = ['Nombre', 'Precio','Cantidad', 'ProveedorNombre','acciones'];
  dataSource = new MatTableDataSource<MateriaPrima>();

  form = new FormGroup({});

  mostrarFormulario = false;

  constructor(
    private materiaPrimaService: MateriaPrimaService,
    private proveedorServices : ProveedorService,
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
        ID_MateriaPrima: [''],
      Nombre: [''],   
      Precio: [''], 
      Cantidad: [''],
      ID_Proveedor: [''],
      ProveedorNombre: ['']
    });

    this.actualizar();
    this.getProveedores();
  }

  actualizarTabla() {
    this.dataSource.data = this.items;
    this.dataSource.paginator = this.paginator;
  }


  actualizar(){
    this.materiaPrimaService.get().subscribe(
      (producto) => {
        this.items = producto;
        this.actualizarTabla();
      }
    ) 
  }


  getProveedores(){
    this.proveedorServices.get().subscribe(
      (producto) => {
        this.proveedores = producto;
      }
    ) 
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  agregar() {
    this.label = 'Agregar materia prima'
    this.form.reset();
    this.seleccionado = new MateriaPrima();
    this.mostrarFormulario = true;
  }
  edit(seleccionado: MateriaPrima) {
    this.label = 'Editar materia prima';
    this.mostrarFormulario = true;
    this.seleccionado = seleccionado;
    this.form.setValue(seleccionado);
  }
  
  guardar() {
    if (!this.form.valid) {
      return;
    }

    Object.assign(this.seleccionado, this.form.value);
    
    if(this.seleccionado.ID_MateriaPrima) {
      this.materiaPrimaService.put(this.seleccionado)
        .subscribe(() => {
          this.items = this.items.filter(x => x.ID_MateriaPrima !== this.seleccionado.ID_MateriaPrima);
          this.items.push(this.seleccionado);  
        });
    } else {
      this.materiaPrimaService.post(this.seleccionado)
        .subscribe(() => {
          this.items = this.items.filter(x => x.ID_MateriaPrima !== this.seleccionado.ID_MateriaPrima);
          this.items.push(this.seleccionado);  
        });
    }
    this.mostrarFormulario = false;
    this.actualizar();
  }

  delete(seleccionado: MateriaPrima) {
    this.materiaPrimaService.delete(seleccionado.ID_MateriaPrima).subscribe(
        (producto) => {
          this.actualizar();
        }
      ) 
  }


  cancelar(){
    this.mostrarFormulario = false;
  }

}
