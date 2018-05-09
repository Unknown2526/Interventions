import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProblemeService } from './probleme.service';
import { HttpClientModule } from '@angular/common/http';
import { emailMatcherValidator } from '../shared/emailMatcher-validator';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ProblemeComponent],
      providers: [ProblemeService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Zone prénom invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  it('Zone prénom valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    let errors = zone.errors || {};
    expect(errors['plage']).toBeNull();
  });

  it('Zone prénom valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    let errors = zone.errors || {};
    expect(errors['plage']).toBeNull();
  });

  it('Zone prénom invalide avec aucune valeur', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['minLength']).toBeFalsy();
  });

  it('Zone prénom invalide avec 1 caractère', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(1));
    errors = zone.errors || {};
    expect(errors['minLength']).toBeFalsy();
  });

  it('Zone prénom valide avec 50 espaces', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(50));
    expect(zone.valid).toBeFalsy();
  });

  it('Zone prénom valide avec 2 espaces et 1 caractère', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('  a');
    expect(zone.valid).toBeFalsy();
  });

  //TP12
  it('Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('PasNotifier');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone TELEPHONE est vide quand ne pas me notifier ', () => {
    component.appliquerNotifications('PasNotifier');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).not.toEqual(null);
  });

  it('Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('PasNotifier');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('PasNotifier');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  //TP13
  it('Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');

    expect(zone.status).not.toEqual('DISABLED');
  });

  it('Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');

    expect(zone.status).not.toEqual('DISABLED');
  });

  it('Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('a1235@');

    expect(zone.valid).toBeFalsy();
  });

  it('Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotifications('ParCourriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('a@hotmail.com');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};


    expect(errors['match']).toBeUndefined();
  });

  it('Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications('ParCourriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone2.setValue('a@hotmail.com');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};


    expect(errors['match']).toBeUndefined();
  });

  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('abc@hotmail.com')
    zone2.setValue('123@hotmail.com');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};


    expect(errors['match']).toBeTruthy();
  });

  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('abc1@hotmail.com')
    zone2.setValue('abc1@hotmail.com');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};


    expect(errors['match']).toBeUndefined();
  });
  //TP14

  it('Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessagerie');

    let zone = component.problemeForm.get('telephone');

    expect(zone.status).not.toBe('DISABLED');
  });

  it('Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessagerie');

    let zone = component.problemeForm.get('courrielGroup.courriel');

    expect(zone.status).toBe('DISABLED');
  });

  it('Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessagerie');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');

    expect(zone.status).toBe('DISABLED');
  });

  it('Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessagerie');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    errors = zone.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('Zone TELEPHONE est invalide avec des caractères nonnumériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessagerie');

    let zone = component.problemeForm.get('telephone');
    zone.setValue('abc');

    expect(zone.invalid).toBeTruthy();
  });

  it('Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessagerie');

    let zone = component.problemeForm.get('telephone');
    zone.setValue('123456789');

    expect(zone.invalid).toBeTruthy();
  });

  it('Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessagerie');

    let zone = component.problemeForm.get('telephone');
    zone.setValue('12345678910');

    expect(zone.invalid).toBeTruthy();
  });
  
  it('Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessagerie');

    let zone = component.problemeForm.get('telephone');
    zone.setValue('1234567890');

    expect(zone.valid).toBeTruthy();
  });

});
