import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreService } from './core/services/store.service';
import { DrinkRecipe } from './core/models/visualisation';

@Component({
  selector       : 'app-root',
  templateUrl    : './app.component.html',
  styleUrls      : [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor( private storeService: StoreService, private cdRef: ChangeDetectorRef, ) {

  }

  public ngOnInit(): void {
    this.storeService.loadDrinks();
  }

  public loadNextDrink(): void {
    this.storeService.setNextDrink();
  }

  public loadPrevDrink(): void {
    this.storeService.setPreviousDrink();
  }
}