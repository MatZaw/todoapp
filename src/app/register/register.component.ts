import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../auth-service.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  formGroup!: FormGroup;

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }
  register(){
    console.log("username: " + this.formGroup.get("username")?.value)
    console.log("password: " + this.formGroup.get("password")?.value)
    this.authService.register(this.formGroup.get("username")?.value, this.formGroup.get("password")?.value)
  }
}
