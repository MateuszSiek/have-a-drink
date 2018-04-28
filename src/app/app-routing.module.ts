import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const appRoutes: Routes = [
	{
		path        : '',
		loadChildren: './main-app/main-app.module#MainAppModule',
	},
	{
		path        : 'editor',
		loadChildren: './editor/editor.module#EditorModule',
	},
];

@NgModule({
	imports  : [
		RouterModule.forRoot(appRoutes),
	],
	exports  : [ RouterModule ],
	providers: []
})
export class AppRoutingModule {
}