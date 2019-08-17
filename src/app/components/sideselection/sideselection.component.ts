import { Component, OnInit,ViewEncapsulation,Input,Output,EventEmitter } from '@angular/core';
import { roadclassification } from '../../enums/enums.enum';
import { RoadSelection } from '../../class/class'

@Component({
  selector: 'app-sideselection',
  templateUrl: './sideselection.component.html',
  styleUrls: ['./sideselection.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class SideselectionComponent implements OnInit {
  @Output() toggleDataChange: EventEmitter<any> = new EventEmitter<any>();  
  selectRoadType:any = new RoadSelection().select();  
  constructor() { }
                     
  selectRoadTypeChange(e){
    if(e.value==roadclassification.roadsection){
      this.setCheckbox(roadclassification.roadcondition,false);
      this.setCheckbox(roadclassification.roadsurfacetype,false);  
    }else if(e.value==roadclassification.roadcondition){
      this.setCheckbox(roadclassification.roadsection,false);
      this.setCheckbox(roadclassification.roadsurfacetype,false);
    }else if(e.value==roadclassification.roadsurfacetype){
      this.setCheckbox(roadclassification.roadcondition,false);
      this.setCheckbox(roadclassification.roadsection,false);
    }
    this.setCheckbox(e.value,true);
  }
  setCheckbox3(e,a){
      let o = this.selectRoadType[this.selectRoadType.type];
      this.selectRoadType[this.selectRoadType.type][`${a}indeterminate`] = false;
      Object.keys(o).forEach(k=>{
        if(k.indexOf(a)>-1){
            if(k.indexOf("indeterminate")==-1){
              if(!this.selectRoadType[this.selectRoadType.type][k]){                  
                this.selectRoadType[this.selectRoadType.type][`${a}indeterminate`] = true;   
                return;         
              } 
            }
                 
        } 
    });
    this.toggleDataChange.emit(this.selectRoadType);
  }
  setCheckbox2(e,a){
    let o = this.selectRoadType[this.selectRoadType.type];
    Object.keys(o).forEach(k=>{
      if(k.indexOf(a)>-1 ){this.selectRoadType[this.selectRoadType.type][k]=k.indexOf("indeterminate")>-1?false:e.checked}
    });
    this.toggleDataChange.emit(this.selectRoadType);
  }
  setCheckbox1(){
    this.toggleDataChange.emit(this.selectRoadType);
  }
  setCheckbox(roadtype,b){
    Object.keys(this.selectRoadType[roadtype]).forEach(k=>{
      this.selectRoadType[roadtype][k]= k.indexOf("indeterminate")>-1?false: b;
    });
    
    this.toggleDataChange.emit(this.selectRoadType);
  }
     
  getcolorlegend(c){
    return {'background-color':c}
  }
  ngOnInit() {
    //this.setCheckbox(roadclassification.roadsection,true);
  }

}
