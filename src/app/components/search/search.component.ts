import { Component, OnInit,AfterViewInit,Output,EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import * as _ from 'lodash';
import { debounceTime, distinctUntilChanged, map,filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,AfterViewInit {
  searchCtrl = new FormControl();
  searchResult:any = [];
  @Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private apiservice:ApiService) { }

  ngOnInit() {

  }


  onchange(e){    
    if(this.searchCtrl.value=="") {this.searchResult = [];}
    
  }

  ngAfterViewInit(){
    this.searchCtrl.valueChanges.pipe(
      // get value
      map((event: any) => {
        return this.searchCtrl.value;;
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

  getData(qry){
    let _params:any = {};
          _params.qry = qry;
          this.apiservice.search(_params).then(d=>{        
            let result = (d.docs || []); 
            this.searchResult = result.map(d=>{
              return {text:`${d.R_ID}-${d.R_NAME}`,
                      r_id:d.R_ID,fromsearch:true} 
            })
            
          });  
  }

  selected(d){
    this.selectedChange.emit(d)
  }

}
