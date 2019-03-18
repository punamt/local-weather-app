import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map,catchError} from 'rxjs/operators';
import { ICurrentWeather } from './icurrent-weather';

import { Observable,throwError } from 'rxjs';

interface ICurrentWeatherData{
  weather:[{
     description:string,
     icon:string

  }],
  main: {temp:number},
  sys:{
    country:string
  },
  dt:number,
  name:string

}

export interface IWeatherService{
  getCurrentWeather(search: string | number,country?:string):Observable<ICurrentWeather>
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements IWeatherService{

  constructor(private http:HttpClient) { }

  getCurrentWeather(search: string | number,country?:string){
    let uriParams = '';
    if(typeof search ==='string'){
      uriParams = `q=${search}` 
    } else {
      uriParams = `zip=${search}`
    }
    if(country){
      uriParams = `${uriParams},${country}`
    }
    
    
    return this.http.get<ICurrentWeatherData>(
   `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?${uriParams}&appId=${environment.appId}`).pipe(
          map(data => this.transformToIcurrentWeather(data)),
          catchError(this.handleError)
       )
   }
  
   private transformToIcurrentWeather(data : ICurrentWeatherData) : ICurrentWeather {
     return{
          city:data.name,
          country:data.sys.country,
          date: data.dt * 1000,
          image:`http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
          temperature:this.convertKelvintoFarenheit(data.main.temp),
          description:data.weather[0].description

     }
   }

   private convertKelvintoFarenheit(kelvin:number){

    return kelvin * 9/5 - 459.67;
   }

   private handleError(err:HttpErrorResponse){
    //in real world app, we may send the server to some remote logging infrastructure
    //instaed of just logging it to console
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
        //a client side or network error occutred handle it accordingly
        errorMessage=`an error occured: $(err.error.message)`;
    } 
    else{
        //the backend returned the unsuccessful response code.
        //the response body may contain clues as to what went wrong,
        errorMessage = `server returned code $(err.status),error messages is: $(err.message)`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);

}



}
