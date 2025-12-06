import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Data } from '../services/data';
import { Router } from '@angular/router';
import { IonButton, IonInput, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [FormsModule, IonButton, IonInput, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
	
  ingredients: string = "";
  
  constructor(private router: Router, private ds: Data) {}
  
  async openRecipes() {
    await this.ds.set("ingredients", this.ingredients);
	this.router.navigate(['/recipes']);
  }
	
  
}
