import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Upl } from './upl';

describe('Upl', () => {
  let component: Upl;
  let fixture: ComponentFixture<Upl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Upl],
    }).compileComponents();

    fixture = TestBed.createComponent(Upl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
