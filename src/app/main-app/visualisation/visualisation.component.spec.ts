import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationComponent } from './visualisation.component';
import { CoreModule } from '../../core/core.module';
import { DrinksListComponent } from '../drinks-list/drinks-list.component';
import { DescriptionComponent } from '../description/description.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../services/store.service';
import { MockMainAppStoreService } from '../../../../testing/stub/main-app-store.service';

describe('VisualisationComponent', () => {
	let component: VisualisationComponent;
	let fixture: ComponentFixture<VisualisationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports     : [
				CoreModule,
				ReactiveFormsModule
			],
			providers   : [
				{ provide: StoreService, useClass: MockMainAppStoreService }
			],
			declarations: [ VisualisationComponent, DrinksListComponent, DescriptionComponent ]
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
