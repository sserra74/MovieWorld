import { FormGroup } from '@angular/forms';
    
export function ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
       
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
       
        if (control.value !== matchingControl.value) {
            console.log("2");
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            console.log("3");
            matchingControl.setErrors(null);
        }
    }
}