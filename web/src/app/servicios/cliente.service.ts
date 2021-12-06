import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from '../core/api-service';
import { AppConfigService } from '../core/config.service';
import { Cliente } from '../modelo/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService 
  extends ApiService<Cliente>{

  constructor(
    protected http: HttpClient,
    protected app: AppConfigService,
  ) 
  {
    super("cliente", http, app);
   }
}
