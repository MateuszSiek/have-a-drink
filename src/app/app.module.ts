import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { BrowserModule } from '@angular/platform-browser';
import { TitleComponent } from './title/title.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DescriptionComponent } from './description/description.component';
import { DrinksListComponent } from './drinks-list/drinks-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
	// { path: '', component: AppComponent },
	{ path: '**', component: AppComponent }
];

@NgModule({
	imports     : [
		CoreModule,
		BrowserModule,
		RouterModule.forRoot(appRoutes),
		BrowserAnimationsModule,
		ReactiveFormsModule
	],
	declarations: [
		AppComponent,
		VisualisationComponent,
		TitleComponent,
		DescriptionComponent,
		DrinksListComponent
	],
	providers   : [],
	bootstrap   : [ AppComponent ]
})
export class AppModule {
}
