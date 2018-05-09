import { ValidatorFn, AbstractControl } from "@angular/forms";

export class VerifierCaracteresValidator {
    static sansEspaces(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value.trim() == 0) {
                return { 'plage': false };
            }
            else {
                return { 'plage': null };
            }
        };
    }

    static longueurMinimum(min: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value.trim().length < min) {
                return { 'plage': false };
            }
            else {
                return { 'plage': null };
            }
        };
    }
}