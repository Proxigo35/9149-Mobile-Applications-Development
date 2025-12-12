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
  IonToolbar,
  IonTitle,
  IonCardTitle,
  IonCardHeader,
  IonCard,
  IonContent,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    FormsModule,
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
  searchInitiated: boolean = false;

  options: HttpOptions = {
    url: ''
  };

  constructor(
    private ds: Data,
    private mhs: Http,
  ) {}

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
