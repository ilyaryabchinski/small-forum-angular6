import {AbstractControl, ValidatorFn} from '@angular/forms';

export function lettersValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isOnlyLetters = /^[a-zA-Z]+$/.test(control.value);
    return isOnlyLetters ?  null : {'letters': 'should contain only letters'};
  };
}
