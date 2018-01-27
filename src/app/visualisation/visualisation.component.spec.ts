import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationComponent } from './visualisation.component';
import { CoreModule } from '../core/core.module';

describe('VisualisationComponent', () => {
  let component: VisualisationComponent;
  let fixture: ComponentFixture<VisualisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [
        CoreModule
      ],
      declarations: [ VisualisationComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
