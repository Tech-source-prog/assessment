import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';

class RouterStub {
  navigate(params: any) {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: Router, useClass: RouterStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate form fields', () => {
    let username = component.loginForm.controls['username'];
    let password = component.loginForm.controls['password'];

    expect(username.valid).toBeFalsy();
    expect(password.valid).toBeFalsy();

    username.setValue('admin');
    password.setValue('password123');

    expect(username.valid).toBeTruthy();
    expect(password.valid).toBeTruthy();
  });

  it('should display error message for invalid credentials', () => {
    component.loginForm.controls['username'].setValue('wrong');
    component.loginForm.controls['password'].setValue('credentials');
    component.onSubmit();

    expect(component.errorMessage).toBe('Invalid username or password');
  });

  it('should navigate to homepage for valid credentials', () => {
    spyOn(router, 'navigate');

    component.loginForm.controls['username'].setValue('admin');
    component.loginForm.controls['password'].setValue('password123');
    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/homepage']);
  });
});