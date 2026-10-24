import { TestBed } from '@angular/core/testing';

import { Painel } from './painel';

describe('Painel', () => {
  let service: Painel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Painel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
