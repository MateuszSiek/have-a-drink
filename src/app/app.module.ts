import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { VisualisationComponent } from './visualisation/visualisation.component';


@NgModule({
  imports     : [
    CoreModule,
  ],
  declarations: [
    AppComponent,
    VisualisationComponent
  ],
  providers   : [],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
