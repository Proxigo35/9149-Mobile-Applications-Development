import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Data } from '../services/data';
import { Http } from '../services/http';
import { HttpOptions } from '@capacitor/core';
import { environment } from '../../environments/environment';
import { IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})

export class RecipesPage implements OnInit {

  ingredients: string = "";
  recipeInfo: any;
  options: HttpOptions = {
    url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + environment.apiKey + "&query="
  }

  constructor(private ds: Data, private mhs: Http) { }

  ngOnInit() {
	this.getIngredients();
  }
  
  async getIngredients() {
	this.ingredients = await this.ds.get('ingredients');
	this.options.url += this.ingredients;
	this.recipeInfo = (await this.mhs.get(this.options)).data.results;
	console.log(this.recipeInfo);
  }

}
