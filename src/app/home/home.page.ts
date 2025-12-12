import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Data } from '../services/data';
import { Http } from '../services/http';
import { HttpOptions } from '@capacitor/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonInput,
  IonHeader,
  IonButtons,
  IonToolbar,
  IonTitle,
  IonCardTitle,
  IonCardHeader,
  IonIcon,
  IonCardContent,
  IonCard,
  IonContent,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { heartOutline, settingsOutline } from 'ionicons/icons';

addIcons({
  'heart-outline': heartOutline,
  'settings-outline': settingsOutline,
});

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
   IonCard,
    FormsModule,
    IonIcon,
    IonButtons,
    IonButton,
    IonInput,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class HomePage {
  ingredients: string = '';
  recipes: any[] = [];
  searchInitiated = false;

  options: HttpOptions = {
    url: ''
  };

  constructor(
    private router: Router,
    private ds: Data,
    private mhs: Http,
  ) {}

  getRecipeDetails(recipeID: number) {
    this.router.navigate(
      ['/recipes'], {
        state: { recipeID: recipeID }
      }
    );
  }

  async getRecipes() {
    this.options.url =
      'https://api.spoonacular.com/recipes/complexSearch?apiKey=' +
      environment.apiKey +
      '&query=' +
      this.ingredients;
    this.recipes = (await this.mhs.get(this.options)).data.results;
    this.searchInitiated = true;
  }

}
