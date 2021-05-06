import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import{ exhaustMap, map, take, tap } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
        private http: HttpClient, 
        private recipeService: RecipeService, 
        private authService: AuthService,
        private store: Store<fromApp.AppState>
        ) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ngproject-http-default-rtdb.firebaseio.com/recipes.json', 
        recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.store.select('auth').pipe(
            take(1), 
            map(authState=> {
                return authState.user;
            }),
        exhaustMap(user=> {
            return this.http.
                get<Recipe[]>('https://ngproject-http-default-rtdb.firebaseio.com/recipes.json', 
                ).pipe(
                    map(recipes => {
                    return recipes.map(recipe => {
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                }));
        }),
        
        );
        
         
    }
}