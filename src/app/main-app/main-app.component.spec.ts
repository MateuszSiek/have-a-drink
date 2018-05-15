import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { MainAppComponent } from './main-app.component';
import { MainAppModule } from './main-app.module';
import { CoreModule } from '../core/core.module';
import { StoreService } from './services/store.service';
import { MockMainAppStoreService } from '../../../testing/stub/main-app-store.service';
import { MockedDrinks } from '../../../testing/fixtures/drinks';

describe('MainAppComponent', () => {
	let component: MainAppComponent;
	let fixture: ComponentFixture<MainAppComponent>;
	let router: Router;
	let storeService: StoreService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports  : [ MainAppModule, CoreModule, RouterTestingModule ],
			providers: [
				{ provide: StoreService, useClass: MockMainAppStoreService },
			]
		});

	}));

	beforeEach(inject([ Router ], ( _router: Router ) => {
		router = _router;
		spyOn(router, 'navigate').and.returnValue(new Promise((resolve => {})));
		TestBed.compileComponents();
		fixture = TestBed.createComponent(MainAppComponent);
		storeService = TestBed.get(StoreService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should update url with drink name', () => {
		expect(router.navigate).toHaveBeenCalledWith([ '/' ], {
			queryParams: { 'drink': MockedDrinks[ 0 ].name.toLowerCase() },
		});
	});

	it('next button should call service', () => {
		const spy = spyOn(storeService, 'setNextDrink');
		fixture.nativeElement.querySelector('.next-button').click();
		expect(spy).toHaveBeenCalled();
	});

	it('prev button should call service', () => {
		const spy = spyOn(storeService, 'setPreviousDrink');
		fixture.nativeElement.querySelector('.prev-button').click();
		expect(spy).toHaveBeenCalled();
	});

	it('keyboar event should set next/previous drink', fakeAsync(() => {
		const spyNext = spyOn(storeService, 'setNextDrink');
		component.onKeyDown({ keyCode: 40 } as KeyboardEvent);
		tick(1000);
		component.onKeyDown({ keyCode: 39 } as KeyboardEvent);
		expect(spyNext).toHaveBeenCalledTimes(2);

		const spyPrevious = spyOn(storeService, 'setPreviousDrink');
		tick(1000);
		component.onKeyDown({ keyCode: 38 } as KeyboardEvent);
		tick(1000);
		component.onKeyDown({ keyCode: 37 } as KeyboardEvent);
		expect(spyPrevious).toHaveBeenCalledTimes(2);
		discardPeriodicTasks();
	}));
});
