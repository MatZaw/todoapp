import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl = `http://localhost:8080/api`

  constructor(private http:HttpClient,private router: Router) { }

  login(data: any){
    console.log(data)
    return this.http.post(`${this.baseUrl}/auth/login`, data , {observe: 'response'})
      .subscribe(response => {
        console.log(response.status);
        if(response.status === 200){
          localStorage.setItem("token", JSON.parse(JSON.stringify(response.body)).token)
        }else{
          alert("Wrong password or username")
        }
    })
  }

  register(username: string, password: string){
    let json = {
      "username" : username,
      "password": password,
      "tasks":[],
      "role": "USER"
    }
    return this.http.post(`${this.baseUrl}/users/register`, json , {observe: 'response'})
      .subscribe(response => {
        console.log(response.status);
        if(response.status === 200){
          alert("User created")
          this.router.navigate([''])
        }else{
          alert("Bad data")
        }
      })
  }
  getUser(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem("token")}`
    })
    return this.http.get(`${this.baseUrl}/users`, {headers: headers})
  }

  getTasks(username: any): Observable<any>{

    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem("token")}`
    });

    return this.http.get(`${this.baseUrl}/tests/${username}`,{ headers: headers});





    // return fetch(`${this.baseUrl}/tasks/${username}`, {
    //   method: "GET",
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem("token")}`
    //   }
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json()
    //     } else {
    //       throw new Error('AdminService | enableTap | Error')
    //     }
    //   })
  }
}
