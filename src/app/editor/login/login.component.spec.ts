import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';
import { FirebaseService } from '../../core/services/firebase.service';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';

describe( 'LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			imports: [
				SharedModule,
				RouterTestingModule,
				NoopAnimationsModule
			],
			declarations: [ LoginComponent ],
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
