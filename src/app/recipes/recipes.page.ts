import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from '../services/data';
import { Http } from '../services/http';
import { Router } from '@angular/router';
import { HttpOptions } from '@capacitor/core';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import {
  IonCardTitle,
  IonButton,
  IonSpinner,
  IonCardContent,
  IonCardHeader,
  IonLabel,
  IonCard,
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonLabel,
    IonContent,
    IonSpinner,
    IonCard,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class RecipesPage {
  recipeData: any = null;

  options: HttpOptions = {
    url: ''
  };

  constructor(
    private router: Router,
    private ds: Data,
    private mhs: Http,
  ) {}

  ngOnInit() {
    this.getRecipeData((this.router.getCurrentNavigation()?.extras.state as { recipeID: number }).recipeID);
  }

  async getRecipeData(recipeID: number) {
    this.options.url =
      `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=` +
      environment.apiKey
      this.recipeData = (await this.mhs.get(this.options)).data;
      console.log(this.recipeData);
  }
}
