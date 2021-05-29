import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { RegistrationModel } from '../model/RegistrationModel';
import { Url } from '../enviroments/url';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
 
  constructor(private httpClient: HttpClient) { }

  isUserExists(userId:any){
    console.log("User id : * ",userId);
    return this.httpClient
      .get<any>(Url.COMMON_URL+"auth/userExists?userId="+userId)
      .pipe(
        map(userData => {
          
          return userData;
        })


      );
 

  }
  

  register(registrationJson:RegistrationModel) {
    console.log(registrationJson)
    console.log(Url.COMMON_URL+"auth/registration")
    
    return this.httpClient
      .post<any>(Url.COMMON_URL+"auth/registration", 
      registrationJson)
      .pipe(
        map(userData => {

          return userData;
        })


      );
  }}

 