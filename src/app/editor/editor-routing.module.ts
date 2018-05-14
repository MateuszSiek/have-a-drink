import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EditorComponent } from './editor.component';
import { LoginComponent } from './login/login.component';
import { IsAnonymousGuard } from './guards/is-anonymous.guard';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';

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
