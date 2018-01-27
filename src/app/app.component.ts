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
  public drinkName: string;

  constructor( private storeService: StoreService, private cdRef: ChangeDetectorRef, ) {

  }

  public ngOnInit(): void {
    this.storeService.loadDrinks();
    this.storeService.getCurrentDrink().subscribe(( drink: DrinkRecipe | undefined ) => {
      this.drinkName = drink.name;
      this.cdRef.detectChanges();
    });
  }

  public loadNextDrink(): void {
    this.storeService.setNextDrink();
  }

  public loadPrevDrink(): void {
    this.storeService.setPreviousDrink();
  }
}
