import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddGlassComponent } from './add-glass/add-glass.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { AddDrinkComponent } from './add-drink/add-drink.component';
import { StoreService } from './services/store.service';
import { DrinkRecipe, Glass, Ingredient } from '../core/models/visualisation';

@Component( {
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: [ './editor.component.scss' ],
	encapsulation: ViewEncapsulation.None
} )
export class EditorComponent implements OnInit {

	constructor(private storeService: StoreService, public dialog: MatDialog, private elRef: ElementRef) {
	}

	public ngOnInit(): void {
		this.storeService.loadDrinks();
		this.storeService.loadGlasses();
		this.storeService.loadIngredients();
	}

	public openGlassDialog(data: Glass = new Glass()): void {
		this.dialog.open( AddGlassComponent, {
			data,
			maxWidth: '900px',
		} );
	}

	public openIngredientDialog(data: Ingredient = new Ingredient()): void {
		this.dialog.open( AddIngredientComponent, {
			data,
			maxWidth: '500px',
		} );
	}

	public openDrinkDialog(data: DrinkRecipe = new DrinkRecipe()): void {
		this.dialog.open( AddDrinkComponent, {
			data,
			maxWidth: '500px',
		} );
	}

}
