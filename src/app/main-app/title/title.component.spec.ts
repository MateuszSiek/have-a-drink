import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponent } from './title.component';
import { StoreService } from '../services/store.service';
import { MockMainAppStoreService } from '../../../../testing/stub/main-app-store.service';

describe('TitleComponent', () => {
	let component: TitleComponent;
	let fixture: ComponentFixture<TitleComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers   : [
				{ provide: StoreService, useClass: MockMainAppStoreService }
			],
			declarations: [ TitleComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TitleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
