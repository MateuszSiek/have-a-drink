import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAppComponent } from './main-app.component';
import { MainAppRoutingModule } from './main-app-routing.module';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { TitleComponent } from './title/title.component';
import { DescriptionComponent } from './description/description.component';
import { DrinksListComponent } from './drinks-list/drinks-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports     : [
		CommonModule,
		MainAppRoutingModule,
		ReactiveFormsModule
	],
	declarations: [
		MainAppComponent,
		VisualisationComponent,
		TitleComponent,
		DescriptionComponent,
		DrinksListComponent
	]
})
export class MainAppModule {}
