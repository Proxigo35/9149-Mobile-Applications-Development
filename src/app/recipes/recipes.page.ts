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
  IonList,
  IonCard,
  IonHeader,
  IonIcon,
  IonTitle,
  IonItem,
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
    IonIcon,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonList,
    IonItem,
    FormsModule,
  ],
})
export class RecipesPage {
  recipeData: any = null;
  units!: string;
  favourites: any[] = [];
  favourited!: boolean;

  constructor(
    private router: Router,
    private storage: Data,
    private mhs: Http,
  ) {}

  ngOnInit() {
    const recipeID = (
      this.router.getCurrentNavigation()?.extras.state as { recipeID: number }
    ).recipeID;

    this.getRecipeData(recipeID);
    this.getFavourites(recipeID);
  }

  async getFavourites(recipeID: number) {
    this.favourites = (await this.storage.get('favourites')) ?? [];
    this.favourited = this.favourites.some((r) => r.id === recipeID);
  }

  async getRecipeData(recipeID: number) {
    const options: HttpOptions = {
      url: `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${environment.apiKey}`,
    };

    this.recipeData = (await this.mhs.get(options)).data;
    this.units = (await this.storage.get('units')) ?? 'metric';
  }

  async toggleFavourites(recipeID: number) {
    if (!this.recipeData) return;

    if (this.favourited) {
      this.favourites = this.favourites.filter((r) => r.id !== recipeID);
      this.favourited = false;
    } else {
      this.favourites = [...this.favourites, this.recipeData];
      this.favourited = true;
    }

    await this.storage.set('favourites', this.favourites);
  }
}
