import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/caracteres-validator';
import { ProblemeService } from './probleme.service';
import { ITypeProbleme } from './probleme';
import { emailMatcherValidator } from '../shared/emailMatcher-validator';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typeProbleme: ITypeProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private problemes: ProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['', [VerifierCaracteresValidator.sansEspaces(), VerifierCaracteresValidator.longueurMinimum(3)]],
      nom: ['', [VerifierCaracteresValidator.sansEspaces(), VerifierCaracteresValidator.longueurMinimum(3)]],
      noProbleme: ['', Validators.required],
      type: ['', Validators.required],
      notification:['notifier'],
      telephone: [{ value: '', disabled: true }],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }],
      }),
    });

    this.problemes.obtenirTypeProbleme()
      .subscribe(type => this.typeProbleme = type,
      error => this.errorMessage = <any>error);

    this.problemeForm.get('notification').valueChanges.subscribe(value => this.appliquerNotifications(value));
  }

  appliquerNotifications(type: string): void {
    const telephoneNoti = this.problemeForm.get('telephone');
    const courrielNoti = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmNoti = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const courrielGroup = this.problemeForm.get('courrielGroup');

    telephoneNoti.clearValidators();
    telephoneNoti.reset();
    telephoneNoti.disable();

    courrielNoti.clearValidators();
    courrielNoti.reset();
    courrielNoti.disable();

    courrielConfirmNoti.clearValidators();
    courrielConfirmNoti.reset();
    courrielConfirmNoti.disable();

    if (type === 'ParCourriel') {
      telephoneNoti.disable();
      courrielNoti.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielNoti.enable();
      courrielConfirmNoti.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielConfirmNoti.enable();
      courrielGroup.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);
    }
    else {
      if (type === 'ParMessagerie') {
        telephoneNoti.enable();
        telephoneNoti.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]);
        courrielNoti.disable();
        courrielConfirmNoti.disable();
      }
    }

    telephoneNoti.updateValueAndValidity();
    courrielNoti.updateValueAndValidity();
    courrielConfirmNoti.updateValueAndValidity();
    courrielGroup.updateValueAndValidity();
  }
}
