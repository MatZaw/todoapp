import {Component, Input, OnInit} from '@angular/core';
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input()
  task!: string
  @Input()
  id!:number
  @Input()
  username!: string

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  delete(){
    let text = <HTMLElement> document.getElementById("text-"+this.id)
    text.style.textDecoration = "line-through"
    this.adminService.deleteTask(this.username,this.id).subscribe(result => console.log(result))
    window.location.reload()
  }
}
