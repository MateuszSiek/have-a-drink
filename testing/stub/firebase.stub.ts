import { MockedIngredients } from '../fixtures/ingredients';
import { MockedDrinks } from '../fixtures/drinks';
import { of } from 'rxjs/observable/of';
import { MockedGlasses } from '../fixtures/glasses';

export const MockedUser = { user: 'test' };

export const AngularFireDatabaseStub = {
	list: ( type: 'glasses' | 'ingredients' | 'drinks' ) => {
		return {
			snapshotChanges: () => of(
				[
					{
						payload: {
							val  : () => {
								switch ( type ) {
									case 'glasses':
										return MockedGlasses[ 0 ];
									case 'ingredients':
										return MockedIngredients[ 0 ];
									case 'drinks':
										return MockedDrinks[ 0 ];
								}
							},
							child: ( childType: 'ingredients' | 'glass' ) => ({
								val: () => {
									switch ( childType ) {
										case 'glass':
											return { 'gladsid': MockedGlasses[ 0 ] };
										case 'ingredients':
											return { 'ingid': MockedIngredients[ 0 ] };
									}
								}
							}),
							key  : 'qwerty'
						}
					}
				]
			),
		};
	}
};

export const AngularFireAuthStub = {
	authState: of(MockedUser),
	auth     : { signOut: () => new Promise(( resolve ) => resolve('signed-out')) }
};