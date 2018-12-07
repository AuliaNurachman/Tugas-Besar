import { Injectable} from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingEditComponent } from '../shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  //property:class recipe
  private recipes:Recipe[]=[
    new Recipe('Deep Cleaning',
    'A hamburger with a rim of lettuce sitting on a black plate againts a black background','https://dapperclean.com/wp-content/uploads/2018/05/Image_29ffbb8-800x600.jpg',[
      new Ingredient('meal',1),
      new Ingredient('tomato',2)
    ]),
    new Recipe('Special fried rice',
    'Fried rice is a dish of cooked rice that has been stir-fried in a wok or a','../src/app/img/nasi goreng.jpg',[
      new Ingredient('rice',1),
      new Ingredient('meal',3),
      new Ingredient('egg',1)
    ]),
  ];

  getRecipes(){
    return this.recipes.slice();
  }
  addIngredientsShoppingList(ingredients:Ingredient[]){
    this.slsService.addIngredients(ingredients);
  }

  getRecipe(index:number){
    return this.recipes[index];
  }

  addRecipe(recipe :Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index :number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

constructor(private slsService:ShoppingListService) { }

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
