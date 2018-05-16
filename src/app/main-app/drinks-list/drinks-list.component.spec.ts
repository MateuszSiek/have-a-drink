import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { DrinksListComponent } from './drinks-list.component';
import { StoreService } from '../services/store.service';
import { MockMainAppStoreService } from '../../../../testing/stub/main-app-store.service';
import { MockedDrinks } from '../../../../testing/fixtures/drinks';
import { DrinkRecipe } from '../../core/models/visualisation';
import { RouterTestingModule } from '@angular/router/testing';

describe('DrinksListComponent', () => {
	let component: DrinksListComponent;
	let store: StoreService;
	let fixture: ComponentFixture<DrinksListComponent>;
	let nativeElement: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports     : [ ReactiveFormsModule, RouterTestingModule ],
			providers   : [
				{ provide: StoreService, useClass: MockMainAppStoreService }
			],
			declarations: [ DrinksListComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DrinksListComponent);
		nativeElement = fixture.nativeElement;
		store = TestBed.get(StoreService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display all drinks and select first one', () => {
		const list = nativeElement.querySelector('.list ul');
		const tableRows = list.querySelectorAll('li');
		expect(tableRows.length).toEqual(MockedDrinks.length);
		expect(tableRows[ 0 ].classList.contains('active')).toBeTruthy();
		MockedDrinks.forEach(( drink: DrinkRecipe ) => {
			expect(list.innerHTML).toContain(drink.name);
		});
	});

	it('should display list of available alcohols', () => {
		const filtersHtml = nativeElement.querySelector('.filters').innerHTML;
		expect(filtersHtml).toContain('vodka');
		expect(filtersHtml).toContain('whisky');
	});

	it('#selectDrinkById should dispatch action', () => {
		const spy = spyOn(store, 'setCurrentDrinkById');
		component.selectDrinkById('xyz');
		expect(spy).toHaveBeenCalledWith('xyz');
	});

	it('#toggleFilterType should reset other filters and select only cne for initial selection', () => {
		expect(component.filters.types[ 'vodka' ]).toBeTruthy();
		expect(component.filters.types[ 'whisky' ]).toBeTruthy();
		component.toggleFilterType('vodka');
		expect(component.filters.types[ 'vodka' ]).toBeTruthy();
		expect(component.filters.types[ 'whisky' ]).toBeFalsy();
		component.toggleFilterType('vodka');
		expect(component.filters.types[ 'vodka' ]).toBeFalsy();
		expect(component.filters.types[ 'whisky' ]).toBeFalsy();
	});

	it('#resetTypeFilter should reset type filters to default', () => {
		component.toggleFilterType('vodka');
		expect(component.filters.types[ 'whisky' ]).toBeFalsy();
		expect(component.filters.types[ 'vodka' ]).toBeTruthy();

		component.resetTypeFilter();
		expect(component.filters.types[ 'vodka' ]).toBeTruthy();
		expect(component.filters.types[ 'whisky' ]).toBeTruthy();
	});

	it('#resetSearchQuery should reset search string', () => {
		const spy = spyOn(component.searchControl, 'reset');
		component.resetSearchQuery();
		expect(spy).toHaveBeenCalledWith('');
	});

	it('search should filter view list', fakeAsync(() => {
		const searchInput: HTMLInputElement = nativeElement.querySelector('.search-box input');

		searchInput.value = 'vodka';
		searchInput.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		tick(300); // due to the debounce time on the search functionality
		const list = nativeElement.querySelector('.list ul');
		const tableRows = list.querySelectorAll('li');
		expect(list.innerHTML).toContain('vodka');
		expect(tableRows.length).toEqual(1);
	}));

	it('type buttons filter view list', () => {
		const searchInput = nativeElement.querySelector('.search-box input');

		const button: HTMLElement = nativeElement.querySelector('.filters .filter-button.whisky');
		button.click();
		fixture.detectChanges();

		const list = nativeElement.querySelector('.list ul');
		const tableRows = list.querySelectorAll('li');
		expect(list.innerHTML).toContain('whisky');
		expect(tableRows.length).toEqual(1);
	});
});
