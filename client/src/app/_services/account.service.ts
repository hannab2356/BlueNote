import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';
import {map} from 'rxjs/operators';
import { Password } from '../_models/password';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  currentUserNew: User;
  decodedToken: any;

  constructor(private http: HttpClient) { }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model)
      .pipe(
        map((response: User) => {
          const user = response;
          if (user){
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user));
            this.decodedToken = this.getDecodedToken(user.token);
            this.currentUserNew = user;
            this.setCurrentUser(user);
          }
        })
      );
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model)
      .pipe(
        map((response: User) => {
          const user = response;
          if (user){
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user));
            this.decodedToken = this.getDecodedToken(user.token);
            this.currentUserNew = user;
            this.setCurrentUser(user);
          }
        })
      );
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  updateUser(id: number, model: any) {
    return this.http.put(this.baseUrl + 'users/updateuser/' + id, model);
  }

  updateUserPassword(id: number, model: any) {
    return this.http.put(this.baseUrl + 'users/updatePassword/' + id, model);
  }
}
