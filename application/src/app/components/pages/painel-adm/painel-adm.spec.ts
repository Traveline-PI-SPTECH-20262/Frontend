import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelAdm } from './painel-adm';

describe('PainelAdm', () => {
  let component: PainelAdm;
  let fixture: ComponentFixture<PainelAdm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelAdm],
    }).compileComponents();

    fixture = TestBed.createComponent(PainelAdm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
