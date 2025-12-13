import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Data } from '../services/data';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonRadio,
  IonToolbar,
  IonRadioGroup,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonRadioGroup,
    IonRadio,
    FormsModule,
  ],
})
export class SettingsPage {
  units!: string;

  constructor(private storage: Data) {}

  async ngOnInit() {
    this.units = await this.storage.get('units');
  }

  async setUnitsToMetric() {
    await this.storage.set('units', 'metric');
  }

  async setUnitsToImperial() {
    await this.storage.set('units', 'imperial');
  }
}
