import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {debounceTime} from 'rxjs/operators'
import { WeatherService } from '../weather.service';




@Component({
  selector: 'app-citysearch',
  templateUrl: './citysearch.component.html',
  styleUrls: ['./citysearch.component.css']
})
export class CitysearchComponent implements OnInit {

  search= new FormControl('',[Validators.minLength(3)]);

  @Output() searchEvent= new EventEmitter<string>()

  getErrorMessage(){
    return this.search.hasError('minlength') ? 'Type more than 3 characters to search.': '';
  }


  constructor(private weatherService : WeatherService) { }

  ngOnInit() {
  this.search.valueChanges.pipe(debounceTime(1000)).subscribe(
    (searchValue:string) => {
      if(!this.search.invalid){
         this.searchEvent.emit(searchValue)
       }
  }
)

  }

}
