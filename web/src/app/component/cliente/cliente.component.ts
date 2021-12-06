import { AfterViewInit,Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { Cliente } from '../../modelo/cliente';
import { ClienteService } from '../../servicios/cliente.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit, AfterViewInit {
  columns: any[]=[];
  rows: any[]=[];

  datatableMessages: any = {
    emptyMessage: 'Sin datos para mostrar',
    totalMessage: 'registros',
    selectedMessage: ''
  };

  items : Cliente[] = [];
  seleccionado = new Cliente();

  label = '';

  columnas: string[] = ['Nombre', 'Telefono','Direccion', 'DNI', 'CUIL', 'Fecha_Nacimiento','acciones'];
  dataSource = new MatTableDataSource<Cliente>();

  form = new FormGroup({});

  mostrarFormulario = false;

  constructor(
    private clienteService: ClienteService,
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
      ID_Cliente: [''],
      Nombre: [''], 
      Telefono: [''],    
      Direccion: [''], 
      DNI: [''],
      CUIL: [''],
      Fecha_Nacimiento: [''],
      FechaAlta: ['']
    });

    this.actualizar();
  }

  actualizarTabla() {
    this.dataSource.data = this.items;
    this.dataSource.paginator = this.paginator;
  }

  actualizar(){
    this.clienteService.get().subscribe(
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
    this.label = 'Agregar cliente'
    this.form.reset();
    this.seleccionado = new Cliente();
    this.mostrarFormulario = true;
  }
  edit(seleccionado: Cliente) {
    this.label = 'Editar cliente';
    this.mostrarFormulario = true;
    this.seleccionado = seleccionado;
    this.form.setValue(seleccionado);
  }
  
  guardar() {
    if (!this.form.valid) {
      return;
    }

    Object.assign(this.seleccionado, this.form.value);
    
    if(this.seleccionado.ID_Cliente) {
      this.clienteService.put(this.seleccionado)
        .subscribe(() => {
          this.items = this.items.filter(x => x.ID_Cliente !== this.seleccionado.ID_Cliente);
          this.items.push(this.seleccionado);  
        });
    } else {
      this.clienteService.post(this.seleccionado)
        .subscribe(() => {
          this.items = this.items.filter(x => x.ID_Cliente !== this.seleccionado.ID_Cliente);
          this.items.push(this.seleccionado);  
        });
    }
    this.mostrarFormulario = false;
    this.actualizar();
  }

  delete(seleccionado: Cliente) {
    this.clienteService.delete(seleccionado.ID_Cliente).subscribe(
        (producto) => {
          this.actualizar();
        }
      ) 
  }


  cancelar(){
    this.mostrarFormulario = false;
  }

}
