import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = `http://localhost:8080/api`

  constructor(private http:HttpClient) { }

  getAllUsers():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem("token")}`
    })
    return this.http.get(`${this.baseUrl}/management/users`,{ headers: headers})
  }

  addTask(username: string, task: string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem("token")}`
    })

    let json = {
      "username" : username,
      "task": task
    }

    return this.http.post(`${this.baseUrl}/tasks/insert`,json,{ headers: headers})
  }

  deleteTask(username: string, index: number){
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem("token")}`
    })

    let json = {
      "username" : username,
      "index": index
    }

    return this.http.delete(`${this.baseUrl}/tasks/delete`,{ headers: headers, body: json})

  }
  modifyTask(username: string, task: string, index: number){
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem("token")}`
    })

    let json = {
      "username" : username,
      "task" : task,
      "index": index
    }

    return this.http.put(`${this.baseUrl}/tasks/update`,json,{ headers: headers})
  }

}
