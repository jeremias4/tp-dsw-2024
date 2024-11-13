import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

getUsers(){
  return this.http.get("http://localhost:4000/api/events")
}

}


// ng g s services/user