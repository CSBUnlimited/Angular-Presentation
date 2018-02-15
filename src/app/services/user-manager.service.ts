import { UserRequest } from './../models/user.request';
import { UserResponse } from './../models/user.response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { UserVM } from '../models/user.vm';

@Injectable()
export class UserManagerService 
{
  private url = "http://localhost:5556/api/user/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllUsers(): Observable<UserResponse>
  {
    return this.httpClient.get<UserResponse>(this.url);
  }

  public addNewUser(newUser: UserVM): Observable<UserResponse>
  {
    let request: UserRequest = { userVM: newUser };
    return this.httpClient.post<UserResponse>(this.url, request);
  }

  public updateUser(updateUser: UserVM): Observable<UserResponse>
  {
    let request: UserRequest = { userVM: updateUser };
    return this.httpClient.put<UserResponse>(this.url, request);
  }

  public deleteUser(userId: number): Observable<UserResponse>
  {
    return this.httpClient.delete<UserResponse>(`${this.url}/${userId}`);
  }
}
