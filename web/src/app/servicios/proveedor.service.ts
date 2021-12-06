import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { ApiService } from '../core/api-service';
import {AppConfigService} from '../core/config.service';

import { Proveedor } from '../modelo/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService
  extends ApiService<Proveedor>{
  constructor(
    protected http: HttpClient,
    protected app: AppConfigService, 
  ) {
    super("proveedor",http , app);
   }
}
