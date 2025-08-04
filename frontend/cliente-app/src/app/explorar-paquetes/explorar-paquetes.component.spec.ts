import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorarPaquetesComponent } from './explorar-paquetes.component';

describe('ExplorarPaquetesComponent', () => {
  let component: ExplorarPaquetesComponent;
  let fixture: ComponentFixture<ExplorarPaquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorarPaquetesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorarPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
