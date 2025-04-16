import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ){
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  handleSubmit(){
    if(this.authForm.invalid){
      this.authForm.markAllAsTouched();
      return;
    }

    // console.log(this.authForm.value);
    
    this.authService.login(this.authForm.value).subscribe({
      next: (data:any) =>{
        // console.log(data);
        localStorage.setItem('user', JSON.stringify(data.user))
        alert("Đăng nhập thành công")
        this.router.navigate(['/product'])
      },
      error: (err) =>{
        alert(err.error)
      }
    })
  }
}
