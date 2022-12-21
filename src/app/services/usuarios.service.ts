import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from "../models/Response";
import { UsuariosModel } from '../models/UsuariosModel';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) { }

  getUsuarios(){
    return this.http.get<Response<UsuariosModel[]>>(`${environment.apisUrl}/user/getUsuarios`);
  }
  getDetalles(id: any){
    return this.http.get<Response<UsuariosModel>>(`${environment.apisUrl}/user/getDetalles/`+id);
  }
  changeStatus(data: any){
    return this.http.put<Response<any>>(`${environment.apisUrl}/user/changeStatus`,data);
  }
  registerPerrera(data: any){
    return this.http.post<Response<any>>(`${environment.apisUrl}/user/registerPerrera`,data);
  }
  getListaPerrera(){
    return this.http.get<Response<UsuariosModel[]>>(`${environment.apisUrl}/user/getListaPerrera`);
  }
  getDatos(id: any){
    return this.http.get<Response<UsuariosModel>>(`${environment.apisUrl}/user/getDatos/`+id);
  }
  changeDatos(data: any){
    return this.http.put<Response<any>>(`${environment.apisUrl}/user/changeDatos`,data);
  }
  editUser(data: any){
    return this.http.put<Response<any>>(`${environment.apisUrl}/user/editUser`,data);
  }
}
