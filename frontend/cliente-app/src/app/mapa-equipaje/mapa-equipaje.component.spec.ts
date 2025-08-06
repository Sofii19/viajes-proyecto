import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaEquipajeComponent } from './mapa-equipaje.component';

describe('MapaEquipajeComponent', () => {
  let component: MapaEquipajeComponent;
  let fixture: ComponentFixture<MapaEquipajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaEquipajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaEquipajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
