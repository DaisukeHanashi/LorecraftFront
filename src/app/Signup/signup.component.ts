import { Component } from '@angular/core';
import { Constants } from '../../utilities/constants';
import { CountryCode, Gender } from '../../utilities/types';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { InternalFunctions } from '../../services/internalfunctions';
import { HttpService } from '../../services/httpservice';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm! : FormGroup;
  GenderOptions : Gender[];
  CountryCodes : CountryCode[];
  passwordFieldType = 'password';
  confirmFieldType = 'password';
  isNotMatch = false;
constructor(private constant : Constants, private router : Router, private functions : InternalFunctions, private httpService : HttpService)
{
  this.GenderOptions = constant.genderOptions;
  this.CountryCodes = constant.CountryCodes;
}

ngOnInit() : void {
  const internalInstance = this.functions.instance;

 this.signUpForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, internalInstance.allLettersValidator]),
    middle_name: new FormControl('', [internalInstance.allLettersValidator]),
    last_name: new FormControl('', [Validators.required, internalInstance.allLettersValidator]),
    pen_name: new FormControl('', [Validators.required, internalInstance.allLettersValidator]),
    birthdate : new FormControl('', [Validators.required]),
    gender : new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, internalInstance.personalDomainValidator]),
    contact_num: new FormControl('', [Validators.required, internalInstance.allDigitsValidator]),
    country_code : new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, internalInstance.passwordValidator]),
    confirm_password : new FormControl('', [Validators.required])
  });
}


async handleRegister() : Promise<void> {
  console.log("Button clicked");

  const originalPassword = this.signUpForm.get('password')?.value;
  const confirmPassword = this.signUpForm.get('confirm_password')?.value;

  if(this.functions.IsConfirmTheSameToOriginal(originalPassword, confirmPassword))
  {
    alert("Passwords don't match");
    return;
  }


  if(this.signUpForm.invalid){
    this.signUpForm.markAllAsTouched();
    return;
  }

  try
  {
    const registration = this.signUpForm.value;
    const json = JSON.stringify(registration);

    const response = await this.httpService.postJsonData(this.constant.account, json, this.constant.register);
    const result = JSON.parse(response);

    console.log(result.code);

    if(this.constant.isAllOkay(result.code))
      this.navigateToLoginScreen()
    else
      this.showInvalid(result);

  } catch(error)
  {
    console.error('Authentication failed:', error);
  }
}

  navigateToLoginScreen(): void {
    setTimeout(() => {
      console.log('Redirecting to login...');
      this.router.navigate(['/login']);
    }, 1500);
  }

  showInvalid(registerResponse : any) : void {
    setTimeout(() => {
      alert(registerResponse.message);
    }, 1500);
  }



  togglePasswordVisibility(event: MouseEvent): void {
    const elementID = (event.currentTarget as HTMLElement).id;

    if(elementID === 'confirm-password')
    this.confirmFieldType = this.confirmFieldType === 'password' ? 'text' : 'password';
    else
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
