import { FirebaseService } from './firebase.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { TestBed } from '@angular/core/testing';

import * as firebase from 'firebase';

import { MockedIngredients } from '../../../../testing/fixtures/ingredients';
import { MockedGlasses } from '../../../../testing/fixtures/glasses';
import { MockedDrinks } from '../../../../testing/fixtures/drinks';
import { AngularFireAuthStub, AngularFireDatabaseStub, MockedUser } from '../../../../testing/stub/firebase.stub';
import { CoreModule } from '../core.module';


describe('FirebaseService', () => {
	let service: FirebaseService;
	let db: AngularFireDatabase;
	let auth: AngularFireAuth;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports  : [
				CoreModule
			],
			providers: [
				{ provide: AngularFireDatabase, useValue: AngularFireDatabaseStub },
				{ provide: AngularFireAuth, useValue: AngularFireAuthStub },
			],
		});

		service = TestBed.get(FirebaseService);
		db = TestBed.get(AngularFireDatabase);
		auth = TestBed.get(AngularFireAuth);
	});

	it('#getAuthState should return mocked user', () => {
		let result: any;
		service.getAuthState().subscribe(r => result = r);
		expect(result).toEqual(MockedUser);
	});

	it('#login should work', ( done ) => {
		spyOn(firebase, 'auth').and.returnValue({
			signInWithEmailAndPassword: () => new Promise(( resolve ) => resolve('called'))
		});
		service.login('xx', 'xx').then(r => {
			expect(r).toEqual('called');
			done();
		});
	});

	it('#signOut should work', ( done ) => {
		service.signOut().then(r => {
			expect(r).toEqual('signed-out');
			done();
		});
	});

	it('#getGlasses should work', ( done ) => {
		service.getGlasses().subscribe(r => {
			expect(r).toEqual([ { ...MockedGlasses[ 0 ], id: 'qwerty' } ]);
			done();
		});
	});

	it('#getIngredients should work', ( done ) => {
		service.getIngredients().subscribe(r => {
			expect(r).toEqual([ { ...MockedIngredients[ 0 ], id: 'qwerty' } ]);
			done();
		});
	});

	it('#getDrinks should work', ( done ) => {
		service.getDrinks().subscribe(r => {
			expect(r).toEqual([ {
				...MockedDrinks[ 0 ],
				glass      : MockedGlasses[ 0 ],
				ingredients: [ MockedIngredients[ 0 ] ],
				id         : 'qwerty'
			} ]);
			done();
		});
	});
});