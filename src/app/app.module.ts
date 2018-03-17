import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { BrowserModule } from '@angular/platform-browser';
import { TitleComponent } from './title/title.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
	imports     : [
		CoreModule,
		BrowserModule,
		BrowserAnimationsModule
	],
	declarations: [
		AppComponent,
		VisualisationComponent,
		TitleComponent
	],
	providers   : [],
	bootstrap   : [ AppComponent ]
})
export class AppModule {
}
