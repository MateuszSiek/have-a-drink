import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
	imports     : [
		CoreModule,
		SharedModule,
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
