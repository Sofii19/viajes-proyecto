import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPaqueteComponent } from './cards-paquete.component';

describe('CardsPaqueteComponent', () => {
  let component: CardsPaqueteComponent;
  let fixture: ComponentFixture<CardsPaqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsPaqueteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
