import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { BrowserModule } from '@angular/platform-browser';
import { TitleComponent } from './title/title.component';


@NgModule({
  imports     : [
    CoreModule,
    BrowserModule,
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
