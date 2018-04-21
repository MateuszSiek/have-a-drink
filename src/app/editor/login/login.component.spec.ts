import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';
import { FirebaseService } from '../../core/services/firebase.service';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { EditorModule } from '../editor.module';
import { CoreModule } from '../../core/core.module';

describe( 'LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			imports: [
				CoreModule,
				EditorModule,
				NoopAnimationsModule,
				RouterTestingModule
			],
			providers: [
				{ provide: FirebaseService, useClass: MockFirebaseService },
			]
		} );

		TestBed.compileComponents();
	} ) );

	beforeEach( () => {
		fixture = TestBed.createComponent( LoginComponent );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should create', () => {
		expect( component ).toBeTruthy();
	} );
} );
