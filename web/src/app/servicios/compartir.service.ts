
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompartirService {

    private subjet = new ReplaySubject<number>(); 
    private subjetBitacora = new Subject<number>(); 

  constructor() {
  }

  public get recibir() {
    return this.subjet.asObservable()
  }

  public get recibirBitacora() {
    return this.subjetBitacora.asObservable()
  }

  public enviarBitacora(id: number): void {
    this.subjetBitacora.next(id);
  }

  public enviar(id: number): void {
    this.subjet.next(id);
  }
  
}
