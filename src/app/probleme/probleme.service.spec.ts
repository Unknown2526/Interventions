import { TestBed, inject } from '@angular/core/testing';

import { ProblemeService } from './probleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProblemeService]
    });
  });

  it('should be created', inject([ProblemeService], (service: ProblemeService) => {
    expect(service).toBeTruthy();
  }));
});
