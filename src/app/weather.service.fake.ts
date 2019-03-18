import { Observable,of } from "rxjs";

import {IWeatherService} from './weather.service'
import {ICurrentWeather} from './icurrent-weather'

export class WeatherServiceFake implements IWeatherService{
    private fakeWeather:ICurrentWeather={
     city:'Redmond',
     country:'US',
     date:1485789600,
     image:'',
     temperature:280.32,
     description:'light intensity drizzle'


    }


    public getCurrentWeather(search:string | number,country?:string):Observable<ICurrentWeather>{
        return of(this.fakeWeather);
    }
}