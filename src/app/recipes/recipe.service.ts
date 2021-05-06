import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";

import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();
    
    // private recipes: Recipe[] = [
    //     new Recipe('Filipino Dish one', 
    //     'Crispy Pork Sisig', 
    //     'https://panlasangpinoy.com/wp-content/uploads/2019/12/sizzling-crispy-sisig-recipe-.jpg',
    //     [
    //         new Ingredient('Ground Meat', 1),
    //         new Ingredient('Spices', 1)
    //     ]),
    //     new Recipe('Filipino Dish Two', 
    //     'Sinigang na Baboy with Gabi', 
    //     'https://panlasangpinoy.com/wp-content/uploads/2017/03/Sinigang-na-Baboy-with-Gabi-Panlasang-Pinoy-500x375.jpg',
    //     [
    //         new Ingredient('Pork', 1),
    //         new Ingredient('gabi and Spices', 1)
    //     ])
    //   ];

     private recipes: Recipe[] = [];

      constructor(
          private store: Store<fromApp.AppState>
          ){}

      setRecipes(recipes: Recipe[]){
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
          return this.recipes.slice();
      }
      getRecipe(index: number) {
          return this.recipes[index];
      }
    
      addIngredientToShoppingList(ingredients: Ingredient[]) {
        // this.slService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
          this.recipes[index] = newRecipe;
          this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());

      }
}