import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { StoreService } from '../services/store.service';
import { DrinkRecipe, Glass, Ingredient } from '../../core/models/visualisation';

interface FormIngredient {
	def: Ingredient;
	amount: number;
}

@Component({
	selector       : 'app-add-drink',
	templateUrl    : './add-drink.component.html',
	styleUrls      : [ './add-drink.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDrinkComponent implements OnInit, OnDestroy {
	public form: FormGroup;
	public glassesAvail: Glass[] = [];
	public ingredientsAvail: Ingredient[] = [];

	constructor( private store: StoreService,
	             private fb: FormBuilder,
	             public dialogRef: MatDialogRef<AddDrinkComponent>,
	             private cdRef: ChangeDetectorRef,
	             @Inject(MAT_DIALOG_DATA) public data: DrinkRecipe ) {}

	public ngOnInit(): void {
		combineLatest(
			this.store.getGlasses(),
			this.store.getIngredients()
		).subscribe(( [ glasses, ingredients ]: [ Glass[], Ingredient[] ] ) => {
			this.glassesAvail = glasses;
			this.ingredientsAvail = ingredients;
			this.createForm(this.data);
			this.cdRef.detectChanges();
		});
	}

	public ngOnDestroy(): void {
		this.cdRef.detach();
	}

	public saveDrink(): void {
		const drinkData: DrinkRecipe = this.prepareSaveData();
		if ( !drinkData.id ) {
			this.store.addDrink(drinkData);
		}
		else {
			this.store.updateDrink(drinkData);
		}
		this.dialogRef.close();
	}

	public addIngredient(): void {
		(this.form.get('ingredients') as FormArray).push(this.fb.group({ def: new Ingredient(), amount: 0 }));
	}

	get ingredients(): FormArray {
		return this.form.get('ingredients') as FormArray;
	}

	public removeIngredient( idx: number ): void {
		const formIngredients: FormArray = this.form.get('ingredients') as FormArray;
		formIngredients.removeAt(idx);
	}

	private prepareSaveData(): DrinkRecipe {
		const formData = this.form.value;
		const drink: DrinkRecipe = {
			id               : formData.id,
			name             : formData.name,
			glass            : formData.glass,
			active           : formData.active,
			description      : formData.description,
			ingredients      : [],
			ingredientsAmount: {}
		};
		const ingredients = formData.ingredients;
		ingredients.forEach(( { def, amount }: FormIngredient ) => {
			if ( def ) {
				drink.ingredients.push({ ...def });
				drink.ingredientsAmount[ def.id as string ] = amount;
			}
		});
		return drink;
	}

	private createForm( drink: DrinkRecipe ): void {
		const formIngredients: FormGroup[] = [];
		const formGlass = drink.glass && this.glassesAvail.find(( d: Glass ) => (d.id as string) === drink!.glass!.id);
		drink.ingredients.forEach(( i: Ingredient ) => {
			// finding ingredient definition in the ingredientsAvail array so that ingredient can be preselected by
			// reference
			const existingDef = this.ingredientsAvail.find(( d: Ingredient ) => d!.id === i.id);
			if ( existingDef ) {
				formIngredients.push(this.fb.group({
					def   : existingDef,
					amount: drink.ingredientsAmount[ existingDef.id as string ]
				}));
			}
		});

		this.form = this.fb.group({
			id         : new FormControl(drink.id),
			active     : new FormControl(drink.active),
			description: new FormControl(drink.description),
			name       : new FormControl(drink.name, [ Validators.required, Validators.minLength(2) ]),
			glass      : new FormControl(formGlass, [ Validators.required ]),
			ingredients: this.fb.array(formIngredients)
		});
	}

}
