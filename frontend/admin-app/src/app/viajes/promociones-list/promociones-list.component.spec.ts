import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionesListComponent } from './promociones-list.component';

describe('PromocionesListComponent', () => {
  let component: PromocionesListComponent;
  let fixture: ComponentFixture<PromocionesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromocionesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
