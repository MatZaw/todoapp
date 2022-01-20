import {Component, Input, OnInit} from '@angular/core';
import {AdminService} from "../admin.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'admin-task',
  templateUrl: './admin-task.component.html',
  styleUrls: ['./admin-task.component.css']
})
export class AdminTaskComponent implements OnInit {

  @Input()
  task: any
  @Input()
  index!: number
  @Input()
  username!: string
  formGroup!: FormGroup

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.formGroup = new FormGroup({
      task: new FormControl('',[Validators.required])
    })
  }
  delete(){
    console.log("Username: " + this.username)
    console.log("index: " + this.index)
    this.adminService.deleteTask(this.username,this.index).subscribe(response => {
      console.log(response)
    })
  }
  modify(){
    this.adminService.modifyTask(this.username, this.formGroup.get("task")?.value, this.index).subscribe( response => {
      console.log(response)
    })
  }

}
