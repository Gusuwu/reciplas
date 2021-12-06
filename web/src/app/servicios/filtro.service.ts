import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  private filtro = new Subject<string>();

  constructor() { 
  }

  filtroSeteado(filtros: string){
    this.filtro.next(filtros);
  }

  getFiltro(): Observable<string>{
    return this.filtro.asObservable();
  }
}
