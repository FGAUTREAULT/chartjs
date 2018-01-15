import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

    constructor(private _http: HttpClient) { }

    dailyForecast() {
      return this._http.get('http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=3e4c174e88e788a6824cb17457ea8f6f')
        .map(result => result);
    }

  }
