import { Component, OnInit } from '@angular/core';
import { StoreService } from './core/services/store.service';
import { DrinkRecipe } from './core/models/visualisation';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  constructor( private storeService: StoreService ) {

  }

  public ngOnInit(): void {
    this.storeService.loadDrinks();
  }
}
