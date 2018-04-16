import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Glass, Ingredient } from '../../core/models/visualisation';
import { StoreService } from '../services/store.service';

@Component( {
	selector: 'app-add-glass',
	templateUrl: './add-glass.component.html',
	styleUrls: [ './add-glass.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AddGlassComponent implements OnInit, OnDestroy {
	public form: FormGroup;

	constructor(
		private store: StoreService,
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<AddGlassComponent>,
		public cdRef: ChangeDetectorRef,
		@Inject( MAT_DIALOG_DATA ) public data: Glass
	) {}

	public ngOnInit(): void {
		this.createForm( this.data );
	}

	public ngOnDestroy(): void {
		this.cdRef.detach();
	}

	public saveGlass(): void {
		const glassData = this.form.value;
		if ( !glassData.id ) {
			this.store.addGlass( glassData );
		}
		else {
			this.store.updateGlass( glassData );
		}
		this.dialogRef.close();
	}

	private createForm(glass: Glass): void {
		this.form = this.fb.group( {
			id: new FormControl( glass.id ),
			name: new FormControl( glass.name, [ Validators.required, Validators.minLength( 4 ) ] ),
			path: new FormControl( glass.path, Validators.required ),
			mask: new FormControl( glass.mask, Validators.required ),
			maskTopMargin: new FormControl( glass.maskTopMargin, Validators.required ),
			maskHeight: new FormControl( glass.maskHeight, Validators.required ),
		} );
	}
}
