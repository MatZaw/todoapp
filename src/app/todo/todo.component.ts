import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../auth-service.service";
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks: any
  user: any
  sub: any

  constructor(private authService: AuthServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.user = params['username'];
    })

    console.log(this.user)

    this.getTasks()
  }

   getTasks() {
  this.authService.getTasks(this.user).subscribe(result => {
    this.tasks = result
  })




  }
}
