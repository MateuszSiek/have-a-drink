import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { DrinksListComponent } from './drinks-list.component';
import { StoreService } from '../services/store.service';
import { MockMainAppStoreService } from '../../../../testing/stub/main-app-store.service';

describe('DrinksListComponent', () => {
	let component: DrinksListComponent;
	let fixture: ComponentFixture<DrinksListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports     : [ ReactiveFormsModule ],
			providers   : [
				{ provide: StoreService, useClass: MockMainAppStoreService }
			],
			declarations: [ DrinksListComponent ],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DrinksListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
