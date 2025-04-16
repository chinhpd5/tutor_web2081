import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
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
    this.authService.register(this.authForm.value).subscribe({
      next: () =>{
        alert("Đăng ký thành công");
        this.router.navigate(['/login'])
      },
      error: (err) =>{
        // console.log(err);
        alert(err.error)
      }
    })
    
  }
}
