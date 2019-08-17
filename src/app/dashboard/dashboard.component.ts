import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { roadclassification } from '../enums/enums.enum';
import { RoadSelection } from '../class/class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  checked:boolean=false;
  roadSelection:any = new RoadSelection()
  selectRoadType:any = this.roadSelection.select();                                
  searchSelected:any;
  selectedRoad:any;
  zoomData:any;
  viewport:any = {left:'col-md-12 col-md-block',right:'col-md-none'};

  constructor() { }

  ngOnInit() {
  }

  zoomDataChange(e:any){
    this.zoomData=e;
  }
  event_changedata(e:any){
    this.selectRoadType =  this.roadSelection.transform(e);
  }

  getSearchSelected(e){
    this.searchSelected=e;
  }

  getSelectedRoad(e){
    this.selectedRoad = e;
    if(e){
      this.toggleChange(true) //this.toggleChange(true);  

    }
  }

  toggle(){
    let e = this.checked?false:true;
    this.checked= e;
    this.toggleChange(e);  
  }
  toggleChange(e){
    this.checked =  e
    this.viewport.left = !this.checked?'col-md-12 col-md-block':'col-md-9 col-md-block';
    this.viewport.right =!this.checked?'col-md-none':'col-md-3 col-md-block';
  }

}
