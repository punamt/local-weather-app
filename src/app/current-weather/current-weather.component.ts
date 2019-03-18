import { Component } from '@angular/core';
import {ICurrentWeather} from '../icurrent-weather';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent  {
   current: ICurrentWeather;

  constructor(private weatherService:WeatherService) {}
      
   

  ngOnInit() {
  /* this.weatherService.getCurrentWeather('Redmond','US').subscribe(
      data => { this.current = data,
        console.log('msg' + this.current)
      }
    )*/
 }

  doSearch(searchValue){
    const userInput= searchValue.split(",").map(s=>s.trim());
    this.weatherService.getCurrentWeather(userInput[0],userInput.length > 1 ? userInput[1]:undefined).subscribe(
      data =>  this.current=data
    )
  }

}
