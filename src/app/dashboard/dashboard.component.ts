import { Component, OnInit,ViewEncapsulation ,ChangeDetectorRef,AfterViewInit} from '@angular/core';
import { roadclassification } from '../enums/enums.enum';
import { RoadSelection } from '../class/class';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable,of as observableOf } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class DashboardComponent implements OnInit,AfterViewInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    share()
  );
  checked:boolean=false;
  roadSelection:any = new RoadSelection()
  selectRoadType:any = this.roadSelection.select();                                
  searchSelected:any;
  selectedRoad:any =  {environment:"",
                      region:"",
                      citymuncode:"",
                      length:0,
                      province_code:"",
                      rrow:0,
                      r_class:"",
                      r_id:"",
                      r_importance:"",
                      r_name:"",
                      terrain:"",
                      dirflow:"" 
                    }; ;
  zoomData:any;
  viewport:any = {left:'col-md-12 col-md-block',right:'col-md-none'};

  constructor(private cdr:ChangeDetectorRef,private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = observableOf(false);
   }

  
  ngOnInit() {
    //this.cdr.detectChanges();
  
  }
  ngAfterViewInit(){
    //
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
      setTimeout(e=>{
        this.toggleChange(true) //this.toggleChange(true);           
      },300)
  

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
