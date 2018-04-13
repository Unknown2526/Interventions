import { ValidatorFn } from "@angular/forms";

export class VerifierCaracteresValidator {
    static plage(): ValidatorFn {
        return (): { [key: string]: boolean } | null => {
            return { 'plage': true };
        };
    }
}