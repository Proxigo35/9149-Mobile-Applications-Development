import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class Data {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const units = await this.storage.get('units');

    if (units === null || units === undefined) {
      await this.storage.set('units', 'metric');
    }
  }

  async set(key: string, value: any) {
    await this.storage.set(key, value);
  }

  async get(key: string) {
    return await this.storage.get(key);
  }
}
