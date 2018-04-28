import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MainAppComponent } from './main-app.component';

const appRoutes: Routes = [
	{ path: '', component: MainAppComponent },
];

@NgModule({
	imports  : [
		RouterModule.forChild(appRoutes),
	],
	exports  : [ RouterModule ],
	providers: []
})
export class MainAppRoutingModule {
}