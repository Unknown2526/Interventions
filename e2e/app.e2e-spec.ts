import { AppPage } from './app.po';

describe('interventions App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Déclarer un problème');
  });

  it('doit activer le bouton Sauvegarder avec champs valides scénario nominal', () => {
    page.setChampsValidesScenarioNominal();
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par message TEXTE', () => {
    page.setChampsValidesScenarioAlternatifParMessageTexte();
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par courriel', () => {
    page.setChampsValidesScenarioAlternatifParCourriel();
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('zone DESCRIPTION DU PROBLÈME a une bordure verte si nombre de caractères suffisant', () => {
    page.setZoneDescriptionProblemeCaracteresSuffisants();
    expect(page.obtenirClasseZoneNomDescriptionProbleme()).toContain('is-valid');
  });
});
