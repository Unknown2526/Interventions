import { VerifierCaracteresValidator } from "./caracteres-validator";

describe('sansEspaces Validator', () => {
    it('Zone prénom contient des caractères et pas seulement des espaces', () => {
        let validator = VerifierCaracteresValidator.plage();
        let result = validator(null);
        expect(result['plage']).toBe(true);
    });
});