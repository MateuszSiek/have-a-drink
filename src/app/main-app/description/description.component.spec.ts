import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionComponent } from './description.component';
import { StoreService } from '../services/store.service';
import { MockMainAppStoreService } from '../../../../testing/stub/main-app-store.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DescriptionComponent', () => {
	let component: DescriptionComponent;
	let fixture: ComponentFixture<DescriptionComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports  : [ NoopAnimationsModule ],
			providers: [
				{ provide: StoreService, useClass: MockMainAppStoreService }
			],
			declarations: [ DescriptionComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DescriptionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
