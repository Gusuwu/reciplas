import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { ApiService } from '../core/api-service';
import {AppConfigService} from '../core/config.service';

import { MateriaPrima } from '../modelo/materia-prima';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService
  extends ApiService<MateriaPrima> {

  seleccionado = new MateriaPrima();
  tab : number = 0;
  desdeMovil: boolean =false;
  

  constructor(
    protected http: HttpClient,
    protected app: AppConfigService
    
  ) 
  { 
    super("materia-prima",http,app)
  }

  private matPrim = 'http://localhost:8888/index.php/MateriaPrima?ID_MateriaPrima='

  getMateriaPrima(id: number): Observable<MateriaPrima> {
    const url = `${this.matPrim}${id}`;
    return this.http.get<MateriaPrima>(url).pipe(
    );
  }
}
