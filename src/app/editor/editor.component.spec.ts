import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import { FirebaseService } from '../core/services/firebase.service';
import { MockFirebaseService } from '../../../testing/stub/mocked-firebase.service';
import { EditorModule } from './editor.module';
import { MockEditorStoreService } from '../../../testing/stub/editor-store.service';
import { StoreService } from './services/store.service';
import { CoreModule } from '../core/core.module';
import { MatDialog } from '@angular/material';
import Spy = jasmine.Spy;
import { MockedGlasses } from '../../../testing/fixtures/glasses';
import { AddGlassComponent } from './add-glass/add-glass.component';
import { DrinkRecipe, Glass, Ingredient } from '../core/models/visualisation';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { MockedIngredients } from '../../../testing/fixtures/ingredients';
import { AddDrinkComponent } from './add-drink/add-drink.component';
import { MockedDrinks } from '../../../testing/fixtures/drinks';

describe('EditorComponent', () => {
	let component: EditorComponent;
	let fixture: ComponentFixture<EditorComponent>;
	let dialog: MatDialog;
	let dialogSpy: Spy;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports  : [ EditorModule, CoreModule ],
			providers: [
				{ provide: StoreService, useClass: MockEditorStoreService },
				{ provide: FirebaseService, useClass: MockFirebaseService },
			]
		});
		TestBed.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EditorComponent);
		component = fixture.componentInstance;
		dialog = TestBed.get(MatDialog);
		dialogSpy = spyOn(dialog, 'open');
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('#openGlassDialog should open modal', () => {
		it(('with empty glass'), () => {
			component.openGlassDialog();
			expect(dialogSpy).toHaveBeenCalledWith(AddGlassComponent, { data: new Glass() });
		});
		it(('with provided glass'), () => {
			component.openGlassDialog(MockedGlasses[ 0 ]);
			expect(dialogSpy).toHaveBeenCalledWith(AddGlassComponent, { data: MockedGlasses[ 0 ] });
		});
	});

	describe('#openIngredientDialog should open modal', () => {
		it(('with empty ingredient'), () => {
			component.openIngredientDialog();
			expect(dialogSpy).toHaveBeenCalledWith(AddIngredientComponent, { data: new Ingredient() });
		});
		it(('with provided ingredient'), () => {
			component.openIngredientDialog(MockedIngredients[ 0 ]);
			expect(dialogSpy).toHaveBeenCalledWith(AddIngredientComponent, { data: MockedIngredients[ 0 ] });
		});
	});

	describe('#openDrinkDialog should open modal', () => {
		it(('with empty drink'), () => {
			component.openDrinkDialog();
			expect(dialogSpy).toHaveBeenCalledWith(AddDrinkComponent, { data: new DrinkRecipe() });
		});
		it(('with provided drink'), () => {
			component.openDrinkDialog(MockedDrinks[ 0 ]);
			expect(dialogSpy).toHaveBeenCalledWith(AddDrinkComponent, { data: MockedDrinks[ 0 ] });
		});
	});
});
