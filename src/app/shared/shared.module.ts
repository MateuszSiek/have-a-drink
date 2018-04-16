import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { TableCellDirective } from './components/data-table/table-cell.directive';
import { DataTableComponent } from './components/data-table/data-table.component';
import {
	MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule,
	MatSlideToggleModule, MatTableModule, MatGridListModule, MatCardModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const MaterialModules = [
	MatTableModule,
	MatIconModule,
	MatButtonModule,
	MatFormFieldModule,
	MatSlideToggleModule,
	MatSelectModule,
	MatInputModule,
	MatGridListModule,
	MatCardModule,
	MatDialogModule,
	MatCheckboxModule
];

const Modules = [
	CommonModule,
	RouterModule,
	ReactiveFormsModule,
];

@NgModule( {
	imports: [ ...Modules, ...MaterialModules ],
	declarations: [
		DataTableComponent,
		TableCellDirective,
	],
	providers: [],
	exports: [
		DataTableComponent,
		TableCellDirective,
		...Modules,
		...MaterialModules
	]
} )
export class SharedModule {
}
