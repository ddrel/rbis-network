import { Component, OnInit,AfterViewInit,Output,EventEmitter,ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import * as _ from 'lodash';
import { debounceTime, distinctUntilChanged, map,filter } from 'rxjs/operators';

export interface locGroup {
  type: string;
  location: any[];
}

@Component({
  selector: 'app-zoomto',
  templateUrl: './zoomto.component.html',
  styleUrls: ['./zoomto.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ZoomtoComponent implements OnInit,AfterViewInit {
  locationGroup = new FormControl();
  locationsGroup:locGroup[] = []; 
  @Output() zoomedChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private apiservice:ApiService) { }

  ngOnInit() {
  }

  getData(name){
    this.apiservice.getlocations(name).then(data=>{
      this.locationsGroup = [];
      this.locationsGroup.push({type:"Province",location:data.province})
      this.locationsGroup.push({type:"City/Municipal",location:data.municity})
    })
  }
  selected(e){
   this.zoomedChange.emit(e);
  }
  ngAfterViewInit(){
    this.locationGroup.valueChanges.pipe(
      // get value
      map((event: any) => {
        return this.locationGroup.value;;
      })
      // if character length greater then 2
      ,filter(res => res.length > 2)
      // Time in milliseconds between key events
      ,debounceTime(400)        
      // If previous query is diffent from current   
      ,distinctUntilChanged()
      // subscription for response
      ).subscribe((qry: string) => {
          this.getData(qry);       
      });
  }

}
