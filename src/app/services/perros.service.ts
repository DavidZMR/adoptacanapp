import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "../models/Response";
import { environment } from 'src/environments/environment';
import { ReportsModel } from '../models/Reports';
import { PerroModel } from '../models/Perro';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  body: {}
};
@Injectable({
  providedIn: 'root'
})
export class PerrosService {

  constructor(
    private http: HttpClient
  ) { }

  report(data: any){
    return this.http.post<Response<any>>(`${environment.apisUrl}/perros/report`,data);
  }
  getRepors(){
    return this.http.get<Response<ReportsModel[]>>(`${environment.apisUrl}/perros/getReports`);
  }
  atenderReport(idReporte: number, idUsuario: any){
    return this.http.get<Response<any>>(`${environment.apisUrl}/perros/atenderReport/`+idReporte+'&'+idUsuario);
  }
  
  getReportInCurso(id: any){
    return this.http.get<Response<ReportsModel>>(`${environment.apisUrl}/perros/getReportInCurso/`+id);
  }
  changeStatus(data: any){
    return this.http.post<Response<any>>(`${environment.apisUrl}/perros/changeReportStatus`,data)
  }
  getPerrosAdopcion(){
    return this.http.get<Response<PerroModel[]>>(`${environment.apisUrl}/perros/getPerrosAdopcion`);
  }
  setSolicitudAdopcion(data: any){
    return this.http.post<Response<PerroModel[]>>(`${environment.apisUrl}/perros/setSolicitudAdopcion`, data);
  }
}
