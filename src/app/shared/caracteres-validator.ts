import { ValidatorFn, AbstractControl } from "@angular/forms";

export class VerifierCaracteresValidator {
    static plage(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value <= 0 || c.value == 'undefined') {
            return { 'plage': false };
            }
            return { 'plage': true };
        };
    }
}