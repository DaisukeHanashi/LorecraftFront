import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";
import { Injectable } from '@angular/core';
import { switchMap, map, Observable } from "rxjs";
import { of, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InternalFunctions
{
  private static _instance : InternalFunctions;
  private constructor() {
  }

  get instance()
  {
    if(!InternalFunctions._instance)
    {
      InternalFunctions._instance = new InternalFunctions();
    }
    return InternalFunctions._instance;
  }

    personalDomainValidator(control: AbstractControl): ValidationErrors | null {
      const email = control.value;
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      const domain = email?.split('@')[1]?.toLowerCase();

       if(!personalDomains.includes(domain)) {
        return { unidentifiedDomain: true }
      }

      return null;
    }

    passwordValidator(control: AbstractControl): ValidationErrors | null {

      console.log("Checking password");

      const password = control.value;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
        console.error("password is the culprit")
        return { invalidStrength: true };
      }
      return null;
    }

    passwordObservableValidator() : AsyncValidatorFn {
      return (control : AbstractControl): Observable<ValidationErrors | null> => {
        console.log("Checking")
        if(!control.value){
          return of(null);
        }

        return timer(500).pipe(
          switchMap(() => of(this.passwordValidator(control))),
        );
    };
    }

    IsConfirmTheSameToOriginal(originalPassword : string, confirmPassword : string) : boolean
    {
      return originalPassword === confirmPassword;
    }

    allLettersValidator(control : AbstractControl): ValidationErrors | null{
      const text = control.value;

      const isAllLetters  = /^[a-zA-Z]+( [a-zA-Z]+)*$/.test(text);

      if(!isAllLetters)
      {
        console.error("allLetters is the culprit" + text)
        return { invalidInput: true};
      }

      return null;
    }

    allDigitsValidator(control : AbstractControl): ValidationErrors | null{
      const text = control.value;

      const isAllDigits = /^[0-9]+$/.test(text);

      if(!isAllDigits)
      {
        console.error("allDigits is the culprit")
        return { invalidInput: true};
      }

      return null;
    }


}
