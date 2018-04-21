import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import { FirebaseService } from '../core/services/firebase.service';
import { MockFirebaseService } from '../../../testing/stub/mocked-firebase.service';
import { EditorModule } from './editor.module';
import { MockEditorStoreService } from '../../../testing/stub/editor-store.service';
import { StoreService } from './services/store.service';
import { CoreModule } from '../core/core.module';

describe( 'EditorComponent', () => {
	let component: EditorComponent;
	let fixture: ComponentFixture<EditorComponent>;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			imports: [ EditorModule, CoreModule ],
			providers: [
				{ provide: StoreService, useClass: MockEditorStoreService },
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
