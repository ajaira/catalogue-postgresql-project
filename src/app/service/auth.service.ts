import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host: string="http://localhost:8082";
  token:string;
  username:string;
  roles:Array<any>;

  constructor(private http:HttpClient ) { }


  login(data){
    return this.http.post(this.host+"/login",data,{observe:'response'});
  }

  storageToken(token: string) {
    localStorage.setItem('token',token);
    this.token = token;
    this.loadUserFromToken();
  }

  private loadUserFromToken() {
    let helper = new JwtHelperService();
    let decodedToken = helper.decodeToken(this.token);
    this.username = decodedToken.sub;
    this.roles =decodedToken.roles;
  }

  isAdmin(){
    console.log(this.roles.indexOf(({name}) => name==='ADMIN'));
    return this.roles.indexOf(({name}) => name==='ADMIN') >= 0;
  }

  isUser(){
    console.log(this.roles.indexOf(({name}) => name==='USER'));
    return this.roles.indexOf(({name}) => name==='USER') >= 0;
  }

  isAuthenticated() {
    //return this.roles && (this.isAdmin() || this.isUser());
    return this.roles;
  }

  loadToken() {
    this.token = localStorage.getItem('token');
    this.loadUserFromToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.token=undefined;
    this.username=null;
    this.roles=undefined;
  }
}
