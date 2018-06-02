import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { MockedGlasses } from '../../../../testing/fixtures/glasses';
import { MockEditorStoreService } from '../../../../testing/stub/editor-store.service';

import { AddGlassComponent } from './add-glass.component';
import { FirebaseService } from '../../core/services/firebase.service';
import { StoreService } from '../services/store.service';
import { EditorModule } from '../editor.module';
import { CoreModule } from '../../core/core.module';

describe('AddGlassComponent', () => {
	let component: AddGlassComponent;
	let fixture: ComponentFixture<AddGlassComponent>;
	let store: StoreService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports     : [
				CoreModule,
				EditorModule,
				NoopAnimationsModule
			],
			providers   : [
				{ provide: StoreService, useClass: MockEditorStoreService },
				{ provide: FirebaseService, useClass: MockFirebaseService },
				{ provide: MatDialogRef, useValue: { close: (): void => undefined } },
				{ provide: MAT_DIALOG_DATA, useValue: MockedGlasses[ 0 ] },
			]
		});
		TestBed.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddGlassComponent);
		store = TestBed.get(StoreService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render glass fields with data', () => {
		const nameInput = fixture.nativeElement.querySelector('input[formControlName=name]');
		const pathInput = fixture.nativeElement.querySelector('textarea[formControlName=path]');
		const maskInput = fixture.nativeElement.querySelector('textarea[formControlName=mask]');
		expect(nameInput.value).toEqual(MockedGlasses[ 0 ].name);
		expect(pathInput.value).toEqual(MockedGlasses[ 0 ].path);
		expect(maskInput.value).toEqual(MockedGlasses[ 0 ].mask);
	});

	it('should render visualisation', () => {
		const paths = fixture.nativeElement.querySelectorAll('svg path');
		expect(paths.length).toEqual(2);
	});


	it('should save glass', () => {
		const updateSpy = spyOn(store, 'updateGlass');
		component.saveGlass();
		expect(updateSpy).toHaveBeenCalledWith(MockedGlasses[ 0 ]);
	});

	it('should create new glass', () => {
		const newGlass: any = { ...MockedGlasses[ 0 ], id: null };
		const addSpy = spyOn(store, 'addGlass');
		component.data = newGlass;
		component.form = component.createForm( newGlass );
		fixture.detectChanges();
		component.saveGlass();
		expect(addSpy).toHaveBeenCalledWith(newGlass);
	});
});
