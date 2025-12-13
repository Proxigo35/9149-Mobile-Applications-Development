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
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonCard,
  IonContent,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourites',
  templateUrl: 'favourites.page.html',
  styleUrls: ['favourites.page.scss'],
  imports: [
    CommonModule,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonCard,
    IonContent,
  ],
})
export class FavouritesPage {
  recipes: any[] = [];

  constructor(
    private storage: Data,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getFavourites();
  }

  ionViewWillEnter() {
    this.getFavourites();
  }

  async getFavourites() {
    this.recipes = (await this.storage.get('favourites')) ?? [];
  }

  getRecipeDetails(recipeID: number) {
    this.router.navigate(['/recipes'], {
      state: { recipeID: recipeID },
    });
  }
}
