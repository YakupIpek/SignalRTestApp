import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreHub } from './store-hub'

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private storeHub: StoreHub) {

    this.storeHub.onMessage.asObservable().subscribe(message => {
      console.log(message);
      alert(message);
    });

    this.storeHub.onConnected.then(() => {
      http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => this.forecasts = result);
    });
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
