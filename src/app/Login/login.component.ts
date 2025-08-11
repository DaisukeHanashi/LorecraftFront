import { Component } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { InternalFunctions } from '../../services/internalfunctions';
import { HttpService } from '../../services/httpservice';
import { Constants } from '../../utilities/constants';
import { LocalService } from '../../services/localservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm!: FormGroup;
isLoading : boolean = false;
isSuccess : boolean = false;
passwordFieldType = 'password';
private readonly httpInstance : HttpService;


constructor(private constant : Constants, private router: Router, private httpService : HttpService, private localService : LocalService) {
this.httpInstance = httpService.instance;
}

ngOnInit(): void {

    this.loginForm = new FormGroup({
      email : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      type : new FormControl('Email')
    });
  }

  get password(){
    return this.loginForm.get('password');
  }


  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  async handleSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    try {
      const loginCredentials = this.loginForm.value;
      const json = JSON.stringify(loginCredentials);
      const response = await this.httpInstance.postJsonData(this.constant.account, json, this.constant.login);
      const result = JSON.parse(response);

    if(this.constant.isAllOkay(result.code))
      this.showSuccess(result);
    else
      this.showInvalid(result);

    } catch (error) {
      // Handle authentication error
      console.error('Authentication failed:', error);
      this.loginForm.get('password')?.setErrors({ serverError: true });
    } finally {
      this.isLoading = false;
    }
  }

  showSuccess(accountResponse : any): void {
    this.isSuccess = true;
    this.isLoading = false;
    const role = accountResponse.data.role;

    this.saveAuthenticatedAccount(accountResponse);

    setTimeout(() => {
      console.log('Redirecting to workspace...');  // Navigate to their particular authenticated screen (based on role)

      if(role === this.constant.admin)
      this.router.navigate(['/workspace']);

    }, 3000);
  }

    showInvalid(accountResponse : any): void {
    const acc = JSON.parse(accountResponse);
    const errorMessage = acc.message;

    setTimeout(() => {
      alert(errorMessage);
      console.error(errorMessage); // Show the Error Modal
    }, 3000);
  }

  private saveAuthenticatedAccount(accountResponse : any) : void
  {
    this.localService.saveData(this.constant.accessToken, accountResponse.data.access_token);
    this.localService.saveData(this.constant.accessRole, accountResponse.data.role);
    this.localService.saveData(this.constant.accountID, accountResponse.id64);
  }

}
