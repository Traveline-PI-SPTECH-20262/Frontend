import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAgencia } from './register-agencia';

describe('RegisterAgencia', () => {
  let component: RegisterAgencia;
  let fixture: ComponentFixture<RegisterAgencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAgencia],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterAgencia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
