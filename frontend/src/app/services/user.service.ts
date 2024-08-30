import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { appUsers } from '../../settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpclient = inject(HttpClient);
  private baseUrl: string;

  constructor() { 
    this.baseUrl = `${appUsers.apiUrl}`;
  }

  register(formvalue: any){
    return firstValueFrom(
      this.httpclient.post<any>(`${this.baseUrl}/register`, formvalue)
    )
  }
}
