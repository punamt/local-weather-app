import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitysearchComponent } from './citysearch.component';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('CitysearchComponent', () => {
  let component: CitysearchComponent;
  let fixture: ComponentFixture<CitysearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,
      ReactiveFormsModule,
       FormsModule],
      declarations: [ CitysearchComponent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitysearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
