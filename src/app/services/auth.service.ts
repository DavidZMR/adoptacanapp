import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "../models/Response";
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  body: {}
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(data: any){
    return this.http.post<Response<any>>(`${environment.apisUrl}/user/register`,data);
  }
  loginUser(data: any){
    return this.http.post<Response<UserModel>>(`${environment.apisUrl}/user/login`,data);
  }
}
