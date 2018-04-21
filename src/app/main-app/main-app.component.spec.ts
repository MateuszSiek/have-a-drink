import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAppComponent } from './main-app.component';
import { MainAppModule } from './main-app.module';
import { CoreModule } from '../core/core.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainAppComponent', () => {
	let component: MainAppComponent;
	let fixture: ComponentFixture<MainAppComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ MainAppModule, CoreModule, RouterTestingModule ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MainAppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
