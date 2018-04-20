import { VerifierCaracteresValidator } from "./caracteres-validator";
import { AbstractControl } from "@angular/forms/src/model";

describe('sansEspaces Validator', () => {
    it('une chaîne vide est invalide', () => {
        let control = { value : ""};
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['plage']).toBe(false);
    });

    it('une chaîne avec 10 espaces est invalide', () => {
        let control = { value : "          "};
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['plage']).toBe(false);
    });

    it('une phrase avec des mots est valide', () => {
        let control = { value : "Je suis à l'école."};
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['plage']).toBe(true);
    });

    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        let control = { value : "   bonjour et bye   "};
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['plage']).toBe(true);
    });
});

describe('longueurMinimum Validator', () => {
    it('une expression avec 1 espace et 2 caractères est invalide', () => {
        let control = { value : " xx"};
        control.value = control.value.trim();
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['plage']).toBe(false);
    });

    it('une expression avec 2 espaces et 1 caractère est invalide', () => {
        let control = { value : "  x"};
        control.value = control.value.trim();
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['plage']).toBe(false);
    });

    it('une phrase avec 3 espaces et 3 caractères est valide', () => {
        let control = { value : "   J'aime Angular"};
        //control.value = control.value.trim();
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['plage']).toBe(true);
    });

    it('une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        let control = { value : "     J'aime Angular     "};
        //control.value = control.value.trim();
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['plage']).toBe(true);
    });
});