import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { ApiService } from '../core/api-service';
import {AppConfigService} from '../core/config.service';

import { Producto } from '../modelo/producto'

@Injectable({
  providedIn: 'root'
})
export class ProductoService
  extends ApiService<Producto>{
  constructor(
    protected http: HttpClient,
    protected app: AppConfigService, 
  ) {
    super("producto",http , app);
   }
}
