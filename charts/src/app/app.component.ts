import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather/weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  chart = [];
  weatherDates = [];

  constructor(private _weather: WeatherService) {}

  ngOnInit() {
    this._weather.dailyForecast()
      .subscribe((res) => {

        const temp_max = res['list'].map(item => item.main.temp_max);
        const temp_min = res['list'].map(item => item.main.temp_min);
        const alldates = res['list'].map(item => item.dt);

        alldates.forEach((item) => {
            const jsdate = new Date(item * 1000);
            this.weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
        });

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: '#3cba9f',
                fill: false
              },
              {
                data: temp_min,
                borderColor: '#ffcc00',
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });

      });
  }
}
