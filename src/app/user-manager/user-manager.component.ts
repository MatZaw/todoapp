import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../admin.service";

@Component({
  selector: 'user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  @Input()
  user: any

  formGroup!: FormGroup;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.formGroup = new FormGroup({
      task: new FormControl('',[Validators.required])
    })
  }
  addTask(){
    this.adminService.addTask(this.user.username, this.formGroup.get("task")?.value).subscribe(response => {
      console.log(response)
    });
    window.location.reload()
  }
}
