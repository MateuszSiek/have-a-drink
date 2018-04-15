import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
	imports     : [
		CoreModule,
		CommonModule,
		AppRoutingModule,
	],
	declarations: [
		AppComponent,
	],
	providers   : [],
	bootstrap   : [ AppComponent ]
})
export class AppModule {
}
