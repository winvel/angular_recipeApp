import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[] }>;
  private subscription: Subscription;
  
  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<{shoppingList: {ingredients: Ingredient[] } }>
    ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged
    // .subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
    this.loggingService.printLog('from shopping list service ngOnInit');
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
  
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
