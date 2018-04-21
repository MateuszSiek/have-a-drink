import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Ingredient } from '../../core/models/visualisation';
import { StoreService } from '../services/store.service';

@Component( {
	selector: 'app-add-ingredient',
	templateUrl: './add-ingredient.component.html',
	styleUrls: [ './add-ingredient.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AddIngredientComponent implements OnDestroy {
	public form: FormGroup;

	constructor(
		private store: StoreService,
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<AddIngredientComponent>,
		public cdRef: ChangeDetectorRef,
		@Inject( MAT_DIALOG_DATA ) public data: Ingredient
	) {
		this.form = this.createForm( data );
	}

	public ngOnDestroy(): void {
		this.cdRef.detach();
	}

	public saveIngredient(): void {
		const ingredientData: Ingredient = this.form.value;
		if ( !ingredientData.id ) {
			this.store.addIngredient( ingredientData );
		}
		else {
			this.store.updateIngredient( ingredientData );
		}
		this.dialogRef.close();
	}

	public createForm(ingredient: Ingredient): FormGroup {
		return this.fb.group( {
			id: new FormControl( ingredient.id ),
			name: new FormControl( ingredient.name, [ Validators.required, Validators.minLength( 2 ) ] ),
			type: new FormControl( ingredient.type ),
			colour: new FormControl( ingredient.colour, Validators.required ),
			alcohol: new FormControl( ingredient.alcohol )
		} );
	}

}
