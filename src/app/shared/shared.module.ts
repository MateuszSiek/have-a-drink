import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const Modules = [
	CommonModule,
	RouterModule,
	ReactiveFormsModule,
];

const Components = [
	HeaderComponent,
	FooterComponent
];

@NgModule({
	imports     : [ ...Modules ],
	declarations: [ ...Components ],
	exports     : [ ...Modules, ...Components ]
})
export class SharedModule {
}
