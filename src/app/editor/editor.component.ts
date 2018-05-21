import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddGlassComponent } from './add-glass/add-glass.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { AddDrinkComponent } from './add-drink/add-drink.component';
import { StoreService } from './services/store.service';
import { DrinkRecipe, Glass, Ingredient } from '../core/models/visualisation';
import { FirebaseService } from '../core/services/firebase.service';

@Component({
	selector     : 'app-editor',
	templateUrl  : './editor.component.html',
	styleUrls    : [ './editor.component.scss' ],
	encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit {

	constructor( private storeService: StoreService, public dialog: MatDialog, private fbService: FirebaseService ) {
	}

	public ngOnInit(): void {
		this.storeService.loadDrinks();
		this.storeService.loadGlasses();
		this.storeService.loadIngredients();
	}

	public openGlassDialog( data: Glass = new Glass() ): void {
		this.dialog.open(AddGlassComponent, { data });
	}

	public openIngredientDialog( data: Ingredient = new Ingredient() ): void {
		this.dialog.open(AddIngredientComponent, { data });
	}

	public openDrinkDialog( data: DrinkRecipe = new DrinkRecipe() ): void {
		this.dialog.open(AddDrinkComponent, { data });
	}

	public logout(): void {
		this.fbService.signOut().then(() => {
			window.location.reload();
		});
	}
}
