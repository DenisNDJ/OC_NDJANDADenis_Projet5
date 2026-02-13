import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function authValidator(): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {

        const HasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(ctrl.value);

        const hasUpperCase = /[A-Z]+/.test(ctrl.value);

        const hasLowerCase = /[a-z]+/.test(ctrl.value);

        const hasNumeric = /[0-9]+/.test(ctrl.value);

        const passwordValid = HasSpecialChar && hasUpperCase && hasLowerCase && hasNumeric;

        if(passwordValid){
            return null;
        } else {
           return { validValidator: ctrl.value };
        }
    };
}

export function mePassValidator(): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {

        const HasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(ctrl.value);

        const hasUpperCase = /[A-Z]+/.test(ctrl.value);

        const hasLowerCase = /[a-z]+/.test(ctrl.value);

        const hasNumeric = /[0-9]+/.test(ctrl.value);

        const passwordValid = HasSpecialChar && hasUpperCase && hasLowerCase && hasNumeric;

        if(passwordValid || ctrl.value==""){
            return null;
        } else {
           return { mePassValidator: ctrl.value };
        }
    };
}