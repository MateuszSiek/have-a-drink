import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EditorComponent } from './editor.component';
import { LoginComponent } from './login/login.component';
import { IsAuthenticatedGuard } from '../core/guards/is-authenticated.guard';
import { IsAnonymousGuard } from '../core/guards/is-anonymous.guard';

const editorRoutes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [ IsAnonymousGuard ],
	},
	{
		path: '',
		component: EditorComponent,
		canActivate: [ IsAuthenticatedGuard ],
	},
];

@NgModule( {
	imports: [
		RouterModule.forChild( editorRoutes ),
	],
	exports: [ RouterModule ],
	providers: []
} )
export class EditorRoutingModule {
}