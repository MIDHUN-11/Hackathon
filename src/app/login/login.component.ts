import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';


  constructor(private router : Router) {}

  onSubmit() {
    if (this.email && this.password) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      this.successMessage = 'Login successful!';
      console.log(this.successMessage);
      this.router.navigate(['/candidate-list']);
    } else {
      this.errorMessage = 'Please fill in all fields.';
    }
  }
}