import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/caracteres-validator';
import { ProblemeService } from './probleme.service';
import { ITypeProbleme } from './probleme';

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
      nom: ['', [VerifierCaracteresValidator.sansEspaces(), VerifierCaracteresValidator.longueurMinimum(3)]]
    });

    this.problemes.obtenirTypeProbleme()
    .subscribe(type => this.typeProbleme = type,
               error => this.errorMessage = <any>error);
  }

}
