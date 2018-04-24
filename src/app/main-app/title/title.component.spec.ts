import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { TitleComponent } from './title.component';
import { StoreService } from '../services/store.service';
import { MockMainAppStoreService } from '../../../../testing/stub/main-app-store.service';
import { MockedDrinks } from '../../../../testing/fixtures/drinks';

describe('TitleComponent', () => {
	let component: TitleComponent;
	let fixture: ComponentFixture<TitleComponent>;
	let storeService: StoreService;

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
		storeService = TestBed.get(StoreService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	const validateText = ( name: string ) => {
		const title = fixture.nativeElement.querySelector('.div--current-title');
		const titleChars = title.querySelectorAll('span');
		const nameChars = name.split('');
		nameChars.forEach(( char: string, idx: number ) => {
			expect(titleChars[ idx ].innerHTML).toContain(char.toUpperCase());
		});
	};

	it('should render text', () => {
		validateText(MockedDrinks[ 0 ].name);
	});

	it('should update text', () => {
		validateText(MockedDrinks[ 0 ].name);
		spyOn(storeService, 'getCurrentDrink').and.returnValue(of(MockedDrinks[ 1 ]));
		component.ngOnInit();
		validateText(MockedDrinks[ 1 ].name);
	});
});
