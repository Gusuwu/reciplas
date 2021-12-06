import { AfterViewInit,Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Producto } from '../../modelo/producto';
import { ProductoService } from '../../servicios/producto.service'

import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit, AfterViewInit {
  columns: any[]=[];
  rows: any[]=[];

  datatableMessages: any = {
    emptyMessage: 'Sin datos para mostrar',
    totalMessage: 'registros',
    selectedMessage: ''
  };

  items : Producto[] = [];
  seleccionado = new Producto();

  label = '';

  columnas: string[] = ['Nombre', 'Descripcion','Stock', 'Precio', 'Estado_Entrega', 'Stock_Futuro','acciones'];
  dataSource = new MatTableDataSource<Producto>();

  form = new FormGroup({});

  mostrarFormulario = false;

  constructor(
    private productoService: ProductoService,
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
      ID_Producto: [''],
      Nombre: [''], 
      Stock: [''],    
      Precio: [''], 
      Estado_Entrega: [''],
      Descripcion: [''],
      Stock_Futuro: ['']
    });

    this.actualizar();
  }

  actualizarTabla() {
    this.dataSource.data = this.items;
    this.dataSource.paginator = this.paginator;
  }

  actualizar(){
    this.productoService.get().subscribe(
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
    this.label = 'Agregar producto'
    this.form.reset();
    this.seleccionado = new Producto();
    this.mostrarFormulario = true;
  }
  edit(seleccionado: Producto) {
    this.label = 'Editar producto';
    this.mostrarFormulario = true;
    this.seleccionado = seleccionado;
    this.form.setValue(seleccionado);
  }
  
  guardar() {
    if (!this.form.valid) {
      return;
    }

    Object.assign(this.seleccionado, this.form.value);
    
    if(this.seleccionado.ID_Producto) {
      this.productoService.put(this.seleccionado)
        .subscribe(() => {
          this.items = this.items.filter(x => x.ID_Producto !== this.seleccionado.ID_Producto);
          this.items.push(this.seleccionado);  
        });
    } else {
      this.productoService.post(this.seleccionado)
        .subscribe(() => {
          this.items = this.items.filter(x => x.ID_Producto !== this.seleccionado.ID_Producto);
          this.items.push(this.seleccionado);  
        });
    }
    this.mostrarFormulario = false;
    this.actualizar();
  }

  delete(seleccionado: Producto) {
    this.productoService.delete(seleccionado.ID_Producto).subscribe(
        (producto) => {
          this.actualizar();
        }
      ) 
  }


  cancelar(){
    this.mostrarFormulario = false;
  }

}
