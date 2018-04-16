import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AddGlassComponent } from './add-glass.component';
import { MockStoreService } from '../../../../testing/stub/mock-store.service';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { StoreService } from '../../core/services/store.service';
import { FirebaseService } from '../../core/services/firebase.service';
import { MockedGlasses } from '../../../../testing/fixtures/glasses';
import { GlassPreviewComponent } from '../glass-preview/glass-preview.component';
import { SharedModule } from '../../shared/shared.module';

describe( 'AddGlassComponent', () => {
	let component: AddGlassComponent;
	let fixture: ComponentFixture<AddGlassComponent>;
	let store: StoreService;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			imports: [
				SharedModule,
				NoopAnimationsModule
			],
			declarations: [
				AddGlassComponent,
				GlassPreviewComponent
			],
			providers: [
				{ provide: StoreService, useClass: MockStoreService },
				{ provide: FirebaseService, useClass: MockFirebaseService },
				{ provide: MatDialogRef, useValue: { close: () => undefined } },
				{ provide: MAT_DIALOG_DATA, useValue: {} },
			]
		} );
		TestBed.compileComponents();
	} ) );

	beforeEach( () => {
		fixture = TestBed.createComponent( AddGlassComponent );
		store = TestBed.get( StoreService );
		component = fixture.componentInstance;
		component.data = MockedGlasses[ 0 ];
		fixture.detectChanges();
	} );

	it( 'should create', () => {
		expect( component ).toBeTruthy();
	} );

	it( 'should render glass fields with data', () => {
		const nameInput = fixture.nativeElement.querySelector( 'input[formControlName=name]' );
		const maskTopMarginInput = fixture.nativeElement.querySelector( 'input[formControlName=maskTopMargin]' );
		const maskHeightInput = fixture.nativeElement.querySelector( 'input[formControlName=maskHeight]' );
		const pathInput = fixture.nativeElement.querySelector( 'textarea[formControlName=path]' );
		const maskInput = fixture.nativeElement.querySelector( 'textarea[formControlName=mask]' );
		expect( nameInput.value ).toEqual( MockedGlasses[ 0 ].name );
		expect( maskTopMarginInput.value ).toEqual( MockedGlasses[ 0 ].maskTopMargin.toString() );
		expect( maskHeightInput.value ).toEqual( MockedGlasses[ 0 ].maskHeight.toString() );
		expect( pathInput.value ).toEqual( MockedGlasses[ 0 ].path );
		expect( maskInput.value ).toEqual( MockedGlasses[ 0 ].mask );
	} );

	it( 'should render visualisation', () => {
		const paths = fixture.nativeElement.querySelectorAll( 'svg path' );
		const lines = fixture.nativeElement.querySelectorAll( 'svg line' );
		expect( paths.length ).toEqual( 2 );
		expect( lines.length ).toEqual( 2 );
	} );


	it( 'should save glass', () => {
		const updateSpy = spyOn( store, 'updateGlass' );
		component.saveGlass();
		expect( updateSpy ).toHaveBeenCalledWith( MockedGlasses[ 0 ] );
	} );

	it( 'should create new glass', () => {
		const newGlass = { ...MockedGlasses[ 0 ], id: null };
		const addSpy = spyOn( store, 'addGlass' );
		component.data = newGlass;
		component.ngOnInit();
		fixture.detectChanges();
		component.saveGlass();
		expect( addSpy ).toHaveBeenCalledWith( newGlass );
	} );
} );
