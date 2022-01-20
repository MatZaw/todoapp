import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../auth-service.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  formGroup!: FormGroup;

  constructor(private authService: AuthServiceService, private router: Router){ }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }
  login(){
    if(this.formGroup?.valid){
      this.authService.login(this.formGroup.value);
    }

    if(localStorage.getItem("token")){
      this.authService.getUser().subscribe(response => {
        if(response.role === "USER"){
          this.router.navigate(['/todo', response.username])
        }else{
          this.router.navigate(['/admin'])
        }
      })
    }

  }
}
