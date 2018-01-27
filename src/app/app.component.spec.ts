import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppModule } from './app.module';
import { StoreService } from './core/services/store.service';
import { MockStoreService } from '../../testing/stub/store.service.stub';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports  : [
        AppModule
      ],
      providers: [
        { provide: StoreService, useClass: MockStoreService },
      ]

    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
