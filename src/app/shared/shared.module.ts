import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const Modules = [
	CommonModule,
	RouterModule,
	ReactiveFormsModule,
];

@NgModule({
	imports: [ ...Modules ],
	exports: [ ...Modules ]
})
export class SharedModule {
}
