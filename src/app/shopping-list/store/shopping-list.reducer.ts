import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apples', 10), new Ingredient('Bananas', 5)],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActionsCombined
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state, //spread operator, the old state
        ingredients: [...state.ingredients, action.payload],
      };
      case ShoppingListActions.ADD_INGREDIENTS:
          return {
              ...state,
              ingredients: [...state.ingredients, ...action.payload]
          };
    default:
      return state;
  }
}
