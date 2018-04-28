import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';
import { FirebaseService } from '../../core/services/firebase.service';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { EditorModule } from '../editor.module';
import { CoreModule } from '../../core/core.module';
import { Router } from '@angular/router';

const MockRouter = { navigate: jasmine.createSpy('navigate') };

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let fbService: FirebaseService;
	let router: Router;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports  : [
				CoreModule,
				EditorModule,
				NoopAnimationsModule,
			],
			providers: [
				{ provide: FirebaseService, useClass: MockFirebaseService },
				{ provide: Router, useValue: MockRouter },
			]
		});
		TestBed.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fbService = TestBed.get(FirebaseService);
		router = TestBed.get(Router);
		fixture.detectChanges();
		spyOn(window, 'alert');
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should navigate to editor page on successful login', fakeAsync(() => {
		component.login();
		tick(100);
		expect(router.navigate).toHaveBeenCalledWith([ '/editor' ]);
	}));

	describe('should display login error', () => {
		const testAlert = ( rejection: any, expectMsg: string ) => {
			spyOn(fbService, 'login').and.returnValue(new Promise(( resolve, reject ) => {
				reject(rejection);
			}));
			component.login();
			tick(100);
			expect(window.alert).toHaveBeenCalledWith(expectMsg);
		};
		it('should display error message', fakeAsync(() => {
			testAlert({ code: '', message: 'error message' }, 'error message');
		}));
		it('should display Wrong password message', fakeAsync(() => {
			testAlert({ code: 'auth/wrong-password' }, 'Wrong password.');
		}));
	});


});
