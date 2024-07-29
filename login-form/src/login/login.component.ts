import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Form group to manage the login form
  loginForm: FormGroup;
  // Error message to display validation or login errors
  errorMessage: string = '';

  // Predefined username and password for login validation
  private readonly validUsername: string = 'admin';
  private readonly validPassword: string = 'password123';

  
  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the login form with validators
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Method to handle form submission
  onSubmit() {
    // Check if the form is valid
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // Validate the username and password
      if (username === this.validUsername && password === this.validPassword) {
        // Navigate to the homepage on successful login
        this.router.navigate(['/homepage']);
      } else {
        // Set error message for invalid credentials
        this.errorMessage = 'Invalid username or password';
      }
    } else {
      // Set error message if form fields are empty
      this.errorMessage = 'Username and password are required';
    }
  }

  // Getter for the username form control
  get username() {
    return this.loginForm.get('username')!;
  }

  // Getter for the password form control
  get password() {
    return this.loginForm.get('password')!;
  }
}