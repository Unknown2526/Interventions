import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProblemeService } from './probleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[ProblemeService]
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
    expect(errors['plage']).toBeTruthy();
  });

  it('Zone prénom valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    let errors = zone.errors || {};
    expect(errors['plage']).toBeTruthy();
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

  it('Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications();

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  /*it('Zone TELEPHONE est vide quand ne pas me notifier ', () => {
    component.gestionDates('ParLaPoste');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.gestionDates('ParNotification');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });*/

});
