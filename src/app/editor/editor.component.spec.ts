import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import { FirebaseService } from '../core/services/firebase.service';
import { MockStoreService } from '../../../testing/stub/mock-store.service';
import { StoreService } from '../core/services/store.service';
import { MockFirebaseService } from '../../../testing/stub/mocked-firebase.service';
import { EditorModule } from './editor.module';

describe( 'EditorComponent', () => {
	let component: EditorComponent;
	let fixture: ComponentFixture<EditorComponent>;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			imports: [ EditorModule ],
			providers: [
				{ provide: StoreService, useClass: MockStoreService },
				{ provide: FirebaseService, useClass: MockFirebaseService },
			]
		} );
		TestBed.compileComponents();
	} ) );

	beforeEach( () => {
		fixture = TestBed.createComponent( EditorComponent );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should create', () => {
		expect( component ).toBeTruthy();
	} );
} );
