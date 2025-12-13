import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Data } from '../services/data';
import { Http } from '../services/http';
import { HttpOptions } from '@capacitor/core';
import { Router } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
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
  IonBadge,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { heart, heartOutline, settingsOutline } from 'ionicons/icons';
import { ViewChild } from '@angular/core';

addIcons({
  heart: heart,
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
    IonBadge,
  ],
})
export class HomePage {
  ingredients: string = '';
  recipes: any[] = [];
  searchInitiated: boolean = false;
  selectedUnit!: string;
  favouritesCount!: number;
  navigatedAway!: boolean;
  scrollPosition: number = 0;

  options: HttpOptions = {
    url: '',
  };

  constructor(
    private router: Router,
    private mhs: Http,
    private storage: Data,
  ) {}

  @ViewChild(IonContent, { static: false }) content!: IonContent;

  async ionViewWillEnter() {
    const favourites = (await this.storage.get('favourites')) ?? [];
    this.favouritesCount = favourites.length;

    if (this.navigatedAway) {
      setTimeout(() => {
        this.content.scrollToPoint(0, this.scrollPosition, 0);
      }, 50);
    }
  }

  saveScrollPosition(event: any) {
    this.scrollPosition = event.detail.scrollTop;
  }

  scrollToTop() {
    this.scrollPosition = 0;

    setTimeout(() => {
      this.content.scrollToTop(300);
    }, 50);
  }

  getRecipeDetails(recipeID: number) {
    this.router.navigate(['/recipes'], {
      state: { recipeID: recipeID },
    });
  }

  openFavourites() {
    this.router.navigate(['/favourites']);
  }

  openSettings() {
    this.router.navigate(['/settings']);
  }

  async getRecipes() {
    this.options.url =
      'https://api.spoonacular.com/recipes/complexSearch?apiKey=' +
      environment.apiKey +
      '&query=' +
      this.ingredients;
    this.recipes = (await this.mhs.get(this.options)).data.results;
    this.searchInitiated = true;
    this.navigatedAway = false;
    this.scrollToTop();
  }
}
