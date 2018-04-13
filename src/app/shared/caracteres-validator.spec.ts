import { VerifierCaracteresValidator } from "./caracteres-validator";
import { AbstractControl } from "@angular/forms/src/model";

describe('sansEspaces Validator', () => {
    it('une chaîne vide est invalide', () => {
        let control = { value : ""};
        let validator = VerifierCaracteresValidator.plage();
        let result = validator(control as AbstractControl);
        expect(result['plage']).toBe(false);
    });

    it('une chaîne avec 10 espaces est invalide', () => {
        let control = { value : "          "};
        let validator = VerifierCaracteresValidator.plage();
        let result = validator(control as AbstractControl);
        expect(result['plage']).toBe(false);
    });

    it('une phrase avec des mots est valide', () => {
        let control = { value : "Je suis à l'école."};
        let validator = VerifierCaracteresValidator.plage();
        let result = validator(control as AbstractControl);
        expect(result['plage']).toBe(true);
    });

    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        let control = { value : "   bonjour et bye   "};
        let validator = VerifierCaracteresValidator.plage();
        let result = validator(control as AbstractControl);
        expect(result['plage']).toBe(true);
    });
});