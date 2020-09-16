import { Injectable } from '@angular/core';
import { LoginUsuario } from '../models/login-usuario';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Utilisateur } from '../models/Utilisateur';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL ='http://34.72.215.15:8080/auth/';

  constructor(private httpClient: HttpClient) { }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario);
  }
  public updateuser(id: String, nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.put<any>(this.authURL + `update/${id}`, nuevoUsuario);
  }
 
  public infomrations(id: String): Observable<Utilisateur> {
    return this.httpClient.get<Utilisateur>(this.authURL + `infomrations/${id}`);
  }
  public registro(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

}
